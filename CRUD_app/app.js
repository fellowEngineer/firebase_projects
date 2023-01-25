const express = require ("express");
const bodyParser =  require ("body-parser");
const db = require ("./js_assets/db_config");
// const db_data = require("./js_assets/getData");



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
}).post("/signin", async (req, res) => {
    const user = {
        email: req.body.inputEmail,
        password: req.body.inputPassword,
    };
    // console.log(user);

    try{

        if((user.email != undefined) && (user.password != undefined))
        {
            const uRef = db.collection("users").doc(user.email);
            const response = await uRef.get();
            const uData = response.data();
            // console.log(uData);

            if((uData.email == user.email) && (uData.password == user.password))
            {
                res.render("user_data", {uData: uData});
            }
            else
            {
                res.redirect("/")
            }
        }
        else
        {
            res.render("signin");
        }

    }
    catch(e){
        console.log("error from /signin --> " + e);
        res.render("signin");
    }
})




app.get("/signup", (req, res) => {
    res.render("signup");
}).post("/signup", async (req, res) => {
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
        await db.collection("users").doc(user.email).set(user);
    }
    catch (e){
        console.log("error form /signin --> " + e);
    }

    res.redirect("/");
})



app.get("/update",  (req, res) => {
    res.render("update");
}).post("/update", async (req, res) => {
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
        res.render("update");
    }

    try{
        if((user.email != undefined) && (user.password != undefined))
        {
            const uRef = db.collection("users").doc(user.email);
            const response = await uRef.get();
            const uData = response.data();
            // console.log(uData);

            if((uData.email == user.email) && (uData.password == user.password))
            {
                uRef.update(user)
                res.render("user_data", {uData: uData});
            }
            else
            {
                res.render("update");
            }
        }
        else
        {
            res.render("update");
        }

    }
    catch(e){
        console.log("error from /signin --> " + e);
        res.render("update");
    }
})



app.get("/delete", (req, res) => {
    res.render("delete");
}).post("/delete", async (req, res) => {

    const user = {
        email: req.body.inputEmail,
        password: req.body.inputPassword,
    };
    // console.log(user);

    try{

        if((user.email != undefined) && (user.password != undefined))
        {
            const uRef = db.collection("users").doc(user.email);
            const response = await uRef.get();
            const uData = response.data();
            // console.log(uData);

            if((uData.email == user.email) && (uData.password == user.password))
            {
                uRef.delete();
                res.redirect("/");
            }
            else
            {
                res.render("delete");
            }
        }
        else
        {
            res.render("delete");
        }

    }
    catch(e){
        console.log("error from /signin --> " + e);
        res.render("delete");
    }
})




app.get("/showall", async (req, res) => {
    
    try{
        const userRef = await db.collection("users").get();
        const uData = [];
        userRef.forEach(e => {
            uData.push(e.data());
        })
        console.log(uData);
        res.render("showall", {uData: uData});
    }
    catch(e){
        console.log("error from /showall --> " + e);
        res.redirect("/");
    }
})
{/* <li class="nav-item">
    <a class="nav-link" href="/showall">showall</a>
</li> */}





app.listen(process.env.PORT || 4000, () => {
    console.log("server is running on PORT 4000.... \n");
})