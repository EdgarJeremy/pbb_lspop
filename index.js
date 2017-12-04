/**
 * App dependencies & setups
 */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const session = require("express-session");
const PORT = 3001;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(session({
    secret: "sherlocked221b#$;",
    cookie: {
        maxAge: 100000
    },
    resave: true,
    saveUninitialized: false
}));
app.use(express.static(path.resolve(__dirname,"client","build")));

/**
 * Routers
 */
const api = require("./routers/api");
app.use("/api",api);

/**
 * Serve client
 */
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"));
});

/**
 * Fire!!!!1!!1!!
 */
app.listen(PORT,function(){
    console.log(`Server listened on port ${PORT}`);
});