const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');
const chalk = require('chalk');
let departmentArray = [];
let employeeArray = [];
let roleArray = [];


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
            { value: 'all', name: "View All Information" },
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

const addEmployeeChoices = [
    {
        type: 'input',
        message: `Enter the first name of new employee`,
        name: `first_name`,
    },
    {
        type: 'input',
        message: `Enter the last name of new employee`,
        name: `last_name`,
    },
    {
        type: 'input',
        message: `Enter the role id of new employee`,
        name: `role_id`,
    },
    {
        type: 'input',
        message: `Enter the manager id of new employee`,
        name: `manager_id`,
    }
]

const addRoleChoices = [
    {
        type: 'input',
        message: `Enter the title of the role`,
        name: `title`,
    },
    {
        type: 'input',
        message: `Enter the salary of the role`,
        name: `salary`,
    },
    {
        type: 'input',
        message: `Enter the department_id`,
        name: `department_id`,
    }
]


const addDepartmentChoices = [
    {
        type: 'input',
        message: `Enter a name of the new department`,
        name: `name`,
    }
]

const deleteEmployeeChoices = [
    {
        type: "input",
        message: "Enter the first name of the employee you wish to delete:",
        name: "first_name"
    },
    {
        type: "input",
        message: "Enter the last name of the employee you wish to delete:",
        name: "last_name",
    }
]

const deleteRoleChoices = [
    {
        type: "input",
        message: "Enter the title name of the role you wish to delete:",
        name: "title"
    }
]

const deleteDepartmentChoices = [
    {
        type: "input",
        message: "Enter the name of the department you wish to delete:",
        name: "name"
    }
]


const updateEmployeeChoices = [
    {
        type: "list",
        message: "What would you like to update?",
        name: "choices",
        choices: ["name", "role_id", "manager_id"]
    }

]

const updateNameOfEmployeeChoices = [
    {
        type: "input",
        message: "Enter the employee id of the employee you wish to update:",
        name: "id"
    },
    {
        type: "input",
        message: "Update the first name:",
        name: "first_name"
    },
    {
        type: "input",
        message: "Update the last name:",
        name: "last_name"
    }
]

const updateRoleIdOfEmployeeChoices = [
    {
        type: "input",
        message: "Enter the employee id of the employee you wish to update:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter the new role id of the employee you wish to update:",
        name: "new_role"
    }
]

const updateManagerOfEmployeeChoices = [
    {
        type: "input",
        message: "Enter the new manager id of the employee you wish to update:",
        name: "new_manager"
    }
]

const updateRoleChoices = [
    {
        type: "input",
        message: "Enter the role title you wish to update:",
        name: "title"
    },
    {
        type: "input",
        message: "Enter new title for the role:",
        name: "new_title"
    }
]

const updateDepartmentChoices = [
    {
        type: "input",
        message: "Enter the department id you wish to update:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter new name for the department:",
        name: "name"
    }
]



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
const promptAddEmployee = () => inquirer.prompt(addEmployeeChoices)
const promptAddRole = () => inquirer.prompt(addRoleChoices);
const promptAddDepartment = () => inquirer.prompt(addDepartmentChoices);
const promptDeleteEmployee = () => inquirer.prompt(deleteEmployeeChoices);
const promptDeleteRole = () => inquirer.prompt(deleteRoleChoices)
const promptDeleteDepartment = () => inquirer.prompt(deleteDepartmentChoices);
const promptUpdateEmployee = () => inquirer.prompt(updateEmployeeChoices);
const promptUpdateRoleIdOfEmployee = () => inquirer.prompt(updateRoleIdOfEmployeeChoices);
const promptUpdateNameOfEmployee = () => inquirer.prompt(updateNameOfEmployeeChoices);
const promptUpdateDepartment = () => inquirer.prompt(updateDepartmentChoices);
const promptUpdateRole = () => inquirer.prompt(updateRoleChoices);
const promptUpdateManager = () => inquirer.prompt(updateManagerChoices);


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
            case 'all':
                return viewAllInfo();
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
                return deleteEmployee(data.delete);
            case 'Delete Role':
                return deleteRole(data.delete);
            case 'Delete Department':
                return deleteDepartment(data.delete);
            case '[Quit]':
                return goodByeMsg();
            default: goodByeMsg();
        };
    })
};
const updateData = (data) => {
    promptUpdate().then((data) => {
        switch (data.update) {
            case 'Update Employee':
                return updateEmployee(data.update);
            case 'Update Employee Department':
                return updateDepartment(data.update);
            case 'Update Employee Role':
                return updateRole(data.update);
            case 'Update Employee Manager':
                return updateEmployeeManager(data.update);
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
const viewAllInfo = () => {
    const sql = `
    DROP TABLE IF EXISTS allinfo;
CREATE TABLE allinfo AS
SELECT employee.id AS id, 
    CONCAT(employee.first_name," ",employee.last_name) AS 'Full Name', 
    department.name AS 'department', 
    role.title AS 'role', 
    role.salary AS 'salary', 
    manager_id AS manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;`
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        printTable(rows);
    });
    setTimeout(init, 300);
}
const addEmployee = (data) => {
    promptAddEmployee().then((data) => {
        employeeArray.push(data);
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("${data.first_name}", "${data.last_name}", ${data.role_id}, ${data.manager_id}); `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The employee successfully added')

        });
        setTimeout(init, 300);

    })


}
const addRole = () => {
    promptAddRole().then((data) => {
        roleArray.push(data);
        const sql = `INSERT INTO role(title, salary, department_id)
    VALUES("${data.title}", "${data.salary}", ${data.department_id}); `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The role successfully added')

        });
        setTimeout(init, 300);

    })
};
const addDepartment = () => {
    promptAddDepartment().then((data) => {
        departmentArray.push(data);
        const sql = `INSERT INTO department(name)
    VALUES("${data.name}"); `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The department successfully added')

        });
        setTimeout(init, 300);

    })
};
const deleteEmployee = () => {
    promptDeleteEmployee().then((data) => {
        const sql = `DELETE FROM employee WHERE first_name = "${data.first_name}" and last_name = "${data.last_name}"; `
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The employee has been deleted.')

        });
        setTimeout(init, 300);
    })
}
const deleteRole = () => {
    promptDeleteRole().then((data) => {
        const sql = `DELETE FROM role WHERE title = "${data.title}"; `
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The role has been deleted.')

        });
        setTimeout(init, 300);
    })
}
const deleteDepartment = () => {
    promptDeleteDepartment().then((data) => {
        const sql = `DELETE FROM department WHERE name = "${data.name}"; `
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The department has been deleted.')

        });
        setTimeout(init, 300);
    })
}
const updateEmployee = async () => {
    const data = await promptUpdateEmployee();
    switch (data.choices) {
        case 'name':
            return updateNameOfEmployee();
        case 'role_id':
            return updateRoleIdOfEmployee();
        case 'department_id':
            return updateDepartmentIdOfEmployee();
        case '[Quit]':
            return goodByeMsg();
        default: console.log('default');
    };
    ;
}

const updateNameOfEmployee = () => {
    promptUpdateNameOfEmployee().then((data) => {
        const sql = `UPDATE employee SET first_name = "${data.first_name}", last_name = "${data.last_name}" WHERE id = "${data.id}"; `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The employee name successfully updated')

        });
        setTimeout(init, 300);
    }
    )
}


const updateRoleIdOfEmployee = () => {
    promptUpdateRoleIdOfEmployee().then((data) => {
        const sql = `UPDATE employee SET role_id = "${data.new_role}" WHERE id = "${data.id}"; `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The role id has been successfully updated');

        });
        setTimeout(init, 300);
    }
    )
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
