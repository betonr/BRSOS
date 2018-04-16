import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

module.exports = app => { 

    let collection
    const OcorrenciaModel = function(){
        collection = app.persistence.ocorrencia
    }

    OcorrenciaModel.prototype.findOne = async function(identifier){
        return new Promise((resolve, reject) => {          
            collection.findOne(identifier)
                .then( ocorrencia => resolve(ocorrencia) )
                .catch( error => reject(error) );
        })
    } 

    OcorrenciaModel.prototype.ocorrencias = async function(){
        return new Promise((resolve, reject) => {
            collection.find()
                .then( ocorrencias => resolve(ocorrencias) )
                .catch( error => reject(error) );
        });
    }

    OcorrenciaModel.prototype.register = async function(ocorrencias){
        return new Promise((resolve, reject) => {
            let insert = new collection(ocorrencias)

            insert.save()
                .then( result => resolve(result) )
                .catch( error => reject(error) )
        });
    }

    OcorrenciaModel.prototype.delete = async function(id){
        return new Promise((resolve, reject) => {
            collection.find({ _id: id }).remove()
                .then( () => resolve() )
                .catch( error => reject(error) )
        });
    }

    return OcorrenciaModel;
}