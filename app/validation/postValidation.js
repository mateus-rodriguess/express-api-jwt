const { Joi } = require('celebrate')

const bodySchema = Joi.object().keys({
    title: Joi.string().min(1).required().max(100),
    content: Joi.string().required(),  
})


module.exports = {
    bodySchema
}