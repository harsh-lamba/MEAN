const express = require("express");

const app = express();

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS')
  next();
})

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "sasdh1213",
      title: "First",
      description: "First post to render",
    },
    {
      id: "sagsdgsd13",
      title: "Second",
      description: "Second post to render",
    },
  ];

  res.status(200).json({
    message: "Success",
    posts: posts,
  });
});

module.exports = app;
