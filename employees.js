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
    // createDepartment();
    // createRole("VP", 150000, 1);
    // createEmployee("Claire", "Clareson", 1, 1);
    // updateDepartment(1, "name", "Accounts Rec");
    // updateEmployee(2, "first_name", "kelly");
    // updateEmployee(2, "last_name", "Keller");
    // updateDepartment();
    // updateRole();
    // updateEmployee();
    // deleteEmployee(4);
    //readDepartment();
    // readRole();
    //readEmployee();

    console.log("Welcome to the Employee Tracker!");
    mainMenu();
    
    
});

function mainMenu() {
    inquirer
      .prompt({
        name: "choice",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
        //   "Add an employee",
        //   "Update employee department",
          "Update employee role",
          "Delete an Employee",
          "Exit"
        ],
        // name: "choice"
      })
    .then(answer => {
        switch (answer.choice){
        case 'View all departments':
            readDepartment();
            break;
        case 'View all roles':
            readRole();
            break;
        case 'View all employees':
            readEmployee();
            break;
        case 'Add a department':
            createDepartment();
        break;
        case 'Add a role':
            createRole();
        break;
        case 'Add an employee':
            createEmployee();
        break;
        // case 'Update employee department':
        //     updateDepartment();
        // break;
        case 'Update employee role':
            updateRole();
        break;
        // case 'Update employee':
        //     updateEmployee();
        // break;
        case 'Exit':
            connection.end();
        break;
        }
    });
}



function readDepartment() {
    let query= "SELECT * from department";
    connection.query(query, function(err, res){
        if(err) throw err
        console.table(res)
    
        mainMenu();
    })
    
};
// console.table(result)   
     
    
    

function readRole() {
    let query= "SELECT * from role";
    connection.query(query, function(err, res){
        if(err) throw err
        console.table(res)
        
        mainMenu();
        
    })
    //mainMenu();

    //console.table(result)   
}

function readEmployee() {
    let query= "SELECT * from employee";
    connection.query(query, function(err, res){
        if(err) throw err
        console.table(res)
        mainMenu();
        //console.table(result)   
        
    }) 
    
    
}

function createDepartment() {
    inquirer
        .prompt([{
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
        }]).then(function(res) {
            connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, res) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            })
        })
}
// .then(function(answer){
// let query= `INSERT into department (name) VALUES ("${name}")`;
// connection.query(query, function(err, res){
//     if(err) throw err
//     console.log(`You have added this department: ${(answer.department)}.`)
            
//     // console.log("Department created!")
// })
// readDepartment();
// })

   


function createRole() {
    let query= "SELECT * from department";
    let department_name= [];
    var department= [];
    connection.query(query, function(err, res){
        if(err) throw err
        // console.table(res)
        // console.log(res)
        for(let i= 0; i < res.length; i++){
            let currentDept= res[i];
            var currentName = currentDept.name;
            var currentID= currentDept.id
            let deptOBJ= {
                id: currentID,
                name: currentName
            }
            department.push(deptOBJ);
            department_name.push(currentDept.name);
        }
    })
    inquirer
        .prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
        }, 
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?",
        },
        {
            name: "department_name",
            type: "list",
            message: "Which department does this role fall under?",
            choices: department_name
        }
        ]).then(function(res){
            let departmentID;
            for(var i =0; i < department.length; i++){
                let currentDept= department[i];
                if(currentDept.name === res.department_name){
                    departmentID = currentDept.id;
                }
                
            }
            // console.log(department)
            // console.log(departmentID)
            console.log(res.title)
            console.log(res.salary)
            console.log(departmentID)
            connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [res.title, res.salary, departmentID], function(err, res){
                if(err) throw err
                console.table(res);
            });
            mainMenu();
        });
} 
// title, salary, department_id
// choices: function() {
//     var choicesArray = [];
//     res.forEach(res => {
//         choicesArray.push(
//             res.name
//         );
//     })
//     return choicesArray;
//   }
          
//console.log("Role created!")
   

function createEmployee() {
    let query= "SELECT * from role";
    let role_name= [];
    var roles= [];
    connection.query(query, function(err, res){
        if(err) throw err
        // console.table(res)
        // console.log(res)
        for(let i= 0; i < res.length; i++){
            let currentRole= res[i];
            var currentTitle = currentRole.title;
            var currentRoleID = currentRole.id;
            var currentDeptID = currentRole.department_id;
            let roleOBJ= {
                id: currentRoleID,
                title: currentTitle,
                department_id: currentDeptID
            }
            roles.push(roleOBJ);
            role_name.push(currentRole.title);
        }
    })
    inquirer
    .prompt([{
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
    }, 
    {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
    },
    {
        name: "roleName",
        type: "list",
        message: "What role does the employee have?",
        choices: role_name
               
    }

    ]).then(function(res){
        let roleID;
            for(var i =0; i < roles.length; i++){
                let currentRole= roles[i];
                if(currentRole.title === res.roleName){
                    roleID = currentRole.id;
                }
                
            }
            // console.log(roles)
            // console.log(roleID)
            connection.query(`INSERT into employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [res.first_name, res.last_name, roleID, null], function(err, res){ 
                if(err) throw err;
                console.table(res);
                mainMenu();
    })

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

function updateRole() {
    readEmployee();
    let queryEmployee= "SELECT * from employee";
    let employee_name= [];
    let employees= [];
    connection.query(queryEmployee, function(err, res){
        if(err) throw err
        // console.log(res)
        // mainMenu();
        //console.table(result) 
        for(let i= 0; i < res.length; i++){
            let currentEmployee = res[i];
            var currentName = currentEmployee.first_name;
            // var currentName = currentEmployee.first_name + " " + currentEmployee.last_name;
            var currentEmployeeID = currentEmployee.id;
            let employeeOBJ= {
                id: currentEmployeeID,
                name: currentName,
            }
            employees.push(employeeOBJ);
            employee_name.push(currentName);
            // console.log(employee_name);
            // console.log(employees);
        }  
    });
    // console.log(employee_name)
    // let queryRole= "SELECT * from role";
    // let role_name= [];
    // var roles= [];
    // connection.query(queryRole, function(err, res){
    //     if(err) throw err
    //     // console.table(res)
    //     // console.log(res)
    //     for(let i= 0; i < res.length; i++){
    //         let currentRole= res[i];
    //         var currentTitle = currentRole.title;
    //         var currentRoleID = currentRole.id;
    //         var currentDeptID = currentRole.department_id;
    //         let roleOBJ= {
    //             id: currentRoleID,
    //             title: currentTitle,
    //             department_id: currentDeptID
    //         }
    //         roles.push(roleOBJ);
    //         role_name.push(currentRole.title);
    //     }
    // })
    inquirer.prompt([
        {
            name: "employee",
            message: "What is the name of the employee you would like to update?",
            type: "list",
            choices: employee_name
            
        },  
        {
            name: "role_id",
            message: "enter the new role ID:",
            type: "number"
        }
    ]).then(function(res){
            console.log(res)
            // connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?, WHERE last_name =?", [res.role_id, res.first_name, res.last_name], function(err,res){
            //     if(err) throw err
            //     console.log(res);
            // });
            // mainMenu();
        })
}
// id, prop, value
function updateEmployeeRole(id, prop, value){
    let query= `UPDATE employee set ${prop} = "${value} where id = "${id}`; 
    connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name],query, function(err,result){
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


    
    

