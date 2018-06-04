import * as joi from 'joi'

export default {
    register: {
        body: {
            coordinates: joi.array().length(2).items( joi.number().required(), joi.number().required() ).required(),
            description: joi.string().required(),
            user: joi.required(),
            category: joi.number().valid(1,2,3).required(),
            victims: joi.number().integer()
        }
    },
    delete: {
        params:{
            id: joi.required()
        }
    },
    select: {
        params:{
            id:joi.required()
        }
    }
}