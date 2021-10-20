const Usuario = require("../models/usuario")
const Posts = require("../models/post")
const view = require("../views/usuarios")
const viewPosts = require("../views/posts")
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports.listarUsuarios = function(req, res){
    let promisse = Usuario.find().exec();
    promisse.then(function(usuarios){
        res.status(200).json(view.renderMany(usuarios));
    }).catch(function(error){
        console.log(error);
    })
}

module.exports.listarUsuarioId = function(req, res){
    let id = req.params.id;
    let promisse = Usuario.findById(id).exec();
   
    promisse.then(function(usuario){
        res.json(view.renderOne(usuario));
    }).catch(function(error){
        console.log(error);
    })
}

module.exports.listarPostUsuarioId = function(req, res){
    let id = req.params.id;
    let promisse = Posts.find({"usuario": id}).exec();
    promisse.then(function(Post){
        res.json(viewPosts.renderMany(Post));
    }).catch(function(error){
        console.log(error);
    })    
}

module.exports.inserirUsuario = function(req, res){
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)

    }
    
    let promisse = Usuario.create(usuario);
    promisse.then(function(usuario){
        res.status(201).json(view.renderOne(usuario));
    }).catch(function(error){
        res.status(400).json("erro ao inserir usuario");
    })
}


module.exports.removerUsuarioId = function(req, res){
    let token = req.headers.token; 
    let payload = jwt.decode(token);
    let id_usuario_logado = payload.id;
    let id = req.params.id;
    
        let promisse = Usuario.findById(id).exec();
        promisse.then(function(usuario){
            if(usuario.id == id_usuario_logado){
                Usuario.deleteOne({"_id" : id}).exec();
                res.json("Usuario Removido com sucesso");
            }else{
                res.status(403).json("erro ao remover (Não é o usuario logado)");
            }
            
        }).catch(function(error){
            res.status(400).json("erro ao remover");
        })
    
}