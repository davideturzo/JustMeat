import { validationResult, body } from 'express-validator' ;

export const newOrderRules = () => {
    return [
        body('userId').isUUID(),
        body('restaurantId').isUUID()
    ]
}

export const validate = (req : any,res : any,next : any) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next();
    const extractedErrors :any[] = []
    errors.array().map(err => extractedErrors.push ({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}
