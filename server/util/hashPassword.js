const bcrypt= require("bcrypt")


module.exports={
    hashPassword:(passwordValue)=>{
        var hash = bcrypt.hashSync(passwordValue,10)
        return hash
    },
    comparePassword: (userSentPassword,dbRetrivedPassword)=>{
        let hash= bcrypt.compareSync(userSentPassword,dbRetrivedPassword)
        return  hash
    }


}

// use this to compare the users entered password to the hashedpw password
// bcrypt.compareSync(data,hashed password)

