-- Data to pre-load database will be entered here
INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 70000, 1),
('Software Engineer', 125000, 1),
('Accountant', 40000, 2),
('Sales Lead', 80000, 3),
('Project Manager', 105000, 4),
('Operations Manager', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jared', 'Elliott', 1, 1),
('Deven', 'Castoria', 3, 1),
('Natalie', 'Yaspo', 1, 3),
('Kyle', 'Coulter', 6, 3);