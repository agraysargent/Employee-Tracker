USE employees_db;

INSERT INTO department (name)
VALUES
('Information Systems & Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 90000, 1),
('Accoutant', 70000, 2),
('Paralegal', 50000, 3),
('Manager', 70000, 4),
('Engineer', 90000, 5),
('Sales Rep', 40000, 6),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Angelica', 'Sargent', 1, 109),
('Geralt', 'Rivia', 2, 518),
('Ash', 'Ketchum', 3, 522),
('Commander', 'Shepard', 4, 411),
('Alistair', 'Theirin', 5, 910),
('Cassandra', 'Pentaghast', 6, 904),