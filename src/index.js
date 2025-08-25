require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {OtpRouter} = require("./Routes/OtpRoutes")
const {AuthRouter} = require("./Routes/AuthRoutes")


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api", OtpRouter)
app.use("/api", AuthRouter)



mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connected")
    app.listen(process.env.PORT, () => {
        console.log("Server Running")
    })
})
.catch(() => {
    console.log("DB Connection Failed")
})











