var express = require('express');
var app = express();

app.use(require('serve-static')(__dirname));

app.listen(5000, function(){
    console.log('App listening on port 5000');
});