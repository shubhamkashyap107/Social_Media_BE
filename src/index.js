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
const {ProfileRouter} = require("./Routes/ProfileRouter")

app.set("trust proxy", 1)
app.use(cors(
    {
        origin : process.env.ORIGIN,
        credentials : true
    }
))
// app.use(express.json())
app.use(cookieParser())
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/api", OtpRouter)
app.use("/api", AuthRouter)
app.use("/api", PostRouter)
app.use("/api", FollowReqRouter)
app.use("/api", CommentRouter)
app.use("/api", ProfileRouter)



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











