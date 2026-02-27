const express = require('express');
const app = express();
const mustacheExpress=require('mustache-express');
const port=3000;
const hostname="localhost";

const Model=require('../model/app.model.js');
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/../views");
app.get("/app", async (req, res) => {
    res.render("main");
});


app.use(express.static(__dirname+'/../public'));
app.use(express.urlencoded({ extended: true })); 



async function main(){
    await Model.dbconn();

    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

main();
