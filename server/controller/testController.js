
const prisma= require('../db/prisma')

module.exports = {
    testadduser: async (req, res) => {
        try {
          let newUser=req.body
          console.log(newUser)
          await prisma.user.create({
        data: newUser
      })
      
      const users = await prisma.user.findMany()
      const names = users.map((user) => user.name)
      res.status(200).json(names)
        } catch (error) {
            res.status(400).json(error)
        }

    },

   testGetAll: async (req, res) =>{

    try {

    const ret = await prisma.user.findMany()
    console.log({data:ret, message: "data"})

  
      res.status(200).json({data:ret, message: "data"})

    } catch (error) {

      res.status(400).json(error)
    }

   }
  
  
    
  }

