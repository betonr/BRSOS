module.exports = (app) => {
    
    let userModel;
    const UserController = function(){
        userModel = new app.models.UserModel
    }

    UserController.prototype.users = function(req, res){
        let id = req.params.id ? req.params.id : false;

        if(id) {
            userModel.findOne({_id: id})
                .then( (user) => res.send({user}) )
                .catch( () => res.status(404).send({
                    errors: [{ 
                        field: ['id'],
                        message: ['User not found']
                    }]
                }) 
            );
        }
        else{
            userModel.Users()
                .then( users => {
                    res.send({users})
                })
                .catch( (error) => res.status(500).send(error))
        }
    }

    UserController.prototype.register = function(req, res){
        let user = req.body;
        let date = new Date();
        let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        user = { ...user, registration: dateNow, lastupdate: dateNow};

        userModel.findOne({email: user.email})
            .then( (user) => {
                res.status(409).send({
                    errors: [{ 
                        field: ['email'],
                        message: [`Email Address (${user.email}) already in use`]
                    }]
                })
            })
            .catch( () => {
                userModel.register(user)
                    .then( response => res.status(201).send({ 'id': response.id }) )
                    .catch( error => res.status(500).send(error) )
            });
    }

    UserController.prototype.update = function(req, res){
        let user = req.body;

        userModel.find({_id: user.id})
            .then( () => {
                userModel.update(user)
                    .then( () => res.status(202).send() )
                    .catch( error => res.status(500).send(error))
            })
            .catch( () => res.status(404).send({
                errors: [{ 
                    field: ['id'],
                    message: ['User not found']
                }]
            }) );
    }

    UserController.prototype.delete = function(req, res){
        let id = req.params.id;
        
        userModel.findOne({_id: id})
            .then( () => {
                userModel.delete(id)
                    .then( () => res.status(202).send({success: true}) )
                    .catch( error => res.status(500).send(error))
            })
            .catch( () => res.status(404).send({
                errors: [{ 
                    field: ['id'],
                    message: ['User not found']
                }]
            }) );
    }

    return UserController;
}