const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');


require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    console.log(`Connected to the movies_db database.`)
);

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initial',
        choices: ['View All Employees',
            'View All Departments',
            'View All Roles',
            'View Employee By Manager',
            'View Employee By Department',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Update Employee',
            'Update Employee Department',
            'Update Employee Role',
            'Update Employee Manager',
            'Delete Department',
            'Delete Role',
            'Delete Employee',
            'View Total Utilized Budget of Department',
            '[Quit]'],
    },
];


const welcomeMsg = () => {
    figlet('Employee Tracker', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.white.bgCyan
            (`\n${data}`));
    });
    console.log(chalk.magenta('Please answer the following questions:'));
};


const promptUser = () => inquirer.prompt(questions);


const init = () => {
    welcomeMsg();
    promptUser().then((data) => {
        console.log(data.initial);
        switch (data.initial) {
            case 'View All Employees':
                return getAllEmployees();
            case 'View All Departments':
                return getAllDepartments();
            case 'View All Roles':
                return getAllRoles();
            case 'View Employee By Manager':
                return getEmployeeByManager();
            case 'View Employee By Department':
                return getEmployeeByDepartment();
            case 'View Total Utilized Budget of Department':
                return getBudget();
            case 'Add Employee':
                return addEmployee();
            case 'Add Department':
                return addDepartment();
            case 'Add Role':
                return addRole();
            case 'Update Employee':
                return updateEmployee();
            case 'Update Employee Department':
                return updateEmployeeDepartment();
            case 'Update Employee Role':
                return updateEmployeeRole();
            case 'Update Employee Manager':
                return updateEmployeeManager();
            case 'Delete Department':
                return deleteDepartment();
            case 'Delete Employee':
                return deleteEmployee();
            case 'Delete Employee':
                return deleteEmployee();
            default: console.log('default')
        }

    });
};



const getAllEmployees = () => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        console.table(rows);
    });


};

init();
