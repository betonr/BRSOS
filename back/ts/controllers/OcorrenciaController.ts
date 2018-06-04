import UserModel from './../models/UserModel'
import OcorrenciaModel from './../models/OcorrenciaModel'

export class OcorrenciaController {

    env: any
    constructor(environment){
        this.env = environment
    }

    ocorrencias(id): Promise<Object> {
        return new Promise( (resolve, reject) => {
            if(id) {
                OcorrenciaModel.findOne({_id: id})
                    .then( ocorrencia => {
                        if(ocorrencia.id) resolve({ocorrencia}) 
                        else {
                            reject({
                                status: 404,
                                errors: [{ 
                                    field: ['id'],
                                    messages: ['Occurrence not found']
                                }]
                            })
                        }
                    })
            }
            else{
                OcorrenciaModel.find()
                    .then( ocorrencias => {
                        resolve({ocorrencias})
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

    register(ocorrencia): Promise<Object>{
        return new Promise( (resolve, reject) => {
    
            UserModel.findOne({_id: ocorrencia.user})
                .then( user => {
                    if(user._id) {
                        let insert = new OcorrenciaModel(ocorrencia)
                        insert.save()
                            .then( result => resolve({ 'id': result._id }) )
                            .catch( error => {
                                reject({ 
                                    status: 500,
                                    errors: "Internal Server Error" 
                                })
                            })
                    }
                }).catch( error => {
                    reject({ 
                        status: 404,
                        errors: [{ 
                            field: ['user'],
                            messages: ['User not found. Check the ID!']
                        }]
                    })
                })
        })
    }

    delete(id): Promise<Object>{
        return new Promise( (resolve, reject) => {
            OcorrenciaModel.find({ _id: id }).remove()
                .then( _ => resolve({success: true}) )
                .catch( error => {
                    reject({ 
                        status: 404,
                        errors: [{ 
                            field: ['id'],
                            messages: ['Occurrence not found']
                        }]
                    })
                })
        })
    }

}