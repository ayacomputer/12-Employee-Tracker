const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
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
        choices: ['View All Employees', 'A', 'B', 'C'],
    },
];





const promptUser = () => inquirer.prompt(questions);

promptUser().then((data) => {
    console.log(data.initial);
    switch (data.initial) {
        case 'View All Employees':
            return getAllEmployees();
        case 'A':
            return console.log('A is chosen')
        default: console.log('default')
    }

}
)


getAllEmployees = () => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            return console.error('Something went wrong', err);
        }
        console.table(rows);
    });


};
