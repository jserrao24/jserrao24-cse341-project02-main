const Joi = require('joi');

const artistSchema = Joi.object({
    name: Joi.string().required(),
    genre: Joi.string().required(),
});

const songSchema = Joi.object({
    title: Joi.string().required(),
    genre: Joi.string().required(),
    releaseDate: Joi.date(),
    artist: Joi.string().required(),
});

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(422).json(error.message);
        } else {
            next();
        }
    }
}

module.exports = { artistSchema, songSchema, validate };