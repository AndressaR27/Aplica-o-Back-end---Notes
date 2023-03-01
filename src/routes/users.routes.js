const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../Middleware/ensureAuthenticated")

const usersRoutes = Router();

//Como temos uma classe dentro do UsersController é preciso criar uma nova instância para essa classe. 
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

 module.exports = usersRoutes;