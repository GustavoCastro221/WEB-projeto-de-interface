import './App.css';
import "./components/commom/Navegador/Navegador.css"
import "./components/pages/PaginaFeed/PaginaFeed.css"
import "./components/pages/PaginaPostar/PaginaPostar.css"
import {PaginaFeed} from './components/pages/PaginaFeed/PaginaFeed';
import {Router, Route, Redirect } from 'react-router-dom';
import { PaginaPostar } from './components/pages/PaginaPostar/PaginaPostar';
import history from './history'
import { PaginaCadastro } from './components/pages/PaginaCadastro/PaginaCadastro';
import { PaginaLogin } from './components/pages/PaginaLogin/PaginaLogin';
import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

function App() {

  const [auth, setAuth] = useState({token: null, nome: null})

  let setAuthLS = (newAuth)=>{
    setAuth(newAuth);
    localStorage.setItem("token", newAuth.token);
    localStorage.setItem("nome", newAuth.nome);
  }

  return (
    <AuthContext.Provider value={{auth: auth, setAuth: setAuthLS}}>
      <Router history={history}>
        <Route exact path="/">
            {auth.token == null ? <Redirect to="/login"></Redirect> : <PaginaFeed></PaginaFeed>}
        </Route>
        <Route path="/postar">
            <PaginaPostar></PaginaPostar>
        </Route>
        <Route path="/cadastro">
            <PaginaCadastro></PaginaCadastro>
        </Route>
        <Route exact path="/login">
            <PaginaLogin></PaginaLogin>
        </Route>
      </Router>
    </AuthContext.Provider>
      
  );
}

export default App;
