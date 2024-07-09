const {Router} = require("express");
const router =Router();
const {signupUser,signinUser, updateUser} = require('../zod/validate')
const {User, Account} = require('../db');
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");

router.post("/signup",async(req,res)=>{
    console.log(req.body);
    const validate = signupUser.safeParse({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })
    if(!validate.success)
    {
        return res.status(411).send("Incorrect inputs");
    }
    const user = await User.findOne({username : req.body.username});
    if(user)
    {
        return res.status(411).json({
            message :"Username already taken"
        })
    }
    const newUser =await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })
    await Account.create({
        userId :newUser._id,
        balance : 1+Math.random()*100000
    })
    const token = jwt.sign({userId : newUser._id},JWT_SECRET);
    res.json({
            message : "User created succesfully",
            token: token
        });
})

router.post("/signin",async(req,res)=>{
    console.log(req.body)
    const validate = signinUser.safeParse({
        username : req.body.username,
        password : req.body.password,
    })
    if(!validate.success)
    {
        return res.status(411).send("Incorrect inputs");
    }
    const user = await User.findOne({username : req.body.username,password : req.body.password});
    if(!user)
    {
        return res.status(411).json({
            message : "Error while loggin in"
        })
    }
    const token = jwt.sign({userId : user._id},JWT_SECRET);
    res.json({
            token: token
        });
})

router.put("/",authMiddleware,async(req,res)=>{
    const {success} = updateUser.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({
            message : "Invalid data"
        })
    }
    const temp=await User.updateOne({_id :req.userId},req.body);
    console.log(temp);
    res.json({
        message : "Data updated successfully"
    })
    
})

router.get('/bulk',authMiddleware,async(req,res)=>{
    const filter=req.query.filter||"";
    const users = await User.find({
        $or: [
            { firstName: {
                "$regex":filter
            } },
            { lastName: {
                "$regex":filter
            } }
        ]
    });
    const list=users.map((user)=>{
        const data=user.toObject();
        delete data.__v;
        delete data.password;
        return data;
    })
    res.json({
        users : list
    });
})
module.exports = router