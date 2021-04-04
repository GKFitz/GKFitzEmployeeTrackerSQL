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
    createDepartment();
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

    
    

