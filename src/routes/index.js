const { Router } = require("express")

//A missão deste arquivo será agrupar todas as rotas, grupo de rotas, existentes no projeto

const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

const routes = Router();

routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)

module.exports = routes;