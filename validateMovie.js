const Joi = require("joi");
function validator(obj) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId: Joi.objectId().required()
    })

    const {error} = schema.validate(obj);
    return error
}
module.exports = validator;