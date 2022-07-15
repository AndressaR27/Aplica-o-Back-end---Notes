const { Router } = require("express");
const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

//Como temos uma classe dentro do UsersController é preciso criar uma nova instância para essa classe. 
const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);

 module.exports = tagsRoutes;