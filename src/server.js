//importar o async error
require("express-async-errors");
const { request, response } = require("express");
// importar o express
const express = require("express");

const AppError = require("./Utils/AppError");
const migrationsRun = require("./database/sqlite/migrations");
const routes = require("./routes");


// inicializar o express
const app = express();
app.use(express.json());

app.use(routes);

migrationsRun();

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



const PORT = 3333;
app.listen(PORT, () => console.log(`Server ir running on Port ${PORT}`));