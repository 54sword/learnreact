var express = require('express')
var path = require('path')
var port = process.env.PORT || 84
var app = express()

/*
app.all('*',function (req, res, next) {

  var deviceAgent = req.headers["user-agent"].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|android|windows phone|symbianos)/);

  if (agentID) {
    next();
  } else {
    res.redirect('http://www.cnseoul.com');
    res.end();
  }

});
*/

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/build'))

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port);
console.log('server started on port ' + port);
