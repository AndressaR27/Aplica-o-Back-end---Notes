require("dotenv/config")
//importar o async error
require("express-async-errors");
const { request, response } = require("express");
// importar o express
const express = require("express");
const cors = require("cors");

const AppError = require("./Utils/AppError");
const migrationsRun = require("./database/sqlite/migrations");
const routes = require("./routes");
const uploadConfig = require("./configs/upload");

migrationsRun();

// inicializar o express
const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);


app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})



const PORT = process.env.SERVER_PORT || 3333;
app.listen(PORT, () => console.log(`Server ir running on Port ${PORT}`));