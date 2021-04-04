const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable= require("console.table");
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "chocolate1",
  database: 'employees_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("mysql connected");
    // createDepartment("Admin");
    // createRole("VP", 150000, 1);
    // createEmployee("Claire", "Clareson", 1, 1);
    createDepartment();
    createRole("VP", 150000, 1);
    createEmployee("Claire", "Clareson", 1, 1);
    // updateDepartment(1, "name", "Accounts Rec");
    // updateEmployee(2, "first_name", "kelly");
    // updateEmployee(2, "last_name", "Keller");
    updateDepartment();
    updateRole();
    updateEmployee();
    deleteEmployee(4);
    readDepartment();
    readRole();
    readEmployee();
    
    
});

function readDepartment() {
    let query= "SELECT * from department";
    connection.query(query, function(err, result){
        if(err){
            throw err
        }
        console.table(result)   
    }) 
    
    
}
function readRole() {
    let query= "SELECT * from role";
    connection.query(query, function(err, result){
        if(err){
            throw err
        }
        console.table(result)   
    }) 
    
    
}

function readEmployee() {
    let query= "SELECT * from employee";
    connection.query(query, function(err, result){
        if(err){
            throw err
        }
        console.table(result)   
    }) 
    
    
}

function createDepartment(name) {
    let query= `INSERT into department (name) VALUES ("${name}")`;
    connection.query(query, function(err, result){
        if(err){
            throw err
        }   
        console.log("Department created!")
    });
   
}

function createRole(title, salary, department_id) {
    let query= `INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`;
    connection.query(query, function(err, result){
        if(err){
            throw err
        }
        console.log("Role created!")
    });
   
}
function createEmployee(first_name, last_name, role_id, manager_id) {
    let query= `INSERT into employee(first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}","${manager_id}")`;
    connection.query(query, function(err, result){
        if(err){
            throw err
        }
        console.log("Employee created!")
    })
}
function updateDepartment(id, prop, value) {
    let query= `UPDATE department set ${prop} = "${value} where id = "${id}`;
    connection.query(query, function(err,result){
        if(err){
            throw err
        }
        console.log("Department updated!")
    })
}
function updateRole(id, prop, value) {
    let query= `UPDATE role set ${prop} = "${value} where id = "${id}`;
    connection.query(query, function(err,result){
        if(err){
            throw err
        }
        console.log("Role updated!")
    })
}
function updateEmployee(id, prop, value){
    let query= `UPDATE employee set ${prop} = "${value} where id = "${id}`; 
    connection.query(query, function(err,result){
        if(err){
            throw err
        }
        console.log("Employee updated!")
    })
}
function deleteEmployee(id) {
    let query= `DELETE from employee where id = "${id}"`;
    connection.query(query, function(err, result){
        if(err){
            throw err
        }
        console.log("employee deleted!")   
    }) 
    
    
}


    
    

