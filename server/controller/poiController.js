const prisma= require('../db/prisma')

module.exports = {
    creasePOI: async (req, res) => {
        try {
          let newPoi=req.body
      
          await prisma.user.create({
        data: newPoi
      })

  //     id          
  // latitude    
  // longitude   
  // state       
  // city        
  // zipcode    
  // title       
  // description 
  // ratings     
  // ratingAVG   
  // hashtags    
  // comments    
  // createdAt 
      res.status(200).json({Message:"Success a new POI was created",data:newPoi})
        } catch (error) {
            res.status(400).json({message: "error has data was not sent",error: error})
        }

    },

   getAllPOI: async (req, res) =>{

    try {

    const ret = await prisma.user.findMany()
    console.log({data:ret, message: "data"})

  
    res.status(200).json({message: "here is your data",data:ret})

    } catch (error) {

      res.status(400).json(error)
    }

   },
   getIndividualPOI: async (req, res) =>{
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: req.body.username
        },
      })
   const validatePassword= comparePassword(req.body.password,user.password)

   if(validatePassword){
    //change password so it doenst send user password to the frontend 
    user.password= "default"
     res.status(200).json({message: "Success",data:user})
   } 
   else {
    res.status(401).json({message:"invalid password or userid",Error: error})
   }
    } catch (error) {
      res.status(400).json({message:"invalide request",Error: error})
    }

   }
  
  
    
  }

