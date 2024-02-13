document.getElementById('loginButton').addEventListener('click', function () {
    // Show login form
    document.getElementById('loginForm').style.display = 'block';
    // Hide all initial action buttons and the divider
    document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = 'none');
    // Show back arrow
    document.getElementById('backArrow').style.display = 'flex';
});

document.getElementById('createAccountButton').addEventListener('click', function () {
    // Show create account form
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

// Updated function to handle create account form submission
function redirectToHomePage() {
    const form = document.getElementById('createAccountForm').querySelector('form');
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Redirect to the user home page
            window.location.href = 'user_home.html';
        })
        .catch(error => console.error('Error:', error));
}

// Assuming you have a login form with an ID 'loginForm'
document.querySelector('#loginForm form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Add logic to validate the user's credentials here

    // Redirect to the user home page after login validation
    window.location.href = 'user_home.html';
});



// admin navigate to view user request page
document.getElementById('toRequestsPage').addEventListener('click', function() {
    window.location.href = 'requests.html';
});

// admin navigate to point balance page
document.getElementById('view-users').addEventListener('click', () => {
    window.location.href = 'point_balance.html';
});


// Example function to unlock an achievement
function unlockAchievement(achievementId) {
    // Logic to remove the achievement from the locked list
    // and add it to the unlocked list
}


// slider survey
document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    alert(JSON.stringify(formProps)); // Simplified without null
  });
  

  // ranking survey
  document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    alert(JSON.stringify(formProps)); // Alert the form data as a JSON string
  });
