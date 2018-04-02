import validate from 'express-validation';

module.exports = app => {

    const Auth = new app.controllers.AuthController; 

    app.post('/brsos/api/auth/login', 
        validate(app.policies.authentication.login), 
        Auth.login);  

}