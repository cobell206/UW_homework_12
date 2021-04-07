const inquirer = require("inquirer");
const cTable = require('console.table')

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
            query = `INSERT INTO roles (name, department_id) VALUES ("${answer.role_name}", "${department_id}");`
            connection.query(query, (err, res) => {
                if (err) throw err
            })
        })
        .catch(error => {
            console.log(error);
        })
}

// Inquirer to add employee
async function add_employees(connection) {

    const roles = []
    const managers = []
    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err
        res.forEach(({role_name}, i) => {
            roles.push(role_name)
        });
    })
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err
        res.forEach(({first_name, last_name}, i) => {
            line = res[i].first_name + ' ' + res[i].last_name
            managers.push(line)
        });
    })

    await inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is their first name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is their last name?',
            },
            {
                name: 'role',
                type: 'list',
                message: 'Which role are they in?',
                choices: roles
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Who is their manager?',
                choices: managers
            }
        ])
        .then(answer => {
            role_id = roles.indexOf(answer.role) + 1
            manager_id = managers.indexOf(answer.manager) + 1
            query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.first_name}","${answer.last_name}","${role_id}", "${manager_id}");`
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
    query = "SELECT * FROM department;"
    const test = await connection.query(query, (err, res) => {
        if (err) console.log(err);
        console.table(res)
    })
}

// View Roles
async function view_roles(connection) {
    query = "SELECT roles.id, roles.role_name, department.department_title FROM roles INNER JOIN department ON roles.department_id=department.id;"
    const test = await connection.query(query, (err, res) => {
        if (err) console.log(err);
        console.table(res)
    })
}

// View employees
async function view_employees(connection) {
    query = "SELECT employee.id, employee.first_name, employee.last_name, roles.role_name FROM employee "
    query += " INNER JOIN roles WHERE employee.role_id=roles.id"
    const test = await connection.query(query, (err, res) => {
        if (err) console.log(err);
        console.table(res)
    })
}


// Update a role
async function update_role(connection) {

    // Query all employees and save to roles list
    const employee_list = []
    query = "SELECT * FROM employee;"
    await connection.query(query, async function (err, res) {
        if (err) console.log(err);
        
        await res.forEach(({first_name, last_name},i) => {
            line = res[i].first_name + ' ' + res[i].last_name
            employee_list.push(line)
        })
    })

    const roles = []
    query = "SELECT * FROM roles;"
    await connection.query(query, async function (err, res) {
        if (err) console.log(err);
        
        await res.forEach(({name},i) => {
            roles.push(res[i].role_name)
        })
    })

    // Execute inquirer about updating role
    setTimeout(() => {
        inquirer
        .prompt([
            {
                name: 'chose_employee',
                type: 'list',
                message: 'Choose employee to update their role',
                choices: employee_list
            },
            {
                name: 'chose_role',
                type: 'list',
                message: 'Choose their new role',
                choices: roles
            }
        ])
        .then(answer => {
            employee_ = employee_list.indexOf(answer.chose_employee) + 1
            role_ = roles.indexOf(answer.chose_role) + 1
            query = `UPDATE employee SET role_id=${role_} WHERE id=${employee_}`
            connection.query(query, async function (err, res) {
                if (err) console.log(err)
            })

        })
        
    }, 250);

    
}

// Update a manager
async function update_manager(connection) {

    // Query all employees and save to roles list
    const employee_list = []
    query = "SELECT * FROM employee;"
    await connection.query(query, async function (err, res) {
        if (err) console.log(err);
        
        await res.forEach(({first_name, last_name},i) => {
            line = res[i].first_name + ' ' + res[i].last_name
            employee_list.push(line)
        })
    })

    // Execute inquirer about updating role
    setTimeout(() => {
        inquirer
        .prompt([
            {
                name: 'chose_employee',
                type: 'list',
                message: 'Choose employee to update their manager',
                choices: employee_list
            },
            {
                name: 'chose_manager',
                type: 'list',
                message: 'Choose their new manager',
                choices: employee_list
            }
        ])
        .then(answer => {
            employee_ = employee_list.indexOf(answer.chose_employee) + 1
            manager_ = employee_list.indexOf(answer.chose_manager) + 1
            query = `UPDATE employee SET manager_id=${manager_} WHERE id=${employee_}`
            connection.query(query, async function (err, res) {
                if (err) console.log(err)
            })

        })
        
    }, 250);

    
}



module.exports = { add_department, add_role, add_employees, view_departments, view_roles, view_employees, update_role, update_manager }