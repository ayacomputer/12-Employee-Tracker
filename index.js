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

        setTimeout(init, 300);
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
            { value: 'department', name: "View All Departments" },
            { value: 'role', name: "View All Roles" },
            { value: 'employee', name: "View All Employees" },
            { value: 'employeeByManager', name: "View Employee By Manager" },
            { value: 'employeeByDepartment', name: "View Employee By Department" },
            { value: 'budget', name: "View Total Utilized Budget of Department" },
            '[Quit]'
        ],
    }];

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
        name: 'update',
        choices: [
            'Update Employee',
            'Update Employee Department',
            'Update Employee Role',
            'Update Employee Manager', '[Quit]']
    }
];


const goodByeMsg = () => figlet('See you !', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.magenta('\n----------------------------------------\n'));
    console.log(chalk.white.bgGreen(data));
    console.log(chalk.magenta('\n----------------------------------------\n'));
});


const promptUser = () => inquirer.prompt(questions);
const promptView = () => inquirer.prompt(viewChoices);
const promptAdd = () => inquirer.prompt(addChoices);
const promptDelete = () => inquirer.prompt(deleteChoices);
const promptUpdate = () => inquirer.prompt(updateChoices);

const init = async () => {
    const data = await promptUser();
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

};




const viewData = () => {
    promptView().then((data) => {
        console.log(data.view)
        switch (data.view) {
            case 'employee':
                return getAll(data.view);
            case 'department':
                return getAll(data.view);
            case 'role':
                return getAll(data.view);
            // case 'View Employee By Manager':
            //     return getEmployeeByManager();
            // case 'View Employee By Department':
            //     return getEmployeeByDepartment();
            // case 'View Total Utilized Budget of Department':
            //     return getBudget();
            case '[Quit]':
                return goodByeMsg();
            default: goodByeMsg();
        }

    })
};



const addData = (data) => {
    promptAdd().then((data) => {
        switch (data.add) {
            case 'Add Employee':
                return addEmployee();
            case 'Add Role':
                return addRole();
            case 'Add Department':
                return addDepartment();
            case '[Quit]':
                return goodByeMsg();
            default: goodByeMsg();
        };
    });
};

const deleteData = (data) => {
    promptDelete().then((data) => {
        switch (data.delete) {
            case 'Delete Employee':
                return deleteSpecificData(data.delete);
            case 'Delete Role':
                return deleteSpecificData(data.delete);
            case 'Delete Department':
                return deleteSpecificData(data.delete);
            case '[Quit]':
                return goodByeMsg();
            default: goodByeMsg();
        };
    })
};

const updateData = (data) => {
    promptUpdate().then(() => {
        switch (data.update) {
            case 'Update Employee':
                return updateEmployee(data.update);
            case 'Update Employee Department':
                return updateSpecificData(data.update);
            case 'Update Employee Role':
                return updateSpecificData(data.update);
            case 'Update Employee Manager':
                return updateSpecificData(data.update);
            case '[Quit]':
                return goodByeMsg();
            default: goodByeMsg();
        };
    });
};

const getAll = (data) => {
    const sql = `SELECT * FROM ${data}`;
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        printTable(rows);
    });
    setTimeout(init, 300);
}

const addSpecificData = async (data) => {
    const newData = inquirer.prompt(
        {
            type: 'input',
            message: `Enter the name of new ${data}`,
            name: `${data}`,
        }
    )
    const sql = `INSERT INTO ${newData} into ${data}`;
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        printTable(rows);
    });
    setTimeout(init, 300);
}





// const getEmployeeByDepartment = () => {
//     inquirer.prompt(
//         {
//             type: 'list',
//             message: 'Which department would you like to view?',
//             name: 'department',
//             choice: departmentArray,
//         }
//     )
//         .then((data) => {
//             const sql = `
//             SELECT department.name, department.id, employee.first_name, role.name, role.id
//             FROM employee
//             LEFT JOIN employee ON employee.role_id = role.id
//             LEFT JOIN department ON role.department_id = department.id
//             WHERE department.id = ${data.department};
//             `;
//             db.query(sql, (err, rows) => {
//                 if (err) {
//                     return console.error('Something went wrong', err);
//                 }
//                 printTable(rows);
//             });
//         })

// };

// const getEmployeeByManager = () => {
//     inquirer.prompt(managerChoice)
//         .then((data) => {
//             const sql = `SELECT * FROM employee WHERE department_id=${data.managerChoice}`;
//             db.query(sql, (err, rows) => {
//                 if (err) {
//                     return console.error('Something went wrong', err);
//                 }
//                 printTable(rows);
//             });
//         })

// };
