"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.newOrderRules = () => {
    return [
        express_validator_1.body('userId').isUUID(),
        express_validator_1.body('restaurantId').isUUID()
    ];
};
exports.validate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty())
        return next();
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
