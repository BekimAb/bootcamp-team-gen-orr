//spell const and variables correctly
const Employee=require("./employee");
class Manager extends Employee{
    constructor(name,id,email,officeNumber){
        super(name,id,email);
        this.officeNumber=officeNumber;
    }
    getRole(){
        return "Manger";
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
module.exports=Manager;