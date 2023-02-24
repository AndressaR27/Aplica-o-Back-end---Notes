const knex = require("../database/knex")
const AppError = require("../Utils/AppError")

class SessionsController {
    async create (request, response){
        const { email, password } = request.body

        return response.json({ email, password })

    }

}

module.exports = SessionsController; 