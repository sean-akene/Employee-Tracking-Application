

USE employee_appDB;
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kimberly", "Hyde", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Deanna", "Sampson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luis", "Mackenzie", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ines", "Mac", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ellise", "Briggs", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ewan", "Colt", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jaheim", "Maxwell", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dylan", "Mora", 1, 2);



-- alternative
-- USE employee_appDB;

-- INSERT INTO role
--     (title, salary, department_id)
-- VALUES
--     ("sales lead", 2000, 123),
--     ("software engineer", 3000, 124),
--     ("lead engineer", 5000, 125),
--     ("accountant", 3000, 126),
--     ("lawyer", 5000, 127);

-- INSERT INTO employee
--     (first_name, last_name, role_id, manager_id)
-- VALUES
--     ("kimberly", "hyde", 246, 789),
--     ("deanna", "sampson", 257, 799),
--     ("luis", "mackenzie", 268, 812),
--     ("ines", "mac", 269, 813),
--     ("ellise", "briggs", 270, 814);

-- INSERT INTO department
--     (name)
-- VALUES
--     ("sales", "software", "finance", "law", "marketing");