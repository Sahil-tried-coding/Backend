const user = require("../Models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()


const sigin = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;

        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already present",
            });
        }

        let hasedPassword = "";
        try {
            hasedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            console.log(error);
        }

        try {
            const enter = await user.create({ name, email, password: hasedPassword ,role});
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                user: enter
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "User registration failed",
                error: err
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "This is an error",
            error
        });
        console.log(error);
    }
};




const login = async(req,res) => {
    const{email,password} = req.body;

    let User = await user.findOne({email})


    if(!User){
        return res.status(401).json({
            success:false,
            message:"user is not registerd"
        })
    }

    if(!User || !password){
        return res.status(401).json({
            success:false,
            message:"please fill information correctly"
        })
    }
    const JWT_CODE = process.env.JWTCODE
    const isCheck = await bcrypt.compare(password,User.password)
    const payload = {
        email:User.email,
        password:User.password,
        id:User._id,
        role:User.role
    }
    if(isCheck){

        const token = jwt.sign(payload,JWT_CODE, { expiresIn: '100h' })
        User = User.toObject()
        User.token = token
        User.password = undefined
        const options = {
            httpOnly:true,
            secure:true
        }
        res.cookie("token",token,options).json({
            success:true,
            token,
            User,
            message:"user login successfully",
        })



       
    }
    else{
        res.status(402).json({
            success:false,
            message:"password is incorrect"
        })
    }

}

module.exports = {
    sigin,
    login
}



