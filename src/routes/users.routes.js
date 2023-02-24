const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

//Como temos uma classe dentro do UsersController é preciso criar uma nova instância para essa classe. 
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

 module.exports = usersRoutes;