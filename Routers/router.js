const express = require("express");
const router = express.Router();
const {login,sigin} = require("../Controllers/Auth")
const {auth,isStudent,isAdmin}  = require("../middlewares/auth_middle")

router.post("/sigin", sigin);
router.post("/login", login);


router.get("/auth",auth,(req,res)=>{
    res.send("successfull testing done for auth")
})
router.get("/student",auth,isStudent,(req,res)=>{
    res.send("successfull testing done for student")
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.send("successfull testing done for admin")
})
module.exports = router;






