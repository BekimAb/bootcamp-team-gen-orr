//spell const and variables correctly
const Employee=require("../lib/employee");

//create employee
test('creates and employee',()=>{
    const employee= new Employee('Jared,003,Jared@hotmail.com');
    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});
//get id
test('gets employee name',()=>{
    const employee=new Employee('Jared,003,Jared@hotmail.com');
    expect(employee.getId()).toEqual(expect.any(Number));
});
//get email
test('gets employee email',()=>{
    const employee=new Employee('Jared,003,Jared@hotmail.com');
    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString));
});
//get role
test('gets role of employee',()=>{
    const employee=new Employee('Jared,003Jared@hotmail.com');
    expect(employee.getRole()).toEqual('Employee');
});