const Dairy = require('../models/Dairy');
const Draft = require('../models/Draft');
const {validationResult } = require('express-validator');

exports.save_dairy = async (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    const {content} = req.body
    const {id} = req.user
    try {
        dairy = await Dairy.create({
            content
          });
          await Draft.create({
            dairyId:dairy.id,
            userId:id
          })
        res.json(dairy);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

exports.update_dairy = async (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {dairy_id} = req.body;
  const {id} = req.user;
  try {
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
}

exports.delete_dairy = async(req,res,next) =>{
  const {id} = req.user;
  const {dairyId} = req.params  
  try {
    let dairy = await Dairy.destroy({where:{
        id:dairyId,
        user_id:id
    }})
    if(dairy){

      res.status(202).send({ msg: [{ msg: "This event from your Dairy is removed" }]})
    }else{
      res.status(400).send({ errors: [{ msg: "An error occured while deleting this event" }]});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
}