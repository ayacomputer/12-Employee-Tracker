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

        init();
    });
});


const validate = {
    input: input => input !== '' ? true : "Please select a choice",
    name: input => input !== '' ? true : "Please enter a name.",
    id: input => Number.isInteger(Number(input)) && Number(input) > 0 ? true : "Please enter a positive number.",
}


const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initial',
        choices: ['View', 'Add', 'Update', 'Delete', '[Quit]'],
        validate: validate.input

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
        validate: validate.input
    }];

const addChoices = [
    {
        type: 'list',
        message: 'What would you like to add?',
        name: 'add',
        choices: ['Add Employee',
            'Add Department',
            'Add Role', '[Quit]'],
        validate: validate.input

    }

];

const deleteChoices = [
    {
        type: 'list',
        message: 'What would you like to delete?',
        name: 'delete',
        choices: ['Delete Employee',
            'Delete Department',
            'Delete Role', '[Quit]'],
        validate: validate.input

    }

];

const updateChoices = [
    {
        type: 'list',
        message: 'What would you like to update?',
        name: 'update',
        choices: [
            'Update Employee',
            'Update Department', ,
            'Update Role', '[Quit]'],
        validate: validate.input
    }

];

const addEmployeeChoices = [
    {
        type: 'input',
        message: `Enter the first name of new employee`,
        name: `first_name`,
        validate: validate.name
    },
    {
        type: 'input',
        message: `Enter the last name of new employee`,
        name: `last_name`,
        validate: validate.name
    },
    {
        type: 'input',
        message: `Enter the role id of new employee`,
        name: `role_id`,
        validate: validate.id
    },
    {
        type: 'input',
        message: `Enter the manager id of new employee`,
        name: `manager_id`,
        validate: validate.id
    }
]

const addRoleChoices = [
    {
        type: 'input',
        message: `Enter the title of the role`,
        name: `title`,
        validate: validate.name
    },
    {
        type: 'input',
        message: `Enter the salary of the role`,
        name: `salary`,
        validate: validate.id
    },
    {
        type: 'input',
        message: `Enter the department_id`,
        name: `department_id`,
        validate: validate.id
    }
]


const addDepartmentChoices = [
    {
        type: 'input',
        message: `Enter a name of the new department`,
        name: `name`,
        validate: validate.name
    }
]

const deleteEmployeeChoices = [
    {
        type: "input",
        message: "Enter the first name of the employee you wish to delete:",
        name: "first_name",
        validate: validate.name
    },
    {
        type: "input",
        message: "Enter the last name of the employee you wish to delete:",
        name: "last_name",
        validate: validate.name
    }
]

const deleteRoleChoices = [
    {
        type: "input",
        message: "Enter the title name of the role you wish to delete:",
        name: "title",
        validate: validate.name
    }
]

const deleteDepartmentChoices = [
    {
        type: "input",
        message: "Enter the name of the department you wish to delete:",
        name: "name",
        validate: validate.name
    }
]


const updateEmployeeChoices = [
    {
        type: "list",
        message: "What would you like to update?",
        name: "choices",
        choices: ["name", "role_id", "manager_id"],
        validate: validate.input
    }

]

const updateNameOfEmployeeChoices = [
    {
        type: "input",
        message: "Enter the employee id of the employee you wish to update:",
        name: "id",
        validate: validate.id
    },
    {
        type: "input",
        message: "Update the first name:",
        name: "first_name",
        validate: validate.name
    },
    {
        type: "input",
        message: "Update the last name:",
        name: "last_name",
        validate: validate.name
    }
]

const updateRoleIdOfEmployeeChoices = [
    {
        type: "input",
        message: "Enter the employee id of the employee you wish to update:",
        name: "id",
        validate: validate.id
    },
    {
        type: "input",
        message: "Enter the new role id of the employee you wish to update:",
        name: "new_role",
        validate: validate.id
    }
]
const updateManagerIdOfEmployeeChoices = [
    {
        type: "input",
        message: "Enter the employee id of the employee you wish to update:",
        name: "id",
        validate: validate.id
    },
    {
        type: "input",
        message: "Enter the new manager id of the employee you wish to update:",
        name: "new_manager",
        validate: validate.id
    }
]

const updateRoleChoices = [
    {
        type: "input",
        message: "Enter the role title you wish to update:",
        name: "title",
        validate: validate.name
    },
    {
        type: "input",
        message: "Enter new title for the role:",
        name: "new_title",
        validate: validate.name
    }
]

const updateDepartmentChoices = [
    {
        type: "input",
        message: "Enter the department id you wish to update:",
        name: "id",
        validate: validate.id
    },
    {
        type: "input",
        message: "Enter new name for the department:",
        name: "name",
        validate: validate.name
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
const promptUpdateManagerIdOfEmployee = () => inquirer.prompt(updateManagerIdOfEmployeeChoices);
const promptUpdateDepartment = () => inquirer.prompt(updateDepartmentChoices);
const promptUpdateRole = () => inquirer.prompt(updateRoleChoices);



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
        switch (data.view) {
            case 'all':
                return viewAllInfo();
            case 'employee':
                return getAll(data.view);
            case 'department':
                return getAll(data.view);
            case 'role':
                return getAll(data.view);
            case 'employeeByManager':
                return getEmployeeByManager();
            case 'employeeByDepartment':
                return getEmployeeByDepartment();
            case 'budget':
                return getBudget();
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
            case 'Update Department':
                return updateDepartment(data.update);
            case 'Update Role':
                return updateRole(data.update);
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
        init();
    });
}
const viewAllInfo = () => {
    const sql = `
    SELECT employee.id AS ID, 
    CONCAT (employee.first_name, " ", employee.last_name) AS Name,
    role.title AS Title, 
    department.name AS Department,
    role.salary AS Salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        printTable(rows);
        init();
    });

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
            init();
        });

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
            init();
        });

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
            init();
        });

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
            init();
        });
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
            init();
        });
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
            init();
        });
    })
}
const updateEmployee = async () => {
    const data = await promptUpdateEmployee();
    switch (data.choices) {
        case 'name':
            return updateNameOfEmployee();
        case 'role_id':
            return updateRoleIdOfEmployee();
        case 'manager_id':
            return updateManagerIdOfEmployee();
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
            init();
        });
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
            init();
        });

    }
    )
}
const updateManagerIdOfEmployee = () => {
    promptUpdateManagerIdOfEmployee().then((data) => {
        const sql = `UPDATE employee SET manager_id = "${data.new_manager}" WHERE id = "${data.id}"; `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The manager id has been successfully updated');
            init();

        });

    }
    )
}
const updateDepartment = () => {
    promptUpdateDepartment().then((data) => {
        const sql = `UPDATE department SET name = "${data.name}" WHERE id = "${data.id}"; `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The department name has been successfully updated');
            init();

        });
    }
    )
};

const updateRole = () => {
    promptUpdateRole().then((data) => {
        const sql = `UPDATE role SET title = "${data.new_title}" WHERE id = "${data.title}"; `;
        db.query(sql, (err, rows) => {
            if (err) {
                return console.error('Something went wrong', err);
            }
            console.log('The role title has been successfully updated');
            init();

        });
    }
    )
};


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

const getEmployeeByManager = () => {
    console.log("function is called")
    const sql = `SELECT * FROM employee WHERE manager_id IS NOT NULL;`;
    db.query(sql, (err, rows) => {
        console.log(rows);
        inquirer.prompt([{

            type: "list",
            name: "manager",
            message: "Select manager",
            choices: rows.map((row) => {
                return {
                    name: `${row.first_name} ${row.last_name}`,
                    value: row.manager_id,
                }
            }),
            validate: validate.input

        }]).then((results) => {
            console.log(results);
            const sql = `
            SELECT employee.id AS ID, 
            CONCAT (employee.first_name, " ", employee.last_name) AS Name,
            role.title AS Title, 
            department.name AS Department,
            role.salary AS Salary, 
            CONCAT (manager.first_name, " ", manager.last_name) AS Manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            WHERE employee.manager_id = ${results.manager};`;
            db.query(sql, (err, rows) => {
                if (err) {
                    return console.error('Something went wrong', err);
                }
                printTable(rows);
                init();
            });

        })
    });

};

// const getBudget = () => {
//     const sql = `SELECT department_id as ID, name as Department, SUM(salary) AS Total Budget FROM role JOIN department ON role.department_id = department.id GROUP BY department_id;`
//     db.query(sql, (err, rows) => {
//         if (err) {
//             return console.error('Something went wrong', err);
//         }
//         printTable(rows);
//     });
//     setTimeout(init, 300);
// };