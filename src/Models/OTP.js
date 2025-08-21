const mongoose = require("mongoose")
const validator = require("validator")

const otpSchema = mongoose.Schema({
    otp : {
        type : String,
        required : true,
        minLength : 6,
        trim : true
    },
    mail : {
        type : String,
        required : true,    
        validate : function(val)
        {
            const isMailValid = validator.isEmail(val)
            if(!isMailValid)
            {
                throw new Error("Please Enter a valid email")
            }
        }
    },
    createdAt : {
        type : String,
        expires : 60 * 2
    }
})



const OTP = mongoose.model("otp", otpSchema)


module.exports = {
    OTP
}