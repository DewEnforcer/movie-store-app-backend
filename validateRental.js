const Joi = require("joi");
function validator(obj) {
    const schema = Joi.object({
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required(),
    })

    const {error} = schema.validate(obj);
    return error
}
module.exports = validator;