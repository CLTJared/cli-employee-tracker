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

    const addDepartment = [{
        type: 'input',
        message: 'Department Name:',
        name: 'addDept'
    }]

    const addEmployee = [{ //answer.empFirst,answer.empLast,answer.role,answer.manager
        type: 'input',
        message: 'First Name:',
        name: 'empFirst'
    },
    {
        type: 'input',
        message: 'Last Name:',
        name: 'empLast'
    },
    {
        type: 'input',
        message: 'Role ID:',
        name: 'role'
    },
    {
        type: 'input',
        message: 'Manager ID:',
        name: 'manager'
    }
    ]

    const addRole = [{
        type: 'input',
        message: 'Role Name:',
        name: 'rName'
    },
    {
        type: 'input',
        message: 'Salary:',
        name: 'rSalary'
    },
    {
        type: 'input',
        message: 'Dept ID:',
        name: 'rDeptID'
    }
]

    const updateRole = [{
        type: 'input',
        message: 'Emp ID to update:',
        name: 'empID'
    },
    {
        type: 'input',
        message: 'New employee Role:',
        name: 'empRole'
    }]
   
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
        console.log('  ')
        promptFunction();
    });

    const promptFunction = () => {
        inquirer.prompt(action)
        .then((response) => {
            console.log("User Selected:", response.function);
            //process.exit | 0 = no error, 1 = with errors
            response.exit ? process.exit(0) : true;

            // TODO: Write functionality to handle different choices above, call functions to ask more questions and perform queries
            response.function === 'View All Departments' ? 
                db.query("SELECT name AS 'Department Name' FROM department", 
                (err, response) => { console.table(response); promptFunction()})
            : response.function === 'View All Employees' ? 
                db.query("SELECT e.id AS 'Emp. ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Title', d.name AS 'Department', r.salary AS 'Salary', GROUP_CONCAT(m.first_name, ' ', m.last_name) AS 'Manager Name' FROM employee as e INNER JOIN role as r ON r.id = e.role_id INNER JOIN department as d ON d.id = r.department_id INNER JOIN employee as m ON e.manager_id = m.id GROUP BY e.id", 
                (err, response) => { console.table(response); promptFunction()})
            : response.function === 'View All Roles' ? 
                db.query("SELECT r.title AS 'Title', r.salary AS 'Salary', d.name AS 'Department' FROM role as r INNER JOIN department as d ON r.department_id = d.id", 
                (err, response) => { console.table(response); promptFunction()})
            : response.function === 'Add New Department' ? 
                newDepartment()
            : response.function === 'Add New Employee' ?
                newEmployee()
            : response.function === 'Add New Role' ?
                newRole()
            : response.function === 'Update Employee Role' ?
                updateEmp()
            : console.error('\x1b[31m', 'Unaccounted answer was entered into list.', '\x1b[0m');
        })
    };

    const newDepartment = async () => {
       await inquirer.prompt(addDepartment)
       .then((answer) => {
        db.query("INSERT INTO department (name) VALUES (?)", answer.addDept,
                (err, response) => { console.log(`Added new department as ID: ${response.insertID}`); promptFunction(); })
       })
    }

    const newEmployee = async () => {
        await inquirer.prompt(addEmployee)
        .then((answer) => {
            const empQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.empFirst}","${answer.empLast}","${answer.role}","${answer.manager}")`;
         db.query(empQuery,
                 (err, response) => { console.table(response); console.log(`Added new employee.`); promptFunction(); })
        })
     }

     const newRole = async () => {
        await inquirer.prompt(addRole)
        .then((answer) => {
            const roleQuery = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.rName}", "${answer.rSalary}", "${answer.rDeptID}")`
         db.query(roleQuery,
                 (err, response) => { console.table(response); console.log(`Added new role.`); promptFunction(); })
        })
     }

     const updateEmp = async () => {
        await inquirer.prompt(updateRole)
        .then((answer) => {
            const updateQuery = `UPDATE employee SET role_id="${answer.empRole}" WHERE id="${answer.empID}"`
         db.query(updateQuery,
                 (err, response) => { console.table(response); console.log(`Updated employee role.`); promptFunction(); })
        })
     }

    /*
    SELECT e.id AS 'Emp. ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Title', d.name AS 'Department', r.salary AS 'Salary', GROUP_CONCAT(m.first_name, ' ', m.last_name) AS 'Manager Name' FROM employee as e INNER JOIN role as r ON r.id = e.id INNER JOIN department as d ON d.id = r.department_id INNER JOIN employee as m ON e.manager_id = m.id GROUP BY e.id IS NULL THEN ' '
    */