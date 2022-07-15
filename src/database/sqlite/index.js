const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path")// biblioteca que já vem com o Node para resolver problemas de diretórios em diferentes sistemas operacionais.

async function sqliteConnection() {
    const database = await sqlite.open({
        //onde irá ficar salvo o arquivo do banco de dados?
        filename: path.resolve(__dirname,"..", "database.db"),
        driver: sqlite3.Database
    });
    
    return database;
}

module.exports = sqliteConnection;