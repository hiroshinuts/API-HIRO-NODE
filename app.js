var express 	= require('express'),
	mongoose 	= require('mongoose'),
	bodyParser 	= require('body-parser'),
	app 		= express(),
	Times 		= require('./models/times');

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
var router = express.Router();

router.get('/', function(req, res){
	res.json({message: 'Hiro API'});
});

router.route('/times')
	.get(function(req,res){
		Times.find(function(err, dados){
			if(err){
			res.send(err);
			}
			res.json(dados);
		})
	})
	.post(function(req,res){
		var times = new Times();
		times.nome = req.body.nome;
		times.save(function(err){
			if(err){
				res.send(err);
			}else{
				res.json({message: 'Time cadastrado com sucesso!'})
			}
		})
	});

router.route('/times/:id')
	.get(function(req,res){
		Times.findById(req.params.id, function(err, dados){
			if(err){
				res.send(err);
			}else{
			res.json(dados);
			}
		});
	})
	.put(function(req,res){
		Times.findById(req.params.id, function(err, dados){
			if(err){
				res.send(err);
			}
			dados.nome = req.body.nome;
			dados.save(function(err){
				if(err){
					res.send(err);
				}else{
				res.json({message: 'Time atualizado com sucesso!'});
				}
			
			})
		});
	})
	.delete(function(req,res){
		Times.remove({_id: req.params.id}, function(err, dados){
			if(err){
				res.send(err)
			}else{
			res.json({message: 'Time excluido com sucesso!'})
			}
		})
	})



app.use('/api', router);
app.use('/times', router);
app.use('/times/:id', router);

app.listen(port, function(){
	console.log('Servidor rodando na porta: '+ port)
});