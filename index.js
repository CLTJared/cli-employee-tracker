/* ==========================================================
    Adding in all of the required components.
   ========================================================== */
   const inquirer = require('inquirer');
   const mysql = require('mysql2');
   require('dotenv').config();
   
/* ==========================================================
    Connect to the MySQL Database
   ========================================================== */
   const db = mysql.createConnection(
       {
           host: process.env.sqlHost,
           user: process.env.sqlUser,
           password: process.env.sqlPassword,
           database: process.env.sqlDatabase
       });
   
/* ==========================================================
    Define inquirer actions
   ========================================================== */
   const action = [{
           type: 'list',
           message: 'Which action would you like to perform?',
           name: 'function',
           choices: ['View All Departments', 'View All Roles', 'View All Employees', new inquirer.Separator(), 'Add New Department', 'Add New Role', 'Add New Employee', new inquirer.Separator(), 'Update Employee Role', new inquirer.Separator(), 'Exit Program', new inquirer.Separator()]
       },
       {
           type: 'confirm',
           message: 'Are you sure you want to exit?',
           name: 'exit',
           when: (answers) => answers.function === 'Exit Program'
       }];
   
/* ==========================================================
    Program Actions Below
   ========================================================== */
       console.info(' __________________________________')
       console.info('¦                                  ¦')
       console.info('¦         Employee Manager         ¦')
       console.info('¦                                  ¦')
       console.info(' ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾')

    db.connect(err => {
        err ? console.error(err) : console.info(`Connected to\x1b[32m employees_db\x1b[0m database.`)
        promptFunction();
    });

    const promptFunction = () => {
        inquirer.prompt(action)
        .then((response) => {
            console.log("User Selected:", response.function);
            //process.exit | 0 = no error, 1 = with errors
            response.exit ? process.exit(0) : true;

            // TODO: Write functionality to handle different choices above, call functions to ask more questions and perform queries
            response.function === 'View All Departments' ? db.query("SELECT name FROM department", (err, response) => { console.table(response); promptFunction()})
            : response.function === 'View All Employees' ? db.query("SELECT first_name, last_name, role_id, manager_id FROM employee", (err, response) => { console.table(response); promptFunction()})
            : response.function === 'View All Roles' ? db.query("SELECT r.title, r.salary, d.name FROM role as r INNER JOIN department as d ON r.department_id = d.id", (err, response) => { console.table(response); promptFunction()})
            : console.error('\x1b[31m', 'Unaccounted answer was entered into list.')
        })
    };