const express = require("express")
const router = express.Router()
const validator = require("validator")
const { VerfiedMail } = require("../Models/VerifiedMail")
const { User } = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") 

router.post("/auth/signup", async(req, res) => {
    try {
        const{firstName, lastName, username, mail, password, dateOfBirth, gender} = req.body
        if(!firstName || !lastName || !username || !mail || !password || !dateOfBirth || !gender)
        {
            throw new Error("Please enter all the required fields")
        }
        const foundVerifiedMail = await VerfiedMail.findOne({mail})
        if(!foundVerifiedMail)
        {
            throw new Error("Please verify your mail first")
        }
        // const isAlreadyUser = await User.find({
        //     $or : [
        //         {mail},
        //         {username}
        //     ]
        // })
        // if(isAlreadyUser.length > 0)
        // {
        //     throw new Error("Username / Email already exists")   // break the above query in two separate parts
        // }
        const isPasswordStrong = validator.isStrongPassword(password)
        if(!isPasswordStrong)
        {
            throw new Error("Please enter a strong password")
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            firstName, lastName, mail, password : hashedPassword, username, dateOfBirth, gender
        })
        res.status(201).json({msg : "done"})
    } catch (error) {
        res.status(400).json({"error" : error.message})
    }
})

router.post("/auth/signin", async(req, res) => {
    try {
        const{username, password, mail} = req.body 
        const foundUser = await User.findOne({
            $or : [
                {username},
                {mail}
            ]
        }).populate("posts")
        if(!foundUser)
        {
            throw new Error("User does not exist")
        }
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if(!isPasswordCorrect)
        {
            throw new Error("Invalid Credentials")
        }
        const token = jwt.sign({_id : foundUser._id}, process.env.JWT_SECRET, {expiresIn : "1d"})
        res.cookie("token", token)
        res.status(200).json({msg : "User logged in", data : {
            firstName : foundUser.firstName,
            lastName : foundUser.lastName,
            mail : foundUser.mail,
            username : foundUser.username,
            gender : foundUser.gender,
            dateOfBirth : foundUser.dateOfBirth,
            bio : foundUser.bio,
            posts : foundUser.posts,
            followers : foundUser.followers,
            following : foundUser.following,
            blocked : foundUser.blocked,
            isPrivate : foundUser.isPrivate,
            profilePicture : foundUser.profilePicture,
        }})


    } catch (error) {
        res.status(400).json({"error" : error.message})
    }
})

router.post("/auth/logout", async(req, res) => {
    res.status(200).cookie("token", null).json({"msg" : "User logged Out"})
})




module.exports = {
    AuthRouter : router
}