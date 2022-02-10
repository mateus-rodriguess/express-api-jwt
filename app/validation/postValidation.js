const { Joi } = require('celebrate')

const postValidation = Joi.object().keys({
    title: Joi.string().min(1).required().max(100),
    content: Joi.string().required(),  
})

const postEditValidation = Joi.object().keys({
    title: Joi.string().min(1).max(100),
    content: Joi.string() 
})

module.exports = {
    postValidation,
    postEditValidation
}