//spell const and variables correctly
const Manager=require('../lib/manager');
//create manager
test('creates Manager',()=>{
    const manager=new Manager('Jared,003,Jared@hotmail.com,3');
    expect(manager.officeNumber).toEqual(expect.any(Number));
});
//get role
test('gets roles of employee',()=>{
    const manager=new Manager('Jared,003,Jared@hotmail.com,3');
    expect(manager.getRole()).toEqual("Manager");
});