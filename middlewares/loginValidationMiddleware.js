const loginValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })
        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

module.exports = { loginValidation }