const bcrypt = require('bcrypt');
const saltRounds = 12;

export const hashPasswordHelper = async(plainPassword: string) =>{
  try{
    return await bcrypt.hash(plainPassword,saltRounds);
  }catch(e){
    console.log(e);
  }
}

export const comparePasswordHelper = async(plainPassword: string, hashPassword:string) =>{
  try{
    return await bcrypt.compare(plainPassword, hashPassword);
  }catch(e){
    console.log(e);
  }
}
