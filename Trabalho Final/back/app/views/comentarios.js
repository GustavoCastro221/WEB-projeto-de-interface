function render(comentario){
    return {
        id: comentario._id,
        texto: comentario.texto,
        Post: comentario.post,
        Usuario: comentario.usuario
    }
}
module.exports.render = render;

function renderMany(comentarios){
    return comentarios.map(render);
}

module.exports.renderMany = renderMany;