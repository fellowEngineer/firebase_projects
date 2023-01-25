const express = require ("express");
const bodyParser =  require ("body-parser");
const db = require ("./db_config");



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
app.post("/signin", async (req, res) => {
    let u_data = req.body;
    const user = {
        email: u_data.inputEmail,
        password: u_data.inputPassword,
    };

    try{

        if((user.email != undefined) && user.password != undefined)
        {
            const uData = (await db.collection("user").doc(user.email).get()).data();
            if((uData.email == user.email) && (uData.password == user.password))
            {
                res.render("user_data", {uData: uData});
            }
            else
            {
                res.redirect("/")
            }
        }

    }
    catch(e){
        console.log("error from /signin --> " + e);
    }



    res.render("signin");
})



app.get("/signup", (req, res) => {
    res.render("signup");
})
app.post("/signup", async (req, res) => {
    let u_data = req.body;
    const user = {
        username: u_data.username,
        email: u_data.inputEmail,
        password: u_data.inputPassword,
        mobile: u_data.mobileNumber,
        gender: u_data.gender,
        nickname: u_data.nickname
    };

    if(user.email == undefined)
    {
        console.log("email is not provided");
        res.render("signup");
    }

    try{
        // console.log(user);
        const response = await db.collection("users").doc(user.email).set(user);
        console.log(response);
    }
    catch (e){
        console.log("error form /signin --> " + e);
    }

    res.redirect("/");
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