const bcrypt= require("bcrypt")

const hashPassword=(passwordValue)=>{
    var hash = bcrypt.hashSync(passwordValue,10)
    return hash
}


// use this to compare the users entered password to the hashedpw password
// bcrypt.compareSync(data,hashed password)

module.exports = hashPassword