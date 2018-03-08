module.exports = app => {
    
    let authModel;
    const AuthController = function(){
        authModel = new app.models.AuthModel;
    }

    AuthController.prototype.login = function(req, res){
        let {email,password} = req.body;

        authModel.login(req.body)
            .then(response => res.status(202).send(response) )
            .catch(error => res.status(401).send(error) )
        
    }

    return AuthController;
}