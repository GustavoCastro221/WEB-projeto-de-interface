import axios from "axios";


export function listarComentariosPost(id,token){
    return axios(
        {
            method: "GET",
            url: "http://localhost:5000/api/posts/"+id+"/comentarios",
            headers: {
                "token": token
            },

        }
    )
}

export function inserirComentario(token, post, comentario){
    return axios(
        {
            method: "POST",
            url: "http://localhost:5000/api/comentarios",
            headers: {
                "token": token
            },
            data: { "texto":comentario.texto, "post": post}
            
        }
    )
}