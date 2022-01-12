import { body, ValidationChain } from 'express-validator';

/**
 * Validations related to email hook
 * `to`, `cc`, `bcc`, `subject`, `message` values are checked
 */
export const email = [
  body('to')
    .trim()
    .notEmpty()
    .withMessage('`to` value cannot be empty')
    .isEmail()
    .withMessage('`to` value need to be in email format'),
  body('cc')
    .isArray()
    .isEmail()
    .withMessage('`cc` value need to be array of emails'),
  body('bcc')
    .isArray()
    .isEmail()
    .withMessage('`bcc` value need to be array of emails'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('`subject` value cannot be empty'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('`message` value cannot be empty'),
] as ValidationChain[];
