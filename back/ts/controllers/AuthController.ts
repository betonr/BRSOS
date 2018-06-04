import * as bcrypt from 'bcrypt-nodejs'
import * as jwt from 'jsonwebtoken'

import UserModel from './../models/UserModel'

export class AuthController {

    env: any
    constructor(environment){
        this.env = environment
    }

    private generateToken(user): string{
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign({user}, this.env.authentication.jwtSecret, {
            expiresIn: ONE_WEEK
        })
    }
    
    private isPassword(user, password): Promise<any> {
        return new Promise((resolve, reject) => {
            if(bcrypt.compareSync(password, user.password)) resolve();
            else reject({errors: [{
                    field: ['password'],
                    messages: ['wrong password!']
                }]
            })
        })
    }

    login(infos): Promise<Object> {
        return new Promise( (resolve, reject) => {
            let {email, password} = infos
            
            UserModel.findOne({ email, status: true })
                .then( user => {
                    if(user != null) {
                        this.isPassword(user, password)
                            .catch(error => reject({'errors': error, status: 500}))
                            .then( () => {
                                user.password = null
                                resolve({
                                    me: user, 
                                    token: this.generateToken({
                                        _id: user._id,
                                        email: user.email,
                                        level: user.level
                                    }), 
                                    messsage: 'Authorization success'
                                })
                            })               
                    
                    //USER - NOT FOUND OR INACTIVE
                    } else{
                        reject({
                            status: 401,
                            errors: [{ 
                                field: ['email','status'],
                                    messages: ['User not found or inactive']
                            }]
                        })
                    }
                    
                }).catch( err => {
                    reject({ 
                        status: 500,
                        errors: "Internal Server Error" 
                    })
                })  
        })
    }

}