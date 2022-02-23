

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


module.exports = {
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

}