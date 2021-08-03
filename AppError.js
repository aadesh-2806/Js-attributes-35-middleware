class AppError extends error{
    constructor(message , status){
        super();
        this.message = message;
        this.status = status;
    }
}
module.exports = error;