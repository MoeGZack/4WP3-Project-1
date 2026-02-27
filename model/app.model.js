const sqlite3 = require("sqlite3").verbose();
const { get } = require("node:http");
const sqlite = require("sqlite");

let db;

async function dbconn() {
    db = await sqlite.open({
        
        filename: "gym.db",
        driver: sqlite3.Database    
    });
    await db.exec("PRAGMA foreign_keys = ON");
    console.log("Connected to database");
    
}


async function getmember({first_name="", last_name="", phone=""}) {
    const first=  `%${first_name}%`;
    const last= `%${last_name}%`;
    const ph= `%${phone}%`;

    return await db.get(
        `SELECT * FROM members 
         WHERE (?= '' OR first_name LIKE ?)
         AND (?= '' OR last_name LIKE ?)
         AND (?= '' OR phone LIKE ?)`,
        first_name, first,
        last_name, last,
        phone, ph
        
    );
    
}

async function getAllMembers()
{
  const results = await db.all("SELECT rowid, * FROM members");
  return results;
}

async function addMember(first_name, last_name, phone, membership_plan, status) {
    await db.run(
        `INSERT INTO members (first_name, last_name, phone, membership_plan, status)
         VALUES (?, ?, ?, ?, ?)`,
         first_name, last_name, phone, membership_plan, status
    );
}

async function deleteMember(member_id) {
    await db.run("DELETE FROM members WHERE member_id = ?", member_id);
}

async function updateMember(member_id, first_name, last_name, phone, membership_plan, status) {

await db.run(
    `UPDATE members 
     SET first_name = ?, last_name = ?, phone = ?, membership_plan = ?, status = ?
     WHERE member_id = ?`,
     first_name, last_name, phone, membership_plan, status, member_id
);
}


module.exports = {
    
    dbconn,
    getmember,
    getAllMembers,
    deleteMember,
    updateMember,
    addMember

    
}