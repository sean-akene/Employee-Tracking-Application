const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Passisgw1996!",
    database: "employee_appDB"
});

connection.connect();

function addDepartment (){
    inquirer.prompt({
        name:"departmentName",
        type:"input",
        message:"What is your department name?",
    })

    .then(function(answer){
       console.log(answer);
       connection.query(
           "INSERT INTO department SET ?",
           {
               name: answer.departmentName
           },
           function(err){
               if (err) throw err;
               console.log("Your department was created!");
               addRole()
           }
       );
    })

    .catch(function(error){
        console.log(error);
    });

}
addDepartment()

function addRole (){
    inquirer.prompt([{
        name:"titleName",
        type:"input",
        message:"What is your title?"
    },
    {
        name:"salary",
        type:"input",
        message:"What is your salary?"
    },
    {
        name:"departmentId",
        type:"input",
        message:"What is your department ID?"
    }

])

    .then(function(answer){
       console.log(answer);
       connection.query(
           "INSERT INTO role SET ?",
           {
               title: answer.titleName,
               salary: answer.salary,
               department_id: parseInt(answer.departmentId)
               
           },
           function(err){
               if (err) throw err;
               console.log("Your role was created!");
               addEmployee ()
           }
       );
    })

    .catch(function(error){
        console.log(error);
    });

}

function addEmployee (){
    inquirer.prompt([{
        name:"firstName",
        type:"input",
        message:"What is your First Name?"
    },

    {   name:"lastName",
        type:"input",
        message:"What is your Last Name?"},

    {
        name:"roleId",
        type:"input",
        message:"What is your role ID?"
    },
    {
        name:"managerId",
        type:"input",
        message:"What is your manager ID?"
    }

])

    .then(function(answer){
       console.log(answer);
       connection.query(
           "INSERT INTO employee SET ?",
           {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: parseInt(answer.roleId),
                manager_id: parseInt(answer.managerId)
               
           },
           function(err){
               if (err) throw err;
               console.log("Your credentials were created!");
            
           }
       );
    })

    .catch(function(error){
        console.log(error);
    });

}


