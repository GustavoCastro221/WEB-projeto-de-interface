import axios from "axios";


export function listarPosts(token){
    return axios(
        {
            method: "GET",
            url: "http://localhost:5000/api/posts",
            headers: {
                        "token": token
            }
        }
    )
}

export function inserirPost(token, post){
    console.log(post);
    return axios(
        {
            method: "POST",
            url: "http://localhost:5000/api/posts",
            headers: {
                "token": token
            },
            data: post
            
            
        }
    )
}