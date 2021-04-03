const mysql = require('mysql2');
const inquirer = require('inquirer');

 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "chocolate1",
  database: 'employees_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("mysql connected")
    //runSearch();
});

//create department

async function createDepartment(name) {
    let query= `INSERT into department (name) VALUES ("${name}")`;
    connection.query()

}


