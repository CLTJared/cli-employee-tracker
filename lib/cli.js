/* ==========================================================
    Adding in all of the required components.
   ========================================================== */
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

class CLI {
    constructor() {
        this.programChoice = [
            {
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
            }
        ];
    }

    startApp() {
        console.info(' __________________________________')
        console.info('¦                                  ¦')
        console.info('¦         Employee Manager         ¦')
        console.info('¦                                  ¦')
        console.info(' ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾')

        const db = mysql.createConnection(
            {
              host: process.env.sqlHost,
              user: process.env.sqlUser,
              password: process.env.sqlPassword,
              database: process.env.sqlDatabase
            },
            console.log(`Connected to\x1b[32m employees_db\x1b[0m database.`)
          );

        this.promptFunction();
    }

    promptFunction() {
        inquirer.prompt(this.programChoice)
        .then((response) => {
            console.log("User Selected:", response.exit);
            response.exit ? process.exit(0) : this.promptFunction()
        })
    };
}

module.exports = CLI;