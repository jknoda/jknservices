const _ = require('lodash');

function dbError(res, dbErrors) {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({ errors });
}

module.exports = dbError;

