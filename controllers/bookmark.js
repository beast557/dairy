const Bookmark = require("../models/Bookmark");
const Dairy = require("../models/Dairy");

const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.bookmark_dairy = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { id } = req.user;
    const { dairyId } = req.params;

    const alreadyBookmarkedSameDairy = await Bookmark.findOne({
      where: {
        userId: id,
        dairyId,
      },
    });
    if (alreadyBookmarkedSameDairy) {
      console.log("deleting");
      //already bookmarked same dairy so deleting
      await Bookmark.destroy({
        where: {
          userId: id,
          dairyId,
        },
      });
      return res.status(200).send({ msg: [{ msg: "Success" }] });
    }
    const alreadyHaveBookmark = await Bookmark.findOne({
      where: {
        userId: id,
      },
    });
    if (!alreadyHaveBookmark) {
      //No booked by this user so creating new
      console.log("creating");
      await Bookmark.create({
        dairyId,
        userId: id,
      });

      return res.status(200).send({ msg: [{ msg: "Success" }] });
    } else {
      //different bookmark from the user so updating it
      console.log("updating");
      await Bookmark.update(
        {
          dairyId,
          userId: id,
        },
        {
          where: {
            userId: id,
          },
        }
      );
      return res.status(200).send({ msg: [{ msg: "Success" }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.show_bookmark_dairy = async (req, res, next) => { 
  try {
    const { id } = req.user;
    const bookmark = await Bookmark.findOne({
      where: {
        userId: id
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
    });
    return res.status(200).send(bookmark);
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}