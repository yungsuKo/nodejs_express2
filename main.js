var express = require('express')
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression');
var indexRouter = require('./routes/index.js');
var topicRouter = require('./routes/topic.js');

app.use(helmet());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*',function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  })
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// route , routing >> 적당한 방향으로 길을 잡는 것



app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
