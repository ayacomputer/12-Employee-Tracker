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
        choices: ['View', 'Add', 'Update', 'Delete', '[Quit]']
    }];

const viewChoices = [
    {
        type: 'list',
        message: 'What would you like to view?',
        name: 'view',
        choices: ['View All Employees',
            'View All Departments',
            'View All Roles',
            'View Employee By Manager',
            'View Employee By Department',
            'View Total Utilized Budget of Department', '[Quit]']
    }
];

const addChoices = [
    {
        type: 'list',
        message: 'What would you like to add?',
        name: 'add',
        choices: ['Add Employee',
            'Add Department',
            'Add Role', '[Quit]']

    }
];

const deleteChoices = [
    {
        type: 'list',
        message: 'What would you like to delete?',
        name: 'delete',
        choices: ['Delete Employee',
            'Delete Department',
            'Delete Role', '[Quit]']

    }
];

const updateChoices = [
    {
        type: 'list',
        message: 'What would you like to delete?',
        name: 'delete',
        choices: [
            'Update Employee',
            'Update Employee Department',
            'Update Employee Role',
            'Update Employee Manager', '[Quit]']
    }
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

const goodByeMsg = () => console.log(chalk.green('\n-------SEE YOU--------'))
const promptUser = () => inquirer.prompt(questions);
const promptView = () => inquirer.prompt(viewChoices);
const promptAdd = () => inquirer.prompt(addChoices);
const promptDelete = () => inquirer.prompt(deleteChoices);
const promptUpdate = () => inquirer.prompt(updateChoices);

const init = () => {
    welcomeMsg();
    promptUser().then((data) => {
        console.log(data.initial);
        switch (data.initial) {
            case 'View':
                return viewData(data);
            case 'Add':
                return addData(data);
            case 'Update':
                return updateData(data);
            case 'Delete':
                return deleteData(data);
            case '[Quit]':
                return goodByeMsg(data);
            default: console.log('default')
        }

    });
};


const viewData = (data) => {
    promptView().then((data) => {
        console.log(data.view)
        switch (data.view) {
            case 'View All Employees':
                return getAllEmployees();
            case 'View All Departments':
                return getAllDepartments();
            case 'View All Roles':
                return getAllRoles();
            case 'View Employee By Manager':
                return getEmployeeByManager();
            case 'View Employee By Department':
                return getEmployeeByDepartment;
            case 'View Total Utilized Budget of Department':
                return getBudget();
            case '[Quit]':
                return goodByeMsg();
            default: goodByeMsg();
        }
    }
    )
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
