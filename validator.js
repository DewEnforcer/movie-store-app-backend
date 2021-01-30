const Joi = require("joi");
function validator(obj) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    })

    const {error} = schema.validate(obj);
    return error
}
module.exports = validator;