const express = requier("express");
const bodyParser = require("body-parser");


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());












app.get("/", (req, res) => {
    res.render("home");
})
.get("/signin", (req, res) => {
    res.render("signin");
})
.post("/signin", (req, res) => {
    
})
.get("/signup", (req, res) => {
    res.render("signup");
})
.post("/signup", (req, res) => {
    
})
.get("/showall", (req, res) => {
    res.render("showall");
})














app.listen(process.env.PORT || 4000, () => {
    console.log("Server is running on Port 4000");
})