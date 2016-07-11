var express 	= require('express'),
	mongoose 	= require('mongoose'),
	bodyParser 	= require('body-parser'),
	app 		= express();


app.use(bodyParser());

var port = process.env.PORT || 3000;

//Rotas
var route = express.Router();

route.get('/', function(req, res){
	res.json({message: 'Hiro API'});
});

app.use('/api', route);