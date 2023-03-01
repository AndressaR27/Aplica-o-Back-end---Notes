// É a camada que vai ficar responsável por processar a requisição.

/*
 * index - GET para listar vários registros
 * show - GET para exibir um registro especifico
 * create - POST para criar um registro
 * update - PUT  para atualizar um registro
 * delete - DELETE para remover um arquivo
*/
const { hash, compare } =  require("bcryptjs");
const AppError = require("../Utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { json } = require("express");

class UsersController {

    async create (request, response) {
        const { name, email, password } = request.body

        const database = await sqliteConnection();
        //para pegar conteúdo de uma variável usar: (?) e []
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUserExist){
            throw new AppError("Este e-mail já está em uso")
        };
        
        const hashedPassword = await hash(password, 8);

        await database.run(`INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hashedPassword}")`);

        return response.status(201).json();
        
    }

    async update (request, response){
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id
        //criando conexão com o banco de dados
        const database =  await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if (!user) {
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso");
        }

        if (password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if (password && old_password){
            const checkOldPassword = await compare(old_password, user.password);
            
            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere")
            }

            user.password = await hash(password, 8);
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, [user.name, user.email, user.password, user_id]);

        return response.status(200).json();
    }
}

module.exports = UsersController;