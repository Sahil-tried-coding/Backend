const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // "Bearer" ke baad ka token

    // const { token } = req.body || req.cookie || req.header("authorization").replace("bearer ","");
    const { token } =  req.header("Authorization").replace("Bearer ","");



    if (!token) {
      res.status(403).json({
        success: false,
        message: "token is not fetched",
      });
    }

    try {
      let decode = jwt.verify(token, process.env.JWTCODE);
      req.User = decode;
      next()
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "can not verify token ",
        error,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

const isStudent = (req, res, next) => {
    try {
        
    if(req.User.role!=="Student"){
        res.status(401).json({
            success:false,
            message:"these is the proteced route for student"
        })
    }
    next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"something went wrong",error
        })
    }
};
const isAdmin = (req, res, next) => {
    try {
        
    if(req.User.role!=="Admin"){
        res.status(401).json({
            success:false,
            message:"these is the proteced route for admin"
        })
    }
    next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"something went wrong",error
        })
    }
};


module.exports={
    auth,
    isStudent,
    isAdmin
}