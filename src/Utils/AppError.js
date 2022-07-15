class AppError {
    message;
    statusCode;
    
    // a função constructor é chamada sempre que uma nova instância da classe é inicializada. 
    constructor(message, statusCode = 400){
        this.message = message;  //pegando a message recebida e passando para escopo global. 
        this.statusCode = statusCode; 
    }
}

module.exports = AppError;