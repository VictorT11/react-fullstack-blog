import {body} from 'express-validator';

 const registerValidation = [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Minim 5 characters').isLength({min: 5}),
    body('fullName', 'Insert Full Name').isLength({min: 3}),
    body('avatarUrl', 'Invalid Url for avatar').optional().isURL(),
];

const loginValidation = [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Minim 5 characters').isLength({min: 5}),
];

const postCreateValidation = [
    body('title', 'Missing post title').isLength({min:3}).isString(),
    body('text', 'Missing post text').isLength({min: 10}).isString(),
    body('tags', 'Incorect tags format').optional().isString(),
    body('imageURL', 'Incorect URL link').optional().isString(),
];

export {registerValidation, loginValidation, postCreateValidation};