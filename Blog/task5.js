var express = require('express');
var app  = express();
var path = require('path');
var qs   = require('querystring');
var fs   = require('fs');

app.use(express.static(path.join(__dirname,'')));
app.post('/login.html',function(req,res){
    var data = '';
    var files = path.join(__dirname,'data.json');

    fs.readFile(files,'utf-8',function(err,a){    
      var b = JSON.parse(a);
      console.log(b);
      console.log(b.users[0].password);
      req.on('data', (chunk) => { data += chunk; });
      req.on('end', () => {
        var account = qs.parse(data);
        if(account.password == b.users[0].password) {
          console.log('user: %s, password: %s', account.username, account.password);
          res.redirect('./list.html');
        } else {
          res.send('用户名，密码错误');
        }
      });
    })
    
});




app.listen(8085);