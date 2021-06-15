const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { urlToHttpOptions } = require("http");
const { allowedNodeEnvironmentFlags } = require("process");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  options();
});

// list of user choices, in addition to questions/options for the user to work through, i.e. departments, roles, adding/removing employees, etc.

function options() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message:
        "Welcome to the Employee Database! Please select from our options:",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add a role",
        "Update employee role",
        "Delete an employee",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;

        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Add a department":
          addDepartment;
          break;

        case "Add a role":
          addRole();
          break;

        case "Update an employee role":
          updateRole();
          break;

        case "Delete an employee":
          deleteEmployee();
          break;
        case "Exit":
          exitApp();
          break;

        default:
          break;
      }
    });
}

function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + " employees found");
    console.table("All employees:", res);
    options();
  });
}

function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    options();
  });
}

function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Roles:", res);
    options();
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name? ",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name? ",
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is their manager's ID? ",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee's role? ",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Your employee has been added.");
            options();
          }
        );
      });
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", {
        name: answer.newDepartment,
      });
      var query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Your department has been added.");
        console.table("All departments:", res);
        options();
      });
    });
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "new_role",
          type: "input",
          message: "What role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this new role?",
        },
        {
          name: "Department",
          type: "list",
          choices: function () {
            var deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        },
      ])
      .then(function (answer) {
        let department_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].name == answer.Department) {
            department_id = res[a].id;
          }
        }
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.new_role,
            salary: answer.salary,
            department_id: department_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("Your new role has been added.");
            console.table("All roles:", res);
            options();
          }
        );
      });
  });
}

function updateRole() {}

function deleteEmployee() {}

function exitApp() {
  connection.end();
}
