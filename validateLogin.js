const Joi = require("joi");
function validator(obj) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(4).max(1024).required(),
    })

    const {error} = schema.validate(obj);
    return error
}
module.exports = validator;