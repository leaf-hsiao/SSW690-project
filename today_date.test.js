//import router from './today_date.js'
//import User from './today_date.js'
const router = require('./today_date')
jest.mock(router.get())
//User.monlIMplementation(findById=()=>jest.fn('students ics file'));
const icsreturn=router.get();
icsreturn.monlIMplementation('students ics file');

//const user:()=>{findById()=jest.fn('students ics file');};
//jest.mock(User);
//const User={
//    findById:()=>jest.fn('students ics file')
//}
//User.monlIMplementation(findById=()=>jest.fn('students ics file'));

test('',()=>{
    expect(icsreturn).toEqual('students ics file')
    });