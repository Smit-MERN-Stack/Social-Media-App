import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import AuthRoute from "./Routes/AuthRoutes.js"
import UserRoute from "./Routes/UserRoutes.js"
const db = "mongodb+srv://user1:user1@cluster1.6qgk4mw.mongodb.net/SocialMediaApp?retryWrites=true&w=majority"
const app = express()


//middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Routes

app.use("/auth", AuthRoute)
app.use("/user", UserRoute)


app.get("/", (req, res) => {
    res.send("<h1><b><i>Social Media App Backend</i></b></h1>")
})

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}))

mongoose.connect(db, () => {
    console.log("db connected success 👌");
})

app.listen(8000, () => {
    console.log("Server started on port");
})