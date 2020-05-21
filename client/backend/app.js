const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require("./routes/posts");

const url = 'mongodb://127.0.0.1:27017/node-angular';
mongoose.connect(url, { useNewUrlParser: true })
  .then(()=>{
    console.log('Connected')
  }).catch((err)=>{
    console.log('Failed to connect')
  })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use("/api/posts", router);

module.exports = app;
