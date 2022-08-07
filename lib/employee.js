//spell const and variables correctly
class employee{
    constructor(name,id,email){
        this.name=name;
        this.id=id;
        this,email=email;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }   
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Empolyee";
    }
}
module.exports=Employee