const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');
const chalk = require('chalk');
const {
    validate,
    questions,
    viewChoices,
    addChoices,
    deleteChoices,
    updateChoices,
    addEmployeeChoices,
    addRoleChoices,
    addDepartmentChoices,
    deleteEmployeeChoices,
    deleteRoleChoices,
    deleteDepartmentChoices,
    updateEmployeeChoices,
    updateNameOfEmployeeChoices,
    updateRoleIdOfEmployeeChoices,
    updateManagerIdOfEmployeeChoices,
    updateRoleChoices,
    updateDepartmentChoices,
} = require('./utils/questions');


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


const getEmployeeByDepartment = () => {
    const sql = `SELECT * FROM department`
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        console.log(rows);
        printTable(rows);
        inquirer.prompt([{
            type: 'list',
            name: 'department',
            message: 'Select department',
            choices: rows.map((row) => {
                return {
                    name: row.name,
                    value: row.id
                }
            }),
            validate: validate.input
        }]).then((data) => {
            const sql = `
                SELECT department.id AS ID,  department.name AS Department, employee.id AS employee_id,
                CONCAT(employee.first_name, " ", employee.last_name) AS Employee, role.title AS Title, role.salary AS Salary,
                CONCAT(manager.first_name, " ", manager.last_name) AS Manager
                FROM employee
                LEFT JOIN role ON employee.role_id =role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id
                WHERE department.id = ${data.department};
                `;
            db.query(sql, (err, rows) => {
                if (err) {
                    return console.error('Something went wrong', err);
                }
                printTable(rows);
                init();
            });
        })

    })



};

const getEmployeeByManager = () => {
    const sql = `SELECT employee.manager_id AS ID, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee employee 
  	LEFT JOIN employee manager
	ON manager.id = employee.manager_id
    WHERE manager.id IS NOT NULL
    GROUP BY employee.manager_id;`
    db.query(sql, (err, rows) => {
        printTable(rows);

        if (err) {
            return console.error('Something went wrong', err);
        }
        inquirer.prompt([{

            type: "list",
            name: "manager",
            message: "Select manager",
            choices: rows.map((row) => {
                return {
                    name: row.manager,
                    value: row.ID,
                }
            }),
            validate: validate.input

        }]).then((results) => {
            console.log(results);
            const sql = `
            SELECT employee.id AS ID,
        CONCAT(employee.first_name, " ", employee.last_name) AS Name,
            role.title AS Title,
                department.name AS Department,
                    role.salary AS Salary,
                        CONCAT(manager.first_name, " ", manager.last_name) AS Manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            WHERE employee.manager_id = ${results.manager}; `;
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

const getBudget = () => {
    const sql = `SELECT * FROM department`
    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        console.log(rows);
        printTable(rows);
        inquirer.prompt([{
            type: 'list',
            name: 'department',
            message: 'Select department',
            choices: rows.map((row) => {
                return {
                    name: row.name,
                    value: row.id
                }
            }),
            validate: validate.input
        }]).then((results) => {
            const sql = `
            SELECT department.id AS department_id, department.name AS department, 
            SUM(role.salary) AS total_budget
            FROM employee
            LEFT JOIN role ON employee.role_id =role.id
            LEFT JOIN department ON role.department_id = department.id
            GROUP BY department_id, department.name
            HAVING department_id = ${results.department};
                `;
            db.query(sql, (err, rows) => {
                if (err) {
                    return console.error('Something went wrong', err);
                }
                printTable(rows);
                init();

            });
        })

    })
};