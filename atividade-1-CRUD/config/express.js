const express = require("express");
const bodyParser = require("body-parser");
const routerPosts = require("../app/routes/posts.js");
const routerUsuarios = require("../app/routes/usuarios")
module.exports = function(){
    let app = express();

    app.set("port", 5000);
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    routerPosts(app);
    routerUsuarios(app);
    return app;
}