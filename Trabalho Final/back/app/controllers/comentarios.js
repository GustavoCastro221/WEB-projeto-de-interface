const Comentarios = require("../models/comentario");
const viewComentario = require("../views/comentarios");
const jwt = require("jsonwebtoken");

module.exports.listarComentarios = function(req, res){
    let promisse = Comentarios.find().exec();

    promisse.then(function(comentarios){
        res.json(viewComentario.renderMany(comentarios));
    }).catch(function(error){
        console.log(error);
    });
}

module.exports.listarComentarioId = function(req, res){
    let id = req.params.id;
    console.log("no back "+id);
    let promisse = Comentarios.findById(id);
    promisse.then(function(comentario){
        res.json(viewComentario.render(comentario));
    }).catch(function(error){
        console.log(error);
    })
}



module.exports.inserirComentario = function(req, res){
    let token = req.headers.token; 
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;

    let comentario = {
        texto: req.body.texto,
        post: req.body.post,
        usuario: id_usuario_logado
    }
    console.log(comentario);

    let promisse = Comentarios.create(comentario);
    promisse.then(function(comentario){
        res.status(201).json(viewComentario.render(comentario));
    }).catch(function(error){
        res.status(400).json("erro ao inserir comentario");
    });
}

module.exports.removerComentario = function(req, res){

    let token = req.headers.token; 
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;
    let id = req.params.id;
    
    console.log(params);
    let promisse = Comentarios.findById(id);

    promisse.then(function(comentario){
        if(comentario.usuario == id_usuario_logado){
            Comentarios.deleteOne({"_id" : id}).exec();
            res.json("Comentario Removido com sucesso");
        }else{
            res.status(403).json("erro ao remover comentario (Não é do usuario logado)")
        }
        
    }).catch(function(error){
        console.log(error);
    });
}