import fs from 'fs';
import cryptoRandomString from 'crypto-random-string';
import { validateUser } from './DAYAGVPA_exer2.js';

const saveUser = (firstName,lastName,email,age) => {
  if(validateUser({firstName: firstName,lastName: lastName,email: email,age: age})){
      let arr = [firstName,lastName,email,age,cryptoRandomString({length: 10, type: 'numeric'})];
      fs.appendFileSync("users.txt",arr.join(',')+"\n");
      return true;
    }
    return false;
}

const findUser = (firstName,lastName) => {
    let usersTXT = fs.readFileSync("users.txt", "utf8");
    let users = usersTXT.split("\n");
    let output = {}
    users.forEach(userString => {
        let userInfo = userString.split(",");
        if(userInfo[0] === firstName && userInfo[1] === lastName){
            output = {firstName: userInfo[0],lastName: userInfo[1],email: userInfo[4], age: userInfo[3],id: userInfo[4]};
            return;
        }
    });
    return output;
}

export {saveUser, findUser};