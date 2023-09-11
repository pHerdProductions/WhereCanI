const prisma= require('../db/prisma')

module.exports = {
    creaseUser: async (req, res) => {
        try {
          let newUser=req.body
          await prisma.user.create({
        data: newUser
      })
    //   const users = await prisma.user.findMany()
    //   const names = users.map((user) => user.name)
      res.status(200).json({Message:"Success a new user was created",data:newUser})
        } catch (error) {
            res.status(400).json(error)
        }

    },

   testGetAll: async (req, res) =>{

    try {

    const ret = await prisma.user.findMany()
    console.log({data:ret, message: "data"})

  
    res.status(200).json({message: "here is your data",data:ret})

    } catch (error) {

      res.status(400).json(error)
    }

   }
  
  
    
  }

