const express = require('express');
const app = express();

const sequelize = require('./config/database');
require('dotenv').config()

const userRoute = require('./routes/v1/auth');
const dairyRoute = require('./routes/v1/dairy')
//middlewares
app.use(express.json({ extended: false }));
app.use('/api/v1/user', userRoute);
app.use('/api/v1/dairy',dairyRoute)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const PORT = process.env.PORT || 6000;

//database
const User  = require('./models/User')
const Dairy = require('./models/Dairy')
const Draft = require('./models/Draft')
const Publish = require('./models/Publish')
const Bookmark = require('./models/Bookmark')

// user and draft
User.hasMany(Draft,{
    constraints:true,
    onDelete:'CASCADE'
  })
Draft.belongsTo(User);

User.hasMany(Publish,{
  constraints:true,
  onDelete:'CASCADE'
})
Publish.belongsTo(User);

User.hasMany(Bookmark,{
  constraints:true,
  onDelete:'CASCADE'
})
Bookmark.belongsTo(User);

//dairy and draft
Dairy.hasOne(Draft,{
    constraints:true,
    onDelete:'CASCADE'
  })
Draft.belongsTo(Dairy);

//dairy and publish
Dairy.hasOne(Publish,{
  constraints:true,
  onDelete:'CASCADE'
})
Publish.belongsTo(Dairy);

//dairy and bookmark
Dairy.hasOne(Bookmark,{
  constraints:true,
  onDelete:'CASCADE'
})
Bookmark.belongsTo(Dairy);

//user and bookmark
User.hasOne(Bookmark,{
  constraints:true,
  onDelete:'CASCADE'
})
Bookmark.belongsTo(User);


sequelize
  .sync({
  })
  .then(result => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));    
  })
  .catch(err => {
    console.log(err);
  });