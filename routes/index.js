var express = require('express');
var router = express.Router();
var fs = require('fs');
var template = require('../lib/template.js');


router.get('/', function(request, response){
    fs.readdir('./data', function(error, filelist){
      var title = 'Welcome';
      var description = 'Hello, Node.js';
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <h2>${title}</h2>${description}
        <img src = "images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
        `,
        `<a href="/create">create</a>`
      );
      response.send(html);
    });
  })

  module.exports = router