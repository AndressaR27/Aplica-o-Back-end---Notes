const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../Middleware/ensureAuthenticated")
const multer = require("multer");
const uploadConfig = require("../configs/upload")
const UserAvatarController = require("../controllers/UserAvatarController")

const usersRoutes = Router();

//Como temos uma classe dentro do UsersController é preciso criar uma nova instância para essa classe. 
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

 module.exports = usersRoutes;