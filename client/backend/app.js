const express = require("express");
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

// 38JNSsegEWDJXIdn

const url = 'mongodb://127.0.0.1:27017/node-angular';
mongoose.connect(url, { useNewUrlParser: true })
  .then(()=>{
    console.log('Connected')
  }).catch((err)=>{
    console.log('Failed to connect')
  })

const app = express();

app.use(bodyParser.json())
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.post('/api/post', (req, res, next) =>{
  console.log(req.body);
  const post = new Post({
    title: req.body.post.title,
    description: req.body.post.description
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Success',
      postId: result._id
    });
  })
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((documents)=>{
      res.status(200).json({
        message: "Success",
        posts: documents,
      });
    })
});

app.delete('/api/posts/:id', (req, res, next)=>{
  const id = req.params.id;
  console.log(id);
  Post.deleteOne({_id: id})
    .then((result)=>{
      console.log(result);
      res.status(200).json({message: 'Post Deleted'})
    })
});



module.exports = app;
