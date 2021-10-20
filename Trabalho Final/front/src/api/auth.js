import axios from "axios";

export function login(usuario){
    return axios(
        {
            method: "POST",
            url:"http://localhost:5000/api/usuarios/signin",
            data: usuario,
        }
    )
}

export function cadastrar(usuario){
    return axios(
        {
            method: "POST",
            url:"http://localhost:5000/api/usuarios",
            data: usuario,
        }
    )
}