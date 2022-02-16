const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');
const chalk = require('chalk');
let departmentArray = [];
let employees = [];
let roles = [];


require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
);

db.connect(function (err) {
    figlet('Employee Tracker', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.magenta('\n------------------------------------------------------------------------------------\n'));
        console.log(chalk.white.bgCyan(data));
        console.log(chalk.magenta('\n------------------------------------------------------------------------------------\n'));
        console.log(chalk.magenta('Please answer the following questions:'));

        init();
    });
});



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
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
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


const goodByeMsg = () => console.log(chalk.green.bgGreen('\n-------SEE YOU--------'))
const promptUser = () => inquirer.prompt(questions);
const promptView = () => inquirer.prompt(viewChoices);
const promptAdd = () => inquirer.prompt(addChoices);
const promptDelete = () => inquirer.prompt(deleteChoices);
const promptUpdate = () => inquirer.prompt(updateChoices);

const init = () => {
    promptUser().then((data) => {
        switch (data.initial) {
            case 'View':
                return viewData();
            case 'Add':
                return addData();
            case 'Update':
                return updateData();
            case 'Delete':
                return deleteData();
            case '[Quit]':
                return goodByeMsg();
            default: console.log('default')
        }

    });
};


const viewData = (data) => {
    promptView().then((data) => {
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

    })
};



const getAllEmployees = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        printTable(rows);
    });
    init();

};

const getAllRoles = () => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        printTable(rows);
    });
    init();
};

const getAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        printTable(rows);
    });
    init();
};

const getEmployeeByDepartment = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Which department would you like to view?',
            name: 'department',
            choice: departmentArray,
        }
    )
        .then((data) => {
            const sql = `SELECT * FROM employee WHERE department_id=${data}`;
            db.query(sql, (err, rows) => {
                if (err) {
                    return console.error('Something went wrong', err);
                }
                printTable(rows);
            });
        })

};

const getEmployeeByManager = () => {
    inquirer.prompt(managerChoice)
        .then((data) => {
            const sql = `SELECT * FROM employee WHERE department_id=${data.managerChoice}`;
            db.query(sql, (err, rows) => {
                if (err) {
                    return console.error('Something went wrong', err);
                }
                printTable(rows);
            });
        })

};
