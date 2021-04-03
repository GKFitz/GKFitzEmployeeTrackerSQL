USE employees_db
INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("Engineering");
INSERT into department (name) VALUES ("HR");
INSERT into department (name) VALUES ("IT");

INSERT into role (title, salary, department_id) VALUES ("Manager", 90000.00, 1);
INSERT into role (title, salary, department_id) VALUES ("Associate", 90000.00, 2);
INSERT into role (title, salary, department_id) VALUES ("Assitant", 90000.00, 3);
INSERT into role (title, salary, department_id) VALUES ("Partner", 100000.00, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John","Johnny", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Sara","Sarahson", 2, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Don","Donny", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jill","Jillson", 4, null);


