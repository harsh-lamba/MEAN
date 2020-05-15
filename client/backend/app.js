const express = require("express");

const app = express();
app
  .use((req, res, next) => {
    console.log("First middle ware");
    next();
  })
  .use((req, res) => {
    res.end("This is the end");
  });

module.exports = app;
