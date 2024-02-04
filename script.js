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