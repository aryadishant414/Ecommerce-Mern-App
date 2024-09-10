import { hash } from "bcrypt";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

// Register Logic Code
export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;

        //validations
        if(!name) {
            res.send({error: 'Name is Required'});
        }  
        if(!email) {
            res.send({error: 'Email is Required'});
        }  
        if(!password) {
            res.send({error: 'Password is Required'});
        }  
        if(!phone) {
            res.send({error: 'Phone is Required'});
        }  
        if(!address) {
            res.send({error: 'Address is Required'});
        } 
        
        // existing user check
        const existingUser = await userModel.findOne({email:email});
        if(existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already registered please login',
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        // save user on Database
        const user = await new userModel({name, email, phone, address, password: hashedPassword}).save()

        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user,
        })

    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
                   
    }
};

// LOGIN Logic Code
export const loginController = async (req,res) => {
    try {
        const {email, password} = req.body;
        // validation
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: "email or password is missing",
            })
        }

        // check user
        const user = await userModel.findOne({email:email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User Does not Exist in Database"
            })
        }

        const match = await comparePassword(password, user.password);
        if(!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        // create Token
        const token = await JWT.sign( {_id: user._id} , process.env.JWT_SECRET , {expiresIn: "7d"});

        res.status(200).send({
            success: true,
            message: "User Logged In Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: ""
        })
        
    }

};

// TEST CONTROLLER
export const testController = (req,res) => {
    res.send("Protected Route hai");
    
}

