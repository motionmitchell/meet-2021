var express = require("express");
const bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var app = express();
app.use(session({secret:'XASDASDA'}));
var ssn ;



app.get("/logout", (req, res)=>{
    ssn.user=null;
    res.redirect("/login");
});



const port = 4001;//process.env.PORT || 4000;
//console.log ("about to start");
app.listen(port, ()=>{
	console.log ("ok on port "+port);
});