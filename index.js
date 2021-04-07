const mysql = require('mysql')
const inquirer = require('inquirer');
const cTable = require('console.table')
const { add_department, add_role, add_employees, view_departments, view_roles, view_employees, update_role, update_manager } = require('./inquirer_functions')

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
                    'Update roles', 'Update manager',
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
    else if (action == 'Add role') {
        await add_role(connection)
        return false
    }
    else if (action == 'Add employee') {
        await add_employees(connection)
        return false
    }
    else if (action == 'View deparments') {
        await view_departments(connection)
        return false
    }
    else if (action == 'View roles') {
        await view_roles(connection)
        return false
    }
    else if (action == 'View employees') {
        await view_employees(connection)
        return false
    }
    else if (action == 'Update roles') {
        await update_role(connection)
        return false
    }
    else if (action == 'Update manager') {
        await update_manager(connection)
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

test_loop()
// view_departments(connection)