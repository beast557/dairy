const Publish = require("../models/Publish");
const Draft = require('../models/Draft')
const User = require('../models/User')
const Dairy = require('../models/Dairy')

const {validationResult } = require('express-validator');

exports.publish_dairy = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
      try {
          const {id} = req.user;
          const {dairyId} = req.params;
          const alreadyPublished = await Publish.findOne({
              where:{
                  userId:id,
                  dairyId
              } 
          })
          if(alreadyPublished){
            return res.json({ errors: [{ msg: 'Dairy is already Published' }] });
        }
          const publish = await Publish.create({
              userId:id,
              dairyId
            });
            if(publish){
                await Draft.destroy({
                    where:{
                        dairyId:dairyId,
                        userId:id
                    }
                  })
                return res.status(200).send({msg:[{msg:"Dairy Published successfully"}]})
            }else{
                return res.status(400).json({ errors: [{ msg: 'There was problem publishing this content' }] });
            }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  exports.show_published_dairy = async (req,res,next) =>{
    try {
      const {id} = req.user
      const dairy = await Publish.findAll({
        where:{
          userId:id
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
      if(dairy.length){
        return res.status(200).send(dairy)
      }else{
        return res.status(400).json({ errors: [{ msg: 'There is no published event' }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }