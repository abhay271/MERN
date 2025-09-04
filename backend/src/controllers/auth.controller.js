const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res){
    const {fullName, email, password} = req.body;

    const userExists = await userModel.findOne({email: email});

    if(userExists){ return res.status(400).json({message: "User already exists"}); }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ fullName, email, password: hashedPassword });

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.cookie("token", token);
    
    res.status(201).json({message: "User registered successfully", user:
        {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

async function loginUser(req, res){
    const {password, email}=req.body;
    const user= await userModel.findOne({email});

    if(!user){ return res.status(400).json({message: "Invalid email or password"}); };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){ return res.status(400).json({message: "Invalid email or password"}); };

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({message: "User logged in successfully", user:{
        id: user._id,
        fullName: user.fullName,
        email: user.email
    }});

}


module.exports={registerUser, loginUser};