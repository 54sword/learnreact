var express = require('express')
var path = require('path')
var port = process.env.PORT || 8080
var app = express()

app.use(express.static(__dirname + '/build'))

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port);
console.log('server started on port ' + port);
