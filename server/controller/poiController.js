const prisma = require('../db/prisma');

module.exports = {

	createPOI: async (req, res) => {
    try {
			req.body.hashtags = req.body.hashtags.split(',');
			let newPoi = req.body;;
			await prisma.poi.create({
					data: newPoi
				})
			res.status(200).json({ message: 'Success, a new POI was created: ', data: newPoi });
		} catch (error) {
				res.status(400).json({ message: 'Error, POI was not created: ', error: error });
		}
  },

  getAllPOI: async (req, res) =>{
  	try {
			const result = await prisma.poi.findMany({
				where: {
					title: 'Folly Beach1'
				},
			}
			)
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ' , data: result });
		} catch (error) {
    	res.status(400).json({message: 'Error, POI was not created: ', error: error });
    }
  },

	searchPOI: async (req, res) =>{
  	try {
			//console.log('req.body:');
			//console.log(req.body);
			const title = req.body.title;
			console.log(title);
			const result = await prisma.poi.findUnique({
				where: {
					title: 'Folly Beach1',
				},
			})
			console.log('result: ');
			console.log(result);
			res.status(200).json({ message: 'Success, here is your data: ' , data: ret });
		} catch (error) {
			console.log('req:');
			console.log(req);
    	res.status(400).json({message: 'Error, POI was not created: ', error: error });
    }
  },

  getIndividualPOI: async (req, res) =>{
    try {
      const user = await prisma.poi.findUnique({
        where: {
          username: req.body.id
        }
      })
  
    res.status(401).json({message:"invalid password or userid",Error: error})
   
    } catch (error) {
      res.status(400).json({message:"invalide request",Error: error})
    }
   }
    
  }

