import validate from 'express-validation';

module.exports = app => {

    const Ocorrencia = new app.controllers.OcorrenciaController;
    app.get('/brsos/api/ocorrencia/:id',
        //app.policies.authentication.auth,
        validate(app.policies.ocorrencia.select),
        Ocorrencia.ocorrencias)
        .get('/brsos/api/ocorrencia/',
        Ocorrencia.ocorrencias);

    app.post('/brsos/api/ocorrencia/register',
        //app.policies.authentication.auth,
        validate(app.policies.ocorrencia.register),
        Ocorrencia.register);

    app.delete('/brsos/api/ocorrencia/delete/:id',
        //app.policies.authentication.auth,
        validate(app.policies.ocorrencia.delete),
        Ocorrencia.delete);

}