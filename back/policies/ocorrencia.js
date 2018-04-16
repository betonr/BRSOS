import Joi from 'joi';

module.exports = {
    register: {
        body: {
            // photo: {
            //     contentType: Joi.string().required(),
            //     data: Joi.binary().encoding('base64').required()
            // },
            coordinates: Joi.array().length(2).items( Joi.number().required(), Joi.number().required() ).required(),
            description: Joi.string().required(),
            user: Joi.required(),
            category: Joi.number().valid(1,2,3).required(),
            victims: Joi.number().integer()
        }
    },
    delete: {
        params:{
            id: Joi.required()
        }
    },
    select: {
        params:{
            id:Joi.required()
        }
    }
};