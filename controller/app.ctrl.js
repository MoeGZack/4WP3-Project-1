const express = require('express');
const app = express();
const mustacheExpress=require('mustache-express');
const port=3000;
const hostname="localhost";

const Model=require('../model/app.model.js');
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/../views");
app.get("/", async (req, res) => {
    res.render("main");
});


app.use(express.static(__dirname+'/../public'));
app.use(express.urlencoded({ extended: true })); 


app.post("/searchmember", async (req, res) => {
        
    //const SearchTerm = req.body.searchReq;

    const member = await Model.getmember(req.body);
    
    if (!member) {
        return res.render ("main",{
            message: "No member found with the provided information.",
            member:{}
        });
    } 

    res.render("main", {
        message: "Member found:",
        member,
        isBasic: member.membership_plan === "Basic",
        isIntermediate: member.membership_plan === "Intermediate",
        isUltra: member.membership_plan === "Ultra",
        isActive:member.status === "Active",
        isHold: member.status === "Hold",
        isCancelled: member.status === "Cancelled"
    });
    });

app.post("/findall", async (req, res) => {
    const members = await Model.getAllMembers();
    res.render("main", { 
        message: "All Members Found",
        members,
        member:{} });
});

app.post("/action", async (req, res) => {
    const { action, member_id } = req.body;

    if (action === "deleteMember") {
        await Model.deleteMember(member_id);
        res.redirect("/");
    }
    if (action === "editmember") {
        await Model.updateMember(member_id);
        res.render("main", { member_id });
    }
    if (action === "AddMember") {
        res.render("add");
    }
});

async function main(){
    await Model.dbconn();

    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

main();
