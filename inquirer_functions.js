const inquirer = require("inquirer");

// Inquirer to add department
async function add_department(connection) {
    await inquirer
        .prompt([
            {
                name: 'get_department_name',
                type: 'input',
                message: 'What is the deparment name?'
            }
        ])
        .then((answer) => {
            query = `INSERT INTO department (department_title) VALUES ("${answer.get_department_name}");`
            connection.query(query, (err, res) => {
                if (err) throw err
                console.log(`Inserted ${answer.get_department_name} into department list`);
            })
        })
}

// Inquirer to add role
async function add_role(connection) {

    const roles = []
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err
        res.forEach(({name}, i) => {
            roles.push(name)
        });
    })

    await inquirer
        .prompt([
            {
                name: 'role_name',
                type: 'input',
                message: 'What is the role name?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Which deparment are they in?',
                choices: roles
            }
        ])
        .then(answer => {
            department_id = roles.indexOf(answer.department) + 1
            query = `INSERT INTO role (name, department_id) VALUES ("${answer.role_name}", "${department_id}");`
            connection.query(query, (err, res) => {
                if (err) throw err
            })
        })
        .catch(error => {
            console.log(error);
        })
}

// View Deparments
async function view_departments(connection) {
    query = "SELECT * FROM departments"
    await connection.query(query, (err, res) => {
        if (err) console.log(err);
        console.table(res)
    })
}

// View Roles
async function view_roles(connection) {
    query = "SELECT role.id, role.name, department.department_title FROM role INNER JOIN department ON role.department_id=department.id;"
    const test = await connection.query(query, (err, res) => {
        if (err) console.log(err);
        console.table(res)
    })
}

// View employees
async function view_employees(connection) {
    query = "SELECT employee.id, employee.first_name, employee.last_name, role.name FROM employee "
    query += " INNER JOIN role WHERE employee.role_id=role.id"
    const test = await connection.query(query, (err, res) => {
        if (err) console.log(err);
        console.table(res)
    })
}

async function update_role(connection) {

    // Query all employees and save to roles list
    const employee_list = []
    query = "SELECT * FROM employee"
    await connection.query(query, async function (err, res) {
        if (err) console.log(err);
        
        await res.forEach(({first_name, last_name},i) => {
            line = res[i].first_name + ' ' + res[i].last_name
            employee_list.push(line)
        })
    })

    const roles = []
    query = "SELECT * FROM role"
    await connection.query(query, async function (err, res) {
        if (err) console.log(err);
        
        await res.forEach(({name},i) => {
            // line = res[i].name
            roles.push(name)
        })
    })

    // Execute inquirer about 
    setTimeout(() => {
        inquirer
        .prompt([
            {
                name: 'chose_employee',
                type: 'list',
                message: 'Choose employee to update',
                choices: employee_list
            },
            {
                name: 'chose_role',
                type: 'list',
                message: 'Choose role to change to',
                choices: roles
            }
        ])
        .then(answer => {

        })
        
    }, 250);

    
}


module.exports = { add_department, add_role, view_departments, view_roles, view_employees, update_role }