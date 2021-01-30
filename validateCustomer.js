const Joi = require("joi");
function validator(obj) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean()
    })

    const {error} = schema.validate(obj);
    return error
}
module.exports = validator;