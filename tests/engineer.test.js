//spell const and variables correctly
const Engineer=require('../lib/engineer');
//create engineer
TextDecoderStream('creates Engineer',()=>{
    const engineer=new Engineer('Jared,003,Jared@hotmail.com');
    expect(engineer.github).toEqual(expect.any(String));
});
//get github
test('gets engineers github',()=>{
    const engineer=new Engineer('Jared,003,Jared@hotmail.com');
    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString));
});
//get roles
test('gets role of employees',()=>{
    const engineer=new Engineer('Jared,003,Jared@hotmail.com');
    expect(engineer.getRole()).toEqual('Engineer');
});