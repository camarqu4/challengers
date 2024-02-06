document.getElementById('loginButton').addEventListener('click', function () {
    // Show  login form
    document.getElementById('loginForm').style.display = 'block';
    // Hide all initial action buttons and the divider
    document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = 'none');
    // Show  back arrow
    document.getElementById('backArrow').style.display = 'flex';
});

document.getElementById('createAccountButton').addEventListener('click', function () {
    // Show  create account form
    document.getElementById('createAccountForm').style.display = 'block';
    // Hide all initial action buttons and the divider
    document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = 'none');
    // Show the back arrow
    document.getElementById('backArrow').style.display = 'flex';
});

document.getElementById('backArrow').addEventListener('click', function () {
    // Hide both forms
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('createAccountForm').style.display = 'none';
    // Show all initial action buttons and the divider
    document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = '');
    // Hide the back arrow
    document.getElementById('backArrow').style.display = 'none';
});

function redirectToHomePage(event) {
    event.preventDefault(); // Prevent the default form submission

    //will add add logic to process the data

    // Redirect to the create_account_details.html page
    window.location.href = 'user_home.html';
}

// Assuming you have a login form with an ID 'loginForm'
document.querySelector('#loginForm form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    //will add  logic to validate the user's credentials

    // Redirect to the user home page
    window.location.href = 'user_home.html';
});

// Example function to unlock an achievement
function unlockAchievement(achievementId) {
    // Logic to remove the achievement from the locked list
    // and add it to the unlocked list
}

// Database Connection 
// TODO: Alter connection to link to our current database
/* var MySql = {
    _internalCallback : function() { console.log("Callback not set")},
    Execute: async function (Host, Username, Password, Database, Sql, Callback) {
        MySql._internalCallback = Callback;
        var strSrc = "https://mysql.cloud.wpcarey.asu.edu/api/babyNames/raw/";  CHANGE THIS URL
        strSrc += "?sql=" + Sql;
        strSrc += "&Callback=MySql._internalCallback";
        console.log("Connecting to mysql.cloud.wpcarey.asu.edu..."); 
	console.log("strSrc: ", strSrc)
        
        // querying the db
        try {
            let resp = await fetch(strSrc);
            if (!resp.ok) {
                throw new Error("HTTP error, status code = " + resp.status + '. ' + resp.Error);
            }
            let json = await resp.json();
            console.log(`Query successful: ${json.Success}`);
            console.log(`Query result: ${JSON.stringify(json.Result)}`);
            if (!json.Success) {
                console.log(`Error: ${json.Error}`)
            } 
            MySql._internalCallback(json);
        } catch (error) {
            alert(error);
        }
    }
}; */

/* Query String format. use as a base when creating a search
function updateQueryString() {
    queryString = 

      "SELECT name, number, state, sex, year \n" 
    + "FROM   NamesNumberByStateYear \n"
    + "WHERE\n "
    + " state = "    + "'" + state   + "'"
    + " AND sex = "  + "'" + sex     + "'"
    + " AND year = " + "'" + year    + "'\n"
    + "ORDER BY number DESC LIMIT 5;"
    document.getElementById('queryStingId').innerHTML = queryString;
    } */

/* Run query format, updated to use our login name and password
    function runQuery() {
        MySql.Execute(
            "107.180.1.16",	// mySQL server
            "spring2024team1", 				// login name
            "spring2024team1", 			// login password
            "spring2024team1", 			// database to use
                                    // SQL query string:
            queryString,
            function (data) {
                processQueryResult(data);
            }
        );
    } */