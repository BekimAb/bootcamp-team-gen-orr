//spell const and variables correctly
const generateHTML=require("./src/generateHTML");
const fs=require("fs");
const inquirer=require("inquirer");
const path=require("path");
const express=require('express');
const node=require('node');
const axios=require('axios');
const fileDirectory=path.resolve(__dirname,"dist");
const filePath=path.join(fileDirectory,"index.html");
const utils=require("util");
//profiles
const Intern=require("./lib/intern");
const Manager=require("./lib/manager");
const Engineer=require("./lib/engineer");

const teamArray=[];
let employeesArray=[];

//questions for employee
const questions=[{
    type:"input",
    name:"name",
    messsage:"What is your name?"
},
{
    type:"input",
    name:"ID",
    message:"What is your ID?"
},
{
    type:"input",
    name:"email",
    message:"What is your email?"
},
{
    type:"list",
    name:"role",
    message:"What role do you have?",
    choices:["engineer","intern","manager"]
}
]

//manager questions
managerQustions=[{
    type:"input",
    name:"officeNumber",
    message:"What is your office number?(required)",
    validate:officeNumber =>{
        if(officeNumber){
            return true;
        }else{
            console.log("Please enter an office number");
            return false;
        }
    }
}]

//engineer roles
engineerQuestions=[{
    type:"input",
    name:"github",
    message:"What is your github username?(required)",
    validate:github =>{
        if(github){
            if(github){
                return true;
            }else{
                console.log("Please enter a github username");
                return false;
            }
        }
    }
}]

//intern roles
internQuestions=[{
    type:"input",
    name:"school",
    message:"What school are you from?(required)",
    validate:school =>{
        if(school){
            return true;
        }else{
            console.log("Please enter school name");
            return false;
        }
    }
}]

const init=()=>{
    if (fs.existsSync(filePath)){
        inquirer.prompt({
            type:"confirm",
            message:"The index.html file in 'dist' folder already exists. Please move current html file to a new folder before restart",
            name:"overwrite"
        }).then(async(response)=>{
            let overwrite=response.overwrite;
            if(await overwrite ===true){
                console.log("Please enter your team info:")
                newEmployee()
            }else if (await overwrite ===false){
                console.log("The index.html file in 'dist' folder already exists. Please move current html file to a new folder before restart",)
            }
        })
    }else{
        console.log("Welcome, please enter your team info:")
        newEmployee()
    }
};

//create new employees
const newEmployee=async()=>{
    await inquirer.prompt(questions)
    .then((response) =>{
        let name=response.name;
        let id=response.id;
        let email=response.email;
        let role=response.role;
        let officeNumber;
        let github;
        let school;
        
        if(role==="engineer"){
            inquirer.prompt(engineerQuestions).then((response)=>{
                github=response.github;
                let employee=new Engineer(name,id,email,github);
                employeesArray.push(employee);
                    addEmployee(employeesArray);
            });
        }else if (role==="manager"){
            inquirer.prompt(managerQustions).then((response)=>{
                officeNumber=response.officeNumber;
                let employee=new Manager(name,id,email,officeNumber);
                employeesArray.push(employee);
                addEmployee(employeesArray);
            });
        }else if (role==="intern"){
            inquirer.prompt(managerQustions).then((response)=>{
                officeNumber=response.officeNumber;
                let employee=new Intern(name,id,email,school);
                employeesArray(employee);
                addEmployee(employeesArray);
        });
    }
    });
};

const addEmployee=async(array)=>{
    await inquirer
    .prompt({
        type:"confirm",
        name:"addEmployee",
        messsage:"Would you like to add an employee?(required)"
    }).then(async(response) =>{
        var createEmpolyee=response.addEmployee;
        if(await createEmpolyee===true){
            newEmployee();
        }else if (await createEmpolyee===false){
            if (!fs.existsSync(fileDirectory)){
                fs.mkdirSync(fileDirectory)
            }
            fs.writeFile(filePath,renderHTML(array),(err)=>{
                if (err){
                    return console.log(err);
                }
                console.log("Your html file has been created in the 'dist' folder");
            });
        }
    })
};
init();

function createNewEmployee(body,createNewEmployeeArray){
    const createNewEmployee=body;
    createNewEmployeeArray.push(createNewEmployee);
    fs.writeFileSync(
        path.join(__dirname, './data/employee.json'),
        JSON.stringify({
            employee:createNewEmployeeArray
        },null,2)
    );
    return employee;
}