import { express } from "express";
import { bodyParser } from "body-parser";
import { db } from "./db_config";



const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
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




app.listen(process.env.PORT || 4000, () => {
    console.log("server is running on PORT 4000.... \n");
})