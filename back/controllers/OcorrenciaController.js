module.exports = (app) => {
    
    let ocorrenciaModel;
    const OcorrenciaController = function(){
        ocorrenciaModel = new app.models.OcorrenciaModel
    }

    OcorrenciaController.prototype.ocorrencias = function(req, res){
        let id = req.params.id ? req.params.id : false;

        if(id) {
            ocorrenciaModel.findOne({_id: id})
                .then( ocorrencia => res.send({ocorrencia}) )
                .catch( () => res.status(404).send({
                    errors: [{ 
                        field: ['id'],
                        message: ['Ocorrencia not found']
                    }]
                }) 
            );
        }
        else{
            ocorrenciaModel.ocorrencias()
                .then( ocorrencias => {
                    res.send({ocorrencias})
                })
                .catch( (error) => res.status(500).send(error))
        }
    }

    OcorrenciaController.prototype.register = function(req, res){
        let ocorrencia = req.body;
        let date = new Date();
        let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        let coordinates = ocorrencia.coordinates;

        ocorrencia = { ...ocorrencia, date: dateNow, geometry: { type: "Point", coordinates }};
        
        ocorrenciaModel.register(ocorrencia)
            .then( response => res.status(201).send(response))
            .catch( error => res.status(500).send(error))
    }

    OcorrenciaController.prototype.delete = function(req, res){
        let id = req.params.id;
        
        ocorrenciaModel.findOne({_id: id})
            .then( () => {
                ocorrenciaModel.delete(id)
                    .then( () => res.status(202).send() )
                    .catch( error => res.status(500).send(error))
            })
            .catch( () => res.status(404).send({
                errors: [{ 
                    field: ['id'],
                    message: ['Ocorrencia not found']
                }]
            }) );
    }

    return OcorrenciaController;
}