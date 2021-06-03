const controller = require("../controllers/usuarios");

module.exports = function(app){
    app.get("/api/usuarios", controller.listarUsuarios);
    app.get("/api/usuarios/:id", controller.listarUsuarioId);
    app.post("/api/usuarios", controller.inserirUsuario);
    app.delete("/api/usuarios/:id", controller.removerUsuarioId);
}