const Posts = require("../models/post")
const Comentarios = require("../models/comentario");
const viewComentario = require("../views/comentarios");
const viewPost = require("../views/posts");
const jwt = require("jsonwebtoken");
const usuario = require("../models/usuario");

module.exports.listarPosts = function(req, res){
    let promisse = Posts.find().populate('usuario');

    promisse.then(function(posts){
        res.json(viewPost.renderMany(posts));
    }).catch(function(error){
        console.log(error);
    });
    
}

module.exports.listarPostId = function(req, res){
    let id = req.params.id;
    let promisse =  Posts.findById(id).exec();

    promisse.then(function(post){
        res.json(viewPost.renderOne(post));
    }).catch(function(error){
        console.log(error);
    });
}

module.exports.listarComentarioIdPost = function(req, res){
    let id = req.params.id;
    let promisse = Comentarios.find({"post": id}).exec();
    promisse.then(function(Comentario){
        res.json(viewComentario.renderMany(Comentario));
    }).catch(function(error){
        console.log(error);
    })  
}


module.exports.inserirPost = function(req, res){
    let token = req.headers.token; 
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;

    let post = {
        texto: req.body.texto,
        likes: req.body.likes,
        usuario: id_usuario_logado
    }
    let promisse = Posts.create(post);
    promisse.then(function(post){
        res.status(201).json(viewPost.renderOne(post));
    }).catch(function(error){
        res.status(400).json("erro ao inserir post");
    })
    
}

module.exports.removerPostId = function(req, res){
    let token = req.headers.token; 
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;
    let id = req.params.id;

    let promisse = Posts.findById(id).exec();

    promisse.then(function(Post){
        if(Post.usuario == id_usuario_logado){
            Posts.deleteOne({"_id" : id}).exec();
            res.json("Post Removido com sucesso");
        }else{
            res.status(403).json("erro ao remover post (Não é do usuario logado)")
        }
        
    }).catch(function(error){
        console.log(error);
    })
        
    
}