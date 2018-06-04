import * as joi from 'joi'

export default {
    register: {
        body: {
            name: joi.string().regex(/[a-zA-Z]/).required(),
            lastname: joi.string().regex(/[a-zA-Z]/).required(),
            email: joi.string().email().required(),
            level: joi.number().integer().required(),
            password: joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'Password should be atleast 8 characters long and should contain numbers and letters'
                    }
                  }
                }
            }).required(),
            status: joi.number().integer()
        }
    },
    update: {
        body: {
            id: joi.required(),
            name: joi.string().regex(/[a-zA-Z]/),
            lastname: joi.string().regex(/[a-zA-Z]/),
            email: joi.string().email(),
            level: joi.number().integer(),
            password: joi.string().regex(/[a-zA-Z0-9]{8,30}/).options({
                language: {
                  string: {
                    regex: {
                      base: 'Password should be atleast 8 characters long and should contain numbers and letters'
                    }
                  }
                }
            }),
            status: joi.number().integer()
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