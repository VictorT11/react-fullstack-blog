import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';


export const register = async (req, res) => {
    try {
        
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        },
            'secret123',
            { expiresIn: '30d' }
        );

        const {
            passwordHash
            , ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Register Failed"
        });
    }
};

export const login = async (req, res) =>{
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({
                message: 'Invalid Email', 
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass){
            return res.status(400).json({
                message: 'Invalid Email or Password', 
            })
        }

        const token = jwt.sign({
            _id: user._id,
        },
        'secret123',
        { expiresIn:'30d' }
        );

        const { 
            passwordHash
            , ...userData} = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " Authentication Failed",
        })
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: 'User Not Found!',
            })
        };
        
        const { 
            passwordHash, ...userData
            } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Register Failed"
        });
    }
};