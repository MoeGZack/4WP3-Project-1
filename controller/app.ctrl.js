const express = require('express');
const app = express();
const mustacheExpress=require('mustache-express');
const port=3000;
const hostname="localhost";

const Model=require('../model/app.model.js');
app.engine('mustache', mustacheExpress());
app.set('views', __dirname + '/views');
app.set('view engine', 'mustache');


app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true })); 


async function main(){
    //await Model.makeConnection();

    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

main();
