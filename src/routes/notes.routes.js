const { Router } = require("express");
const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require("../Middleware/ensureAuthenticated")

const notesRoutes = Router();

//Como temos uma classe dentro do UsersController é preciso criar uma nova instância para essa classe. 
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);


notesRoutes.post("/", notesController.create); // id do usuário
notesRoutes.get("/:id", notesController.show); //id da nota
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

 module.exports = notesRoutes;