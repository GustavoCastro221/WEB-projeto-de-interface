import "../Navegador/Navegador.css"
import {NavLink } from "react-router-dom"
import { AuthContext } from "../../../App"
import { useContext } from "react"


function NavegadorLogado(){
    const auth = useContext(AuthContext);
    return   (
        <nav className="navegador">
            <h1 className="logo">Sistema de Posts</h1>
            
            <NavLink
                exact
                className="link-nav" 
                to="/">
                        Feed 
            </NavLink>
            <NavLink
            exact
                className="link-nav" 
                to="/postar">
                        Postar
            </NavLink>
            <NavLink
                className="link-nav"
                to="/login"
                onClick={()=>{auth.setAuth({token:null, nome:null})}}>
                        Logout
            </NavLink>
            
            
            <h2 className="nome-usuario-logado">{auth.auth.nome}</h2>

        </nav>
    )
}

function NavegadorNaoLogado(){
    return   (
        <nav className="navegador">
            <h1 className="logo">Sistema de Posts</h1>
            <NavLink
                exact
                className="link-nav" 
                to="/cadastro">
                        Cadastro 
            </NavLink>
            <NavLink
                exact
                className="link-nav" 
                to="/login">
                        Login 
            </NavLink>
        </nav>
    )
}
export function Navegador(){
    const {auth} = useContext(AuthContext);
    return(

        <div>
            {
                auth.token == null  ? <NavegadorNaoLogado></NavegadorNaoLogado> : <NavegadorLogado></NavegadorLogado>
            }
        </div>
        
    )
}