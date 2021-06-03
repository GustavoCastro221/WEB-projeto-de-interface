let usuarios = [
    {id: "1",nome: "Victor Farias",email: "victor@domain.com", senha:"123"},
    {id: "3",nome: "Gustavo Castro", email: "gustavo@domain.com", senha:"321"},
]

module.exports.listarUsuarios = function(req, res){
    res.json(usuarios);
}

module.exports.listarUsuarioId = function(req, res){
    let id = req.params.id;
    let usuarioBuscado = usuarios.find(function(user){return user.id == id});
    if(usuarioBuscado){
        res.json(usuarioBuscado);
    }else{
        res.status(404).json({mensagem:"Usuario não encontrado"});
    }
}

module.exports.inserirUsuario = function(req, res){
    console.log(req.body);
    let usuario = req.body;
    usuarios.push(usuario);
    res.status(201).json(usuario);
}

module.exports.removerUsuarioId = function(req, res){
    let id = req.params.id;
    usuarios = usuarios.filter(function(user){return user.id!=id});
    res.json("Usuario Removido com sucesso");
}