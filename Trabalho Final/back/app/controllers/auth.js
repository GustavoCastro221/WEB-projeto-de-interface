const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");

module.exports.logar = function(req,res){

    function logar(usuario){
        if(bcrypt.compareSync(req.body.senha, usuario.senha)){
            let token = jwt.sign({id : usuario._id}, "senha")

            res.status(200).json({token : token, nome: usuario.nome})
        }else{
            falhar();
        }
    }

    function falhar(){
        res.status(401).send("credenciais erradas")
    }

    Usuario.findOne({email: req.body.email}).exec().then(logar,falhar).catch(falhar);
        
        
}

module.exports.checar = function(req, res, next){
    let token = req.headers.token
    jwt.verify(token, "senha", function(err, decoded){
        if(err){
            res.status(401).send("Token Inválido")
        }else{
            next()
        }
    })
}