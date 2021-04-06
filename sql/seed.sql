USE employee_tracker;

INSERT INTO department (department_title)
VALUES ("Marketting");

INSERT INTO department (department_title)
VALUES ("Engineering");

INSERT INTO department (department_title)
VALUES ("Sales");

INSERT INTO roles (role_name, department_id)
VALUES ("Marketting Manager", 1);

INSERT INTO roles (role_name, department_id)
VALUES ("Engineering Manager", 2);

INSERT INTO roles (role_name, department_id)
VALUES ("Sales Manager", 3);

INSERT INTO roles (role_name, department_id)
VALUES ("Engineer", 2);

INSERT INTO roles (role_name, department_id)
VALUES ("Marketer", 1);

INSERT INTO roles (role_name, department_id)
VALUES ("Seller", 3);

INSERT INTO roles (role_name, department_id)
VALUES ("Intern", 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Person1", "Shmoe", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Person2", "Shmoe", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sales", "Shmoe", 3, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Employee", "One", 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Employee", "Two", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Employee", "Three", 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Employee", "Four", 2, 3);
