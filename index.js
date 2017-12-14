/**
 * App dependencies & setups
 */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const session = require("express-session");
const pdf = require("express-pdf");
const PORT = 3001;
const ALLOW_ORIGIN = [
    "http://localhost",
    "http://localhost:3000",
    "http://118.97.134.116:3000",
    "http://36.67.90.85:3000",
    "http://192.168.100.102:3000",
    "http://192.168.137.1:3000",
    "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({
    origin: function(origin,cb){
        if(ALLOW_ORIGIN.indexOf(origin) !== -1 || !origin) {
            cb(null,true);
        } else {
            cb(new Error(`Akses dari domain ${origin} ditolak!`));
        }
    },
    credentials: true
}));
app.use(session({
    secret: "sherlocked221b#$;",
    cookie: {
        maxAge: 3600000
    },
    resave: true,
    saveUninitialized: false
}));
app.use(pdf);
// app.use(express.static(path.resolve(__dirname,"client","build")));

/**
 * Routers
 */
const api = require("./routers/api");
const admin = require("./routers/admin_api");
app.use("/api",api);
app.use("/administrator",admin);

/**
 * Serve client
 */
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"client","build","index.html"));
// });

/**
 * Fire!!!!1!!1!!
 */
app.listen(PORT,function(){
    console.log(`Server listened on port ${PORT}`);
});