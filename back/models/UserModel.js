import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

module.exports = app => { 

    let collection
    const UserModel = function(){
        collection = app.persistence.user
    }

    UserModel.prototype.findOne = async function(identifier){
        return new Promise((resolve, reject) => {          
            collection.findOne(identifier)
                .then( user => {
                    user.password = null;
                    resolve(user);
                })
                .catch( error => reject(error) );
        })
    } 

    UserModel.prototype.Users = async function(){
        return new Promise((resolve, reject) => {
            collection.find()
                .then( user => {
                    user = user.map(user => {
                        user.password = null;
                        return user;
                    })
                    resolve(user);
                })
                .catch( error => reject(error) );
        });
    }

    UserModel.prototype.register = async function(user){
        return new Promise((resolve, reject) => {
            let password = this.hashPassword(user.password)
            user = {...user, password}

            let insert = new collection(user)
            insert.save()
                .then( result => resolve(result) )
                .catch( error => reject(error) )
        });
    }

    UserModel.prototype.update = async function(user){
        return new Promise((resolve, reject) => {
            let id = user.id;
            delete user.id;
            if(user.password) {
                let password = this.hashPassword(user.password);
                user = {...user, password}; 
            }        
            let date = new Date();
            let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;  
            user = {...user, lastupdate: dateNow};

            collection.findOneAndUpdate({ _id: id }, user)
                .then( () => resolve() )
                .catch( error => reject(error) )
        });
    }

    UserModel.prototype.delete = async function(id){
        return new Promise((resolve, reject) => {
            collection.find({ _id: id }).remove()
                .then( () => resolve() )
                .catch( error => reject(error) )
        });
    }
    
    UserModel.prototype.hashPassword = function(password){
        let salt = bcrypt.genSaltSync(9);
        let hash = bcrypt.hashSync(password, salt);

        return hash;
    }

    return UserModel;
}