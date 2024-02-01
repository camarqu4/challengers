document.getElementById('loginButton').addEventListener('click', function () {
    // Show the login form
    document.getElementById('loginForm').style.display = 'block';
    // Hide all initial action buttons and the divider
    document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = 'none');
    // Show the back arrow
    document.getElementById('backArrow').style.display = 'flex';
});

document.getElementById('createAccountButton').addEventListener('click', function () {
    // Show the create account form
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
