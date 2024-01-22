const mongoIdValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.params, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const userAllRecordValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const userParticularRecordValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const createLeaveRecordValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

const editLeaveRecordValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })

        return next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
}

module.exports = { mongoIdValidation, userAllRecordValidation, userParticularRecordValidation, createLeaveRecordValidation, editLeaveRecordValidation }
