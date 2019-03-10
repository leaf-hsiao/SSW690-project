var express = require('express');
var bodyParser = require('body-parser');
var path =require('path');
var app = express();
var mongojs= require('mongojs');
var db= mongojs('linkapp',['linkget'])
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', function(req,res){
	res.render('index', {
			title:'calender link'
		});
	});

app.post('/calender',function(req,res){
	var c_link= {linkname:req.body.calenderlink}
	console.log(c_link);
	db.linkget.insert(c_link,function(err,result){
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});
});

app.listen(3000,function(){
	console.log('Server Started on Port 3000……');
})