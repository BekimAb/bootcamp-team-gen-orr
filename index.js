//spell const and variables correctly

const generateHTML=require('./src/generateHTML');

const Manager=require('./lib/manager');
const Engineer=require('./lib/engineer');
const Intern=require('./lib/intern');

const fs=require('fs');
const inquirer=require('inquirer');

const teamArray=[];

const addManager=()=>{
    return inquirer.prompt([{
        type:'input',
        name:'name',
        message:'Who is the team manager?',
        validate:nameInput =>{
            if(nameInput){
                return true;
            }else{
                console.log("Enter manager's name");
                return false;
            }
        }
    },
{
    type:'input',
    name:'id',
    message:"Enter manager's ID",
    validate:nameInput =>{
        if(isNaN(nameInput)){
            console.log("Enter manager's ID")
            return false;
        }else{
            return true;
        }
    }
},
{
    type:'input',
    name:'email',
    message:"enter manager's office number",
    validate:nameInput =>{
        if (isNaN(nameInput)){
            console.log('Enter an office number')
            return false;
        }else{
            return true;
        }
    }
}
])
    .then(managerInput =>{
        const{
            name,
            id,
            email,
            officeNumber
    }=managerInput;
    const manager=new Manager(name,id,email,officeNumber);
    teamArray.push(manager);
    console.log(manager);
})
};
const addEmployee=()=>{
    console.log('');
    return inquirer.prompt([{
        type:'list',
        name:'role',
        message:"Choose your employee's role",
        choices:['engineer','intern']
    },
    {
        type:'input',
        name:'name',
        message:"What is the name of the employee?",
        validate:nameInput =>{
            if(nameInput){
                return true;
            }else{
                console.log("enter employee's name");
                return false;
            }
        }
    },
    {
        type:'input',
        name:'id',
        message:"Please enter their ID",
        validate:nameInput =>{
            if(isNaN(nameInput)){
                console.log("Please enter their ID")
                return false;
            }else{
                return true;
            }
        }
    },
    {
        type:'input',
        name:'email',
        message:"Please enter their email",
        validate:email =>{
            valid= /^\w+([\.-]?\w+)([|.-]?|w+)*(\.\w{2,3})+$/.test(email)
            if(valid){
                return true;
            }else{
                console.log('Please enter an email')
                return false;
            }
        }
    },
    {
        type:'input',
        name:'github',
        message:"please enter the employee's github username",
        when:(input)=> input.role ==="engineer",
        validate:nameInput =>{
            if(nameInput){
                return true;
            }else{
                console.log("Please enter the employee's github username")
            }
        }
    },
    {
        type:'input',
        name:'school',
        message:"Please enter the intern's school",
        validate:nameInput =>{
            if (nameInput){
                return true;
            }else{
                cosnole.log("Please enter the intern's school")
            }
        }
    },
    {
        type:'input',
        name:'school',
        message:"Please enter the intern's school",
        when:(input)=> input.role ==="intern",
        validate:nameInput =>{
            if(nameInput){
                return true;
            }else{
                console.log("Please enter the school")
            }
        }
    },
    {
        type:'confirm',
        name:'confirmAddEmployee',
        message:'Would you like to add more team members',
        default:false
    }
])
.then(employeeData =>{
    let{
        name,
        id,
        email,
        role,
        github,
        school,
        confirmAddEmployee
    }= employeeData;
    let employee;
    if(role ==="Engineer"){
        employee= new Engineer(name,id,email,school);
        console.log(employee);
    }else if (role ==="Intern"){
        employee=new Intern(name,id,email,school);
        console.log(employee);
    }
    teamArray.push(employee);
    if (confirmAddEmployee){
        return addEmployee(teamArray);
    }else{
        return teamArray;
    }
})
};

const writeFile=data =>{
    fs.writeFile('./dist/index.html',data,err =>{
        if (err){
            console.log(err);
            return;
        }else{
            console.log("Team profile created go to index.html to see")
        }
    })
};

addManager()
    .then(addEmployee)
    .then(teamArray =>{
        return generateHTML(teamArray);
    })
    .then(pageHTML =>{
        return writeFile(teamArray);
    })
    .then(pageHTML =>{
        return writeFile(pageHTML);
    })
    .catch(err =>{
        console.log(err);
    });