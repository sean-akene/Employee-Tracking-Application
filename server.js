//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { CLIENT_RENEG_LIMIT } = require("tls");
//Creating the connection information for sql
const connection = mysql.createConnection({
  host: "localhost",
  // Port
  port: 3306,
  // Username
  user: "root",
  // Password (none)
  password: "",
  database: "employee_appDB",
});
connection.connect(function (err) {
  if (err) throw err;
  promptUser();
});
//Input Questions
const questions = [
  {
    type: "list",
    name: "optionForStart",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View Departments",
      "Add Employee",
      "Update Employee roles",
      "Exit",
    ],
  },
];
// function for the inquirer
function promptUser() {
  inquirer.prompt(questions).then((res) => {
    switch (res.optionForStart) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View Departments":
        viewDepartments();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee roles":
        updateEmployeeRole();
        break;
      case "Exit":
        connection.end();
        break;
      default:
        connection.end();
    }
  });
//   viewing all the employees
  function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
  }
//   adding employees
  function addEmployee() {
    connection.query("SELECT * FROM role ORDER BY title", function (err, res) {
      if (err) throw err;
      const roleChoices = res.map(({ id, title }) => ({
        value: id,
        name: `${title}`,
      }));
      connection.query(
        "SELECT DISTINCT(concat(first_name,' ',last_name)) manager, id, first_name, last_name FROM employee",
        function (err, res1) {
          if (err) throw err;
          const managerChoices = res1.map(({ id, manager }) => ({
            value: id,
            name: `${manager}`,
          }));
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
                validate: function (value) {
                  if (value === "") {
                    return false;
                  } else {
                    return true;
                  }
                },
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                validate: function (value) {
                  if (value === "") {
                    return false;
                  } else {
                    return true;
                  }
                },
              },
              {
                type: "list",
                name: "role",
                message: "What is the role of the new employee?",
                choices: roleChoices,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employeer's manager?",
                choices: managerChoices,
              },
            ])
            .then((answers) => {
              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answers.firstName,
                  last_name: answers.lastName,
                  role_id: answers.role,
                  manager_id: answers.manager,
                },
                function (err) {
                  if (err) throw new Error(err);
                  console.log("Employee added succesfully.");
                  promptUser();
                }
              );
            });
        }
      );
    });
  }
//   viewing all departments 
  function viewDepartments() {
    connection.query("SELECT * FROM department", function (
      err,
      res
    ) {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
  }
//   updating employee role data
  function updateEmployeeRole() {
    connection.query(
      "SELECT DISTINCT(concat(first_name,' ',last_name)) id, first_name, last_name FROM employee",
      function (err, res2) {
        if (err) throw err;
     
        const employeeChoices = res2.map(({ id, first_name, last_name }) => ({
          value: id,
          name: `${first_name} ${last_name}`,
        }));
        // console.log(employeeChoices);
        connection.query(
          "SELECT DISTINCT(concat(first_name,' ',last_name)) manager, id, first_name, last_name FROM employee",
          function (err, res1) {
            if (err) throw err;
            const managerChoices = res1.map(({ id, manager }) => ({
              value: id,
              name: `${manager}`,
            }));
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "role_update",
                  message: "Which employee's manager do you want to update?",
                  choices: employeeChoices,
                },
                {
                  type: "list",
                  name: "update_manager",
                  message:
                    "Which employee's do you want set as manager for the selected employee?",
                  choices: managerChoices,
                },
              ])
              .then((answers) => {
                const [first_name, last_name] = answers.role_update.split(" ");
                connection.query(
                  "UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?",
                  [answers.update_manager, first_name, last_name],
                  function (err) {
                    if (err) throw new Error(err);
                    console.log("Employee role updated succesfully.");
                    promptUser();
                  }
                );
              });
          }
        );
      }
    );
  }
}

// const mysql = require("mysql");
// const inquirer = require("inquirer");
// const consoleTable = require("console.table");
// const util = require("util");



// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "",
//     database: "employee_appDB"
// });

// connection.connect(function(error){
//     if (error) throw error;
//     promptUser(); 
// });

// const questions  = [

//     {
//         type: "list",
//         name: "optionForStart",
//         message: "What would you like to do?",
//         choices: [
//           "View All Employees",
//           "View Departments",
//           "Add Employee",
//           "Update Employee roles",
//           "Exit",
//         ],
//       },
    
// ]

// function addDepartment (){
//     inquirer.prompt({
//         name:"departmentName",
//         type:"input",
//         message:"What is your department name?",
//     })

//     .then(function(answer){
//        console.log(answer);
//        connection.query(
//            "INSERT INTO department SET ?",
//            {
//                name: answer.departmentName
//            },
//            function(err){
//                if (err) throw err;
//                console.log("Your department was created!");
//                addRole()
//            }
//        );
//     })

//     .catch(function(error){
//         console.log(error);
//     });

// }
// addDepartment()

// function addRole (){
//     inquirer.prompt([{
//         name:"titleName",
//         type:"input",
//         message:"What is your title?"
//     },
//     {
//         name:"salary",
//         type:"input",
//         message:"What is your salary?"
//     },
//     {
//         name:"departmentId",
//         type:"input",
//         message:"What is your department ID?"
//     }

// ])

//     .then(function(answer){
//        console.log(answer);
//        connection.query(
//            "INSERT INTO role SET ?",
//            {
//                title: answer.titleName,
//                salary: answer.salary,
//                department_id: parseInt(answer.departmentId)
               
//            },
//            function(err){
//                if (err) throw err;
//                console.log("Your role was created!");
//                addEmployee ()
//            }
//        );
//     })

//     .catch(function(error){
//         console.log(error);
//     });

// }

// function addEmployee (){
//     inquirer.prompt([{
//         name:"firstName",
//         type:"input",
//         message:"What is your First Name?"
//     },

//     {   name:"lastName",
//         type:"input",
//         message:"What is your Last Name?"},

//     {
//         name:"roleId",
//         type:"input",
//         message:"What is your role ID?"
//     },
//     {
//         name:"managerId",
//         type:"input",
//         message:"What is your manager ID?"
//     }

// ])

//     .then(function(answer){
//        console.log(answer);
//        connection.query(
//            "INSERT INTO employee SET ?",
//            {
//                 first_name: answer.firstName,
//                 last_name: answer.lastName,
//                 role_id: parseInt(answer.roleId),
//                 manager_id: parseInt(answer.managerId)
               
//            },
//            function(err){
//                if (err) throw err;
//                console.log("Your credentials were created!");
            
//            }
//        );
//     })

//     .catch(function(error){
//         console.log(error);
//     });

// }


// function viewAllEmployees(){

// }