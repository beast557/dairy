const Draft = require('../models/Draft');
const User = require('../models/User')
const Dairy = require('../models/Dairy')

exports.show_draft_dairy = async(req,res,next) =>{
    const {id} = req.user;
    try {
      let draft = await Draft.findAll({where:{
          userId:id,
      },
      attributes:['id'],
      include:[{ 
        model:User,
        attributes: ['id','username']
      },
    {
      model:Dairy,
      attributes:['id','content']
    }]
    })
      if(draft){
        res.status(202).send(draft)
      }else{
        res.status(400).send({ errors: [{ msg: "No events in draft currently" }]});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error'); 
    }
}