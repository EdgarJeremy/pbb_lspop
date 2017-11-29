/**
 * App dependencies & setups
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * Routers
 */
const api = require("./routers/api");
app.use("/api",api);

app.get("/",function(req,res){
    res.json("Hello");
});






/**
 * Fire!!!!1!!1!!
 */
app.listen(3000,function(){
    console.log(`Server listened on port 3000`);
});