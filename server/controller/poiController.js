const prisma= require('../db/prisma')

module.exports = {
    createPOI: async (req, res) => {
        try {
          let hashtag = req.body.hashtags.split(",")
          req.body.hashtags=hashtag
          let newPoi=req.body

          await prisma.poi.create({
            data: newPoi
          })
      res.status(200).json({Message:"Success a new POI was created",data:newPoi})
        } catch (error) {
            res.status(400).json({message: "error has data was not sent poi",error: error})
        }
    },

   getAllPOI: async (req, res) =>{
    try {

    const ret = await prisma.poi.findMany()

    res.status(200).json({message: "here is your data",data:ret})

    } catch (error) {
      res.status(400).json(error)
    }

   },
   getIndividualPOI: async (req, res) =>{
    try {
      const poi = await prisma.poi.findMany({
        where: {
          title: req.query.title
        }
      })
	  console.log(poi)
  
    res.status(401).json({message:"success",data:poi})
   
    } catch (error) {
      res.status(400).json({message:"invalide request",Error: error})
    }
   }
    
  }

