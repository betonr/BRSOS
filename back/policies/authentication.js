import Joi from 'joi';
import passport from 'passport';

/*
 * Realiza a autenticação via passport (email e senha válidos)
 */
function auth(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if (err || !user) {
            res.status(403).send({
                error: 'You do not have access to this resource'
            })
        } else {
            req.user = user
            next()
        }
    })(req, res, next)
}

/*
 * verifica se o usuário logado é administrador (level=3)
 * ou está editando suas proprias informações
 */ 
function isAdmin(req, res, next) {
    if(req.user.id != req.body.id && req.user.level != 3){
        res.status(403).send({
            errors: [{ 
                field: ['_id'],
                message: ['You need to be an administrator']
            }]
        })
    }else{
        next();
    }
}

module.exports = {
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{8,30}/).required().options({
                language: {
                  string: {
                    regex: {
                      base: 'Password should be atleast 8 characters long and should contain numbers and letters'
                    }
                  }
                }
            })
        }
    },
    auth,
    isAdmin
}

