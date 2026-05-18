const express = require("express");

const mongobd = require("./data/database");

const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongobd.initDb((err) =>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () =>(console.log(`Database is listening and node is Runing on port ${port}`)));
    }
})
app.listen(port, () => {console.log(`runing on port ${port}`)});
