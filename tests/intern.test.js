//spell const and variables correctly
const Intern=require('../lib/intern');
//create intern
test=('creates Intern',()=>{
    const intern=new Intern('Jared,003,Jared@hotmail.com,UofU');
    expect(intern.school).toEqual(expect.any(String));
});
//gets school
test('gets employee school',()=>{
    const intern=new Intern('Jared,003,Jared@hotmail.com,UofU');
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString));
});
//gets role
test('gets role of employee',()=>{
    const intern=new Intern('Jared,003,Jared@hotmail.com,UofU');
    expect(intern.getRole()).toEqual("Intern");
});