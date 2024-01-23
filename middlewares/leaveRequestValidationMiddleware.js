const mongoIdValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.params, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const getByManagerIdValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.params, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const getByUserIdValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.params, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const applyLeaveValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const updateRequestValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const changeStatusValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

module.exports = { mongoIdValidation, getByManagerIdValidation, getByUserIdValidation, applyLeaveValidation, updateRequestValidation, changeStatusValidation }
