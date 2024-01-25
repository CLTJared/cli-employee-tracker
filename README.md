# CLI Employee Tracker
Command Line based Employee Tracking program utilizing Inquirer and MySQL2 packages.

# Table of Contents
- [Description](#description)
    - [User Story](#user-story)
    - [Acceptance](#acceptance)
- [Installation](#installation)
    - [Usage](#usage)
- [Demo](#demo-video)
- [Screenshot](#screenshot)

## Description
Utilizing Inquirer and MySQL2 packages, this CLI application connects to a database and performs queries based on user input provided from the CLI.

### User Story
```bash
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Acceptance
```bash
GIVEN a command-line application that accepts user input

    WHEN I start the application
    THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    WHEN I choose to view all departments
    THEN I am presented with a formatted table showing department names and department ids

    WHEN I choose to view all roles
    THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

    WHEN I choose to view all employees
    THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    WHEN I choose to add a department
    THEN I am prompted to enter the name of the department and that department is added to the database

    WHEN I choose to add a role
    THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

    WHEN I choose to add an employee
    THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

    WHEN I choose to update an employee role
    THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

# Installation
Run the following command in Windows CMD or Mac OS Terminal.

```bash
git clone git@github.com:CLTJared/cli-employee-tracker.git
```

After cloning the repo, import the files in the DB folder into your MySQL database.
1. schema.sql - ***required***
2. seed.sql

Once database is created, open `.env.default`, copy the contents into a new file called `.env`, and fill out the required variables to be used in this project.

## Usage
On first startup, run the following command to install the required NPM packages
```bash
npm i
```

To start application, run the following command
```bash
node index.js
``` 

## Demo Video

## Screenshot