//This will populate the profile page with appropriate data
"use strict";

let pName = undefined
let pPoints = undefined
let pDepartment = undefined
let pAccess = undefined
let pEmployee = undefined
let pPosition = undefined

pName = document.getElementById("profileName")
pPoints = document.getElementById("profilePoints")
pDepartment = document.getElementById("profileDepartment")
pAccess = document.getElementById("profileAccess")
pEmployee = document.getElementById("profileEmployee")
pPosition = document.getElementById("profilePosition")

document.addEventListener('DOMContentLoaded', function () {
    //A function to find the user data
    
} );
app.get('/profileinfo', (req, res) => {
    // activeuserid should store the current user's id
    let sql = 'SELECT * FROM activeusers WHERE empid in ';
    sql = sql + "(" + activeuserid + ")"
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch profile info:', err);
            res.status(500).send('An error occurred fetching information');
            return;
        }
        res.json(results);
    });
});