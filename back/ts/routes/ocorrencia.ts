import * as validate from 'express-validation'

import policiesAuth from './../policies/auth'
import policiesOcorrencia from './../policies/ocorrencia'
import { OcorrenciaController } from './../controllers/OcorrenciaController'

export default (app, environment): void => {

    const Ocorrencia = new OcorrenciaController(environment)

    app.get(environment.pathBase+'/ocorrencia/:id',
        //policiesAuth.authentication,
        validate(policiesOcorrencia.select),
        (req, res) => Ocorrencia.ocorrencias(req.params.id)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

    app.get(environment.pathBase+'/ocorrencias',
        //policiesAuth.authentication,
        (req, res) => Ocorrencia.ocorrencias(null)
            .then( response => res.status(200).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

    app.post(environment.pathBase+'/ocorrencia/register',
        //policiesAuth.authentication,
        validate(policiesOcorrencia.register),
        (req, res) => Ocorrencia.register(req.body)
            .then( response => res.status(201).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

    app.delete(environment.pathBase+'/ocorrencia/delete/:id',
        //policiesAuth.authentication,
        validate(policiesOcorrencia.delete),
        (req, res) => Ocorrencia.delete(req.params.id)
            .then( response => res.status(202).send(response) )
            .catch( error => res.status(error.status).send({error: error.errors}) ))

}