const { Joi } = require("celebrate")

const registerValidation = Joi.object().keys({
    firstName: Joi.string().min(1).required().max(100),
    lastName: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    password_confirmation: Joi.any().equal(Joi.ref('password')).required().label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })

})

const loginValidation = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


module.exports = {
    registerValidation,
    loginValidation
}