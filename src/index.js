require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {OtpRouter} = require("./Routes/OtpRoutes")
const {AuthRouter} = require("./Routes/AuthRoutes")
const {PostRouter} = require("./Routes/PostRoutes")
const {FollowReqRouter} = require("./Routes/FollowReqRoutes")
const {CommentRouter} = require("./Routes/CommentsRouter")


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api", OtpRouter)
app.use("/api", AuthRouter)
app.use("/api", PostRouter)
app.use("/api", FollowReqRouter)
app.use("/api", CommentRouter)



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











