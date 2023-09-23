const prisma= require('../db/prisma')

module.exports = {
    createPost: async (req, res) => {
        try {
          let newPost=req.body
          await prisma.post.create({
        data: newPost
      })
      res.status(200).json({Message:"Success a new POI was created",data:newPost})
        } catch (error) {
            res.status(400).json({message: "error has data was not sent poi",error: error})
        }
    },
   getAllPost: async (req, res) =>{
    try {

    const ret = await prisma.post.findMany()
    console.log({data:ret, message: "data"})

    res.status(200).json({message: "here is your data",data:ret})

    } catch (error) {
      res.status(400).json(error)
    }

   },
   getIndividualPOI: async (req, res) =>{
    try {
      const user = await prisma.post.findUnique({
        where: {
          username: req.body.id
        },
      })
    res.status(401).json({message:"invalid password or userid",Error: error})
   
    } catch (error) {
      res.status(400).json({message:"invalide request",Error: error})
    }
   }
    
  }

