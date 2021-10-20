function render(post){
    return {
        id: post._id,
        texto: post.texto,
        likes: post.likes,
        Usuario: post.usuario
    }

}

module.exports.renderOne = render;
function renderMany(posts){
    return posts.map(render);
}

module.exports.renderMany = renderMany;