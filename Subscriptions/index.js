const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


const movieController = require('./movies/controller/movieController')
const memberController = require('./members/controller/memberController')
const subscriptionController = require('./subscription/controller/subscriptionController')

const membersWS = require('./members/membersWS')
const moviesWS = require('./movies/moviesWS')


require("./configs/subscriptionDB")

app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())
app.use('/movies',movieController)
app.use('/members',memberController)
app.use('/subscriptions',subscriptionController)

const memberSchema = require("./members/models/membersSchema");
const movieSchema = require("./movies/models/movieSchema");
const subscriptionsSchema = require("./subscription/models/subscriptionSchema"); // ???


const reStartMemberData = () => {
  return new Promise((resolve, reject) => {
    memberSchema.deleteMany((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Members has been Deleted !");
      }
    });
  });
};

reStartMemberData()
membersWS.getDataToDB()


const reStartMovieData = () => {
  return new Promise((resolve, reject) => {
    movieSchema.deleteMany((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Movies has been Deleted !");
      }
    });
  });
};

reStartMovieData()
moviesWS.getDataToDB()


app.listen(3000,()=>{
    console.log("The server is up");
})