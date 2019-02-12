const BaseRoute = require('./base/baseRoute');
const joi = require('joi');
const boom = require('boom');

const failAction = (request, headers, erro) => {
    throw boom.internal('Fail Action');
}

class PessoaRoute extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    };
    
    create() {
        return {
            path: '/pessoa',
            method: 'POST',
            config: {
               validate: {
                    failAction,
                    payload: {
                        nome: joi.string().required().min(3).max(100),
                        sex: joi.string().required().min(2).max(30),
                        empresa: joi.string().required().min(2).max(100),
                        age: joi.number().integer().max(3)
                    }                    
                }
            },
            handler: async (request) => {
                try {
                     const {
                         nome,
                         sex,
                         empresa,
                         age
                     }
                     return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    };
                } catch (error) {
                }
            }
        }
    }
}

module.exports = PessoaRoute;