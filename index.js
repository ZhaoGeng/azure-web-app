const express = require('express');
const app = express();
const port = process.env.PORT || 3000


app.get('/', (req,res)=>res.send("Hello World,  my web host name is " + process.env.APP_HOST_NAME || " not defined "));


app.listen(port, ()=>console.log("server is running on port" + port))
