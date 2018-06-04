import * as bcrypt from 'bcrypt-nodejs'

import UserModel from './../models/UserModel'

export class UserController {

    env: any
    constructor(environment) {
        this.env = environment
    }

    private hashPassword(password): IDBFactory{
        let salt = bcrypt.genSaltSync(9);
        let hash = bcrypt.hashSync(password, salt);
    
        return hash;
    }
    
    users(id): Promise<Object>{
        return new Promise( (resolve, reject) => {
            if(id) {
                UserModel.findOne({_id: id})
                    .then( user => {
                        user.password = null;
                        resolve({user})
                    })
                    .catch( () => reject({
                        status: 404,
                        errors: [{ 
                            field: ['id'],
                            messages: ['User not found']
                        }]
                    })
                )
            }
            else{
                UserModel.find()
                    .then( users_full => {
                        let users = users_full.map(user => {
                            user.password = null;
                            return user;
                        })
                        resolve({users})
                    })
                    .catch( (error) => {
                        reject({
                            status: 500, 
                            errors: "Internal Server Error" 
                        })
                    })
            }
        })
    }

    register(user): Promise<Object>{
        return new Promise( (resolve, reject) => {

            UserModel.findOne({email: user.email})
                .then( user => {
                    reject({
                        status: 409,
                        errors: [{ 
                            field: ['email'],
                            messages: [`Email Address (${user.email}) already in use`]
                        }]
                    })
                })
                .catch( () => {
                    let password = this.hashPassword(user.password)
                    user = {...user, password}

                    let insert = new UserModel(user)
                    insert.save()
                        .then( result => resolve({ 'id': result._id }) )
                        .catch( error => {
                            reject({ 
                                status: 500,
                                errors: "Internal Server Error" 
                            })
                        })
                })
        })
    }

    update(user): Promise<Object>{
        return new Promise( (resolve, reject) => {
            UserModel.findOne({_id: user.id})
                .then( () => {
                    let id = user.id;
                    delete user.id;

                    if(user.password) {
                        let password = this.hashPassword(user.password);
                        user = {...user, password}; 
                    }

                    UserModel.findOneAndUpdate({ _id: id }, user)
                        .then( () => resolve({success: true}) )
                        .catch( error => {
                            reject({ 
                                status: 500,
                                errors: "Internal Server Error" 
                            })
                        })

                })
                .catch( () => reject({
                    status: 404,
                    errors: [{ 
                        field: ['id'],
                        messages: ['User not found']
                    }]
                }) )
        })
    }

    delete(id): Promise<Object>{
        return new Promise( (resolve, reject) => {
            UserModel.findOne({_id: id})
                .then( () => {
                    UserModel.find({ _id: id }).remove()
                        .then( () => resolve({success: true}) )
                        .catch( error => {
                            reject({ 
                                status: 500,
                                errors: "Internal Server Error" 
                            })
                        })

                })
                .catch( () => reject({
                    status: 404,
                    errors: [{ 
                        field: ['id'],
                        messages: ['User not found']
                    }]
                }) )
        })
    }
}