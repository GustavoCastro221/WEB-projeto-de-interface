let posts = [
    {id: "1",texto: "Oi, tudo bem?",likes: "6"},
    {id: "5",texto: "Tudo bom! E vc?",likes: "6"},
]

module.exports.listarPosts = function(req, res){
    res.json(posts);
}

module.exports.listarPostId = function(req, res){
    let id = req.params.id;
    let postBuscado = posts.find(function(post){return post.id == id});
    if(postBuscado){
        res.json(postBuscado);
    }else{
        res.status(404).json({mensagem:"Post não encontrado"});
    }
}

module.exports.inserirPost = function(req, res){
    console.log(req.body);
    let post = req.body;
    posts.push(post);
    res.status(201).json(post);
}

module.exports.removerPostId = function(req, res){
    let id = req.params.id;
    posts = posts.filter(function(post){return post.id!=id});
    res.json("Post Removido com sucesso");
}