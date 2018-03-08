import validate from 'express-validation';

module.exports = app => {

    const User = new app.controllers.UserController;
    app.get('/user/:id',
        //app.policies.authentication.auth,
        validate(app.policies.user.select),
        User.users)
        .get('/user/',
        User.users);

    app.post('/user/register',
        //app.policies.authentication.auth,
        validate(app.policies.user.register),
        User.register);

    app.put('/user/update',
        //app.policies.authentication.auth,
        //app.policies.authentication.isAdmin,
        validate(app.policies.user.update),
        User.update);

    app.delete('/user/delete/:id',
        //app.policies.authentication.auth,
        validate(app.policies.user.delete),
        User.delete);

}