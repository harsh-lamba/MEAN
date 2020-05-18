const express = require("express");
const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) =>{
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

router.get("", (req, res, next) => {
  Post.find()
    .then((documents)=>{
      res.status(200).json({
        message: "Success",
        posts: documents,
      });
    })
});

router.get("/:id", (req, res,next) =>{
  Post.findById(req.params.id).then(result => {
    res.status(200).json({post: result});
  })
})

router.put("/:id", (req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });
  console.log();

  Post.updateOne({_id: req.params.id}, post).then((result)=>{
    console.log(result);
    res.status(200).json({
      message: "SuccessFully updated"
    })
  })
})

router.delete('/:id', (req, res, next)=>{
  const id = req.params.id;
  console.log(id);
  Post.deleteOne({_id: id})
    .then((result)=>{
      console.log(result);
      res.status(200).json({message: 'Post Deleted'})
    })
});

module.exports = router;
