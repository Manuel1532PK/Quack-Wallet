const validators = require('../utils/validators');

const sanitizeInput = (req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = validators.sanitizeInput(req.body[key]);
            }
        });
    }
    next();
};
module.exports = sanitizeInput;