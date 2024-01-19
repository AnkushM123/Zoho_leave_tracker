const mongoIdValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.params, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const getUserByEmailValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const editUserValidation = (schema) => async (req, res, next) => {
    try {
        req.body.address = JSON.parse(req.body.address);
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const changePasswordValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

module.exports = { mongoIdValidation, getUserByEmailValidation, editUserValidation, changePasswordValidation }
