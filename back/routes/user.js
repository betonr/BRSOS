import validate from 'express-validation';

module.exports = app => {

    const User = new app.controllers.UserController;
    app.get('/brsos/api/user/:id',
        //app.policies.authentication.auth,
        validate(app.policies.user.select),
        User.users)
        .get('/brsos/api/user/',
        User.users);

    app.post('/brsos/api/user/register',
        //app.policies.authentication.auth,
        validate(app.policies.user.register),
        User.register);

    app.put('/brsos/api/user/update',
        //app.policies.authentication.auth,
        //app.policies.authentication.isAdmin,
        validate(app.policies.user.update),
        User.update);

    app.delete('/brsos/api/user/delete/:id',
        //app.policies.authentication.auth,
        validate(app.policies.user.delete),
        User.delete);

}