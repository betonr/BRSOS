import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

module.exports = app => { 

    let collection
    const AuthModel = function(){{
        collection = app.persistence.user
    }}

    //metodo para realização de login - autenticação
    AuthModel.prototype.login = async function(info){
        return new Promise( (resolve, reject) => {
            collection.findOne({ email: info.email, status: true })
                .then( user => {
                    if(user != null) {
                        this._isPassword(user, info.password)
                            .catch(error => reject({'error': error, status: 401}))
                            .then( () => {
                                user.password = null
                                resolve({
                                    me: user, 
                                    token: this._generateToken(user), 
                                    messsage: 'Authorization success'
                                })
                            })                  
                    
                    //USER - NOT FOUND OR INACTIVE
                    } else{
                        let response = {
                            errors: [
                                {
                                    field: ['email','status'],
                                    messages: ['User not found or inactive']
                                }
                            ]                   
                        }
                        reject({'error': response, status: 401})
                    }
                    
                }).catch( err => {
                    reject({'error': err, status: 500})
                })
        });
    }

    //comparando senhas criptografadas
    AuthModel.prototype._isPassword = function(user, password){
        return new Promise((resolve, reject) => {
            if(bcrypt.compareSync(password, user.password)) resolve();
            else reject({errors: [{
                    field: ['password'],
                    messages: ['wrong password!']
                }]
            })
        });
    }

    AuthModel.prototype._generateToken = function(user){
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign({user}, app.libs.DSINFO.authentication.jwtSecret, {
            expiresIn: ONE_WEEK
        })
    }

    return AuthModel;
    
}