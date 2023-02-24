const { Router } = require("express")

//A missão deste arquivo será agrupar todas as rotas, grupo de rotas, existentes no projeto

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")


const routes = Router();

routes.use("/users", usersRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter) 
routes.use("/sessions", sessionsRouter)

module.exports = routes;