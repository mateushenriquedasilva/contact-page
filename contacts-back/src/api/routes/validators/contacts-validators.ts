import { body, validationResult } from 'express-validator';

class ContactValidator {
    createContactValidator = [
        body('contact_name').notEmpty().withMessage('field name is required'),
        body('contact_email').isEmail().withMessage('field email is required'),
        body('contact_mobile').notEmpty().withMessage('field mobile is required'),
        body('contact_phone').notEmpty().withMessage('field  phone is required'),
        body('contact_is_favorite').isBoolean().withMessage('field favorite is required'),
        body('contact_is_active').isBoolean().withMessage('field active is required'),
    ];

    updatedContactValidator = [
        body('contact_id').notEmpty().withMessage('field id is required'),
        body('contact_name').notEmpty().withMessage('field name is required'),
        body('contact_email').isEmail().withMessage('field email is required'),
        body('contact_mobile').notEmpty().withMessage('field mobile is required'),
        body('contact_phone').notEmpty().withMessage('field  phone is required'),
        body('contact_is_favorite').isBoolean().withMessage('field favorite is required'),
        body('contact_is_active').isBoolean().withMessage('field active is required'),
    ];

    contactFavoriteValidator = [
        body('contact_id').isNumeric().withMessage('field id is required'),
        body('contact_is_favorite').isBoolean().withMessage('field favorite is required'),
    ];
}

export default new ContactValidator();