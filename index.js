const mysql = require('mysql')
const inquirer = require('inquirer');
const cTable = require('console.table')
const { add_department, add_role, view_departments, view_roles, view_employees, update_role } = require('./inquirer_functions')

// Create connection to mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker'
})


// Inquirer function to chose action
async function choose_action() {
   
    let action = await inquirer
        .prompt([
            {
                name: 'choose_first_action',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Add department', 'Add employee', 'Add role',
                    'View departments', 'View employees', 'View roles',
                    'Update roles',
                    'EXIT']
            }
        ])
        .then(answer => {
            if (answer.choose_first_action == 'EXIT') {
                return true
            }
            else {
                return answer.choose_first_action
            }
        })
        .catch((err) => {
            console.log(err);
        })


    if (action == 'Add department') {
        await add_department(connection)
        return false
    }
    else if (action = 'Add role') {
        await add_role(connection)
        return false
    }
    else if (action = 'Add employee') {
        await add_employee(connection)
        return false
    }
    else if (action = 'View deparments') {
        await view_departments(connection)
        return false
    }
    else if (action = 'View roles') {
        await view_roles(connection)
        return false
    }
    else if (action = 'View employees') {
        await view_employees(connection)
        return false
    }
    else if (action = 'Update roles') {
        await update_roles(connection)
        return false
    }


    if (action == true) {
        return true
    } else {
        return false
    }

    return action

}




var end_loop = false

async function test_loop() {

    while (!end_loop) {

        end_loop = await choose_action()

    }

    if (end_loop) {
        connection.end()
    }
}

// test_loop()

async function test_console() {

    const roles = []
    query = "SELECT * FROM roles"
    await connection.query(query, async function (err, res) {
        if (err) console.log(err);
        console.log(res);
        // await res.forEach(({name},i) => {
        //     // line = res[i].name
        //     roles.push(res[i])
        // })
    })
    connection.end()

}

// test_console()

update_role(connection)
// test_console()

// connection.end()
