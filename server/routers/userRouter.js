const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

router.post("/", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const passwordVerify = req.body.passwordVerify;
        const countryOfResidence = req.body.countryOfResidence;
        const phoneNumber = req.body.phoneNumber;
        if(!email || !password || !passwordVerify || !countryOfResidence)
            return res.status(400).json({errorMessage:"Please enter all required fields"}).send();
        if(email.length<6 || !email.match(/\S+@\S+\.\S+/) || password.length<6 || password!==passwordVerify)
        {
            res.status(400).json({errorMessage: "Invalid form"}).send();
            return res.end();
        }
        if(phoneNumber.length>0)
            if(phoneNumber.length >15 || phoneNumber.length<4 || !phoneNumber.match(/^[0-9]+$/)) {
                res.status(400).json({errorMessage: "Invalid form"}).send();
                return res.end();
            }
        const saltRounds=10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(password,salt);
        const newUser = new User({
            email: email,
            passwordHash: hashedPass,
            countryOfResidence: countryOfResidence,
            phoneNumber:phoneNumber
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({
            user: savedUser._id,
        },
            process.env.JWT_SECRET
        );
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            expires: new Date("30d")
        }).send();

    }
    catch (err){
        console.error(err);
        res.status(500).send();
    }
})
router.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            res.status(400).json({errorMessage: "Please enter all required fields"}).send();
            return res.end();
        }
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            res.status(401).json({errorMessage: "Wrong email or password."}).send();
            return res.end();
        }
        const passwordCorrect = await bcrypt.compare(password,existingUser.passwordHash);
        if(!passwordCorrect){
            res.status(401).json({errorMessage: "Wrong email or password."}).send();
            return res.end();
        }
        const token = jwt.sign({
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            expires: new Date("30d")
        }).send();
    }
    catch (err){
        console.error(err);
        res.status(500).json({errorMessage:"Something went wrong"}).send();
    }
})

router.get("/logout",(req,res)=>{
    res.cookie("token","",{
        httpOnly: true,
        secure:true,
        sameSite:"none",
        expires: new Date()
    }).send();
})

router.get("/loggedIn", (req,res)=>
{
        try{
            const token = req.cookies.token;
            if(!token) {
               return res.json(false);
            }
            else {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                res.json(true);
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send();
        }
})
router.get("/usersearch", auth, async(req,res)=>{
    try{
        const users = await User.find({ _id: {$ne: req.user}})
        res.send(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

router.get("/:id", auth, async(req,res)=> {
    try{
        const userquery = await User.findById(req.params.id);
        if(userquery)
        {
            if(req.user != userquery._id) {
            const userres =
                {
                    email: userquery.email,
                    phoneNumber: userquery.phoneNumber,
                    countryOfResidence: userquery.countryOfResidence
                }
                res.json(userres);
            }
            else
                res.json(false);
        }
        else
            res.json(false);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
router.get("/", auth, async(req,res)=> {
    try{
        const userquery = await User.findById(req.user);
        if(userquery) {
            const userres =
                {
                    email: userquery.email,
                    phoneNumber: userquery.phoneNumber,
                    countryOfResidence: userquery.countryOfResidence
                }
            res.json(userres);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
})
router.put("/edit", auth, async(req,res)=> {
    try{
       let update = await User.findByIdAndUpdate(req.user, req.body, {new: true, upsert: true})
        if(update)
            res.status(200).send({message:"200"});
    }
    catch (err) {
        console.error(err);
        res.status(500).send({message:"500"});
    }
})

module.exports = router;