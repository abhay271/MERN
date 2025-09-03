const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res){
    const {fullName, email, password} = req.body;

    const userExists = await userModel.findOne({email: email});

    if(userExists){ return res.status(400).json({message: "User already exists"}); }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ fullName, email, password: hashedPassword });

    const token = jwt.sign({id: user._id}, "c5b9c6fc5007682b6fe4d5d31901ca7d");

    res.cookie("token", token);

    res.status(201).json({message: "User registered successfully", user});

}