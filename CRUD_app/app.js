const express = require ("express");
const bodyParser =  require ("body-parser");
const { db } = require ("./db_config");

// const admin = require("firebase-admin");
// const serviceAccount = require("./service_key.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// })

// const db = admin.firestore();



const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/", (req, res) => {
    res.render("home");
})


app.get("/signin", (req, res) => {
    res.render("signin");
})
app.post("/signin", (req, res) => {
    res.render("signin");
})



app.get("/signup", (req, res) => {
    res.render("signup");
})
app.post("/signup", (req, res) => {
    res.render("signup");
})



app.get("/update", (req, res) => {
    res.render("update");
})
app.post("/update", (req, res) => {
    res.render("update");
})



app.get("/delete", (req, res) => {
    res.render("delete");
})
app.post("/delete", (req, res) => {
    res.render("delete");
})




app.get("/showall", (req, res) => {
    res.redirect("/");
})




app.listen(process.env.PORT || 4000, () => {
    console.log("server is running on PORT 4000.... \n");
})