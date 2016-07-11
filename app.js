var express 	= require('express'),
	mongoose 	= require('mongoose'),
	bodyParser 	= require('body-parser'),
	app 		= express();

//Conexao com o mongoDB
mongoose.connect('mongodb://localhost/api', function(err){
	if(err){
		console.log('Erro ao conectar no mongodb: ' + err);
	}else{
		console.log('Conexao com mongodb realizada com sucesso');
	}
});


app.use(bodyParser());

var port = process.env.PORT || 3000;

//Rotas
var route = express.Router();

route.get('/', function(req, res){
	res.json({message: 'Hiro API'});
});

app.use('/api', route);

app.listen(port, function(){
	console.log('Servidor rodando na porta: '+ port)
});