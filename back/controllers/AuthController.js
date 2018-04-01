import logger from '../libs/logger'

module.exports = app => {
    
    let authModel;
    const AuthController = function(){
        authModel = new app.models.AuthModel;
    }

    AuthController.prototype.login = function(req, res){
        let {email,password} = req.body;
        
        authModel.login(req.body)
            .then(response => res.status(202).send(response) )
            .catch( error => {
                if(error.status < 500) res.status(error.status).send(error.error)
                else {
                    logger.error(`${error.error.name}: ${error.error.message}`)
                    res.status(500).send({ error: "Internal Server Error" }) 
                }
            })
        
    }

    return AuthController;
}