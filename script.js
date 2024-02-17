document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('loginButton')) {
        document.getElementById('loginButton').addEventListener('click', function() {
            document.getElementById('loginForm').style.display = 'block';
            document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = 'none');
            document.getElementById('backArrow').style.display = 'flex';
        });
    }

    if (document.getElementById('createAccountButton')) {
        document.getElementById('createAccountButton').addEventListener('click', function () {
            document.getElementById('createAccountForm').style.display = 'block';
            document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = 'none');
            document.getElementById('backArrow').style.display = 'flex';
        });
    }

    if (document.getElementById('backArrow')) {
        document.getElementById('backArrow').addEventListener('click', function() {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('createAccountForm').style.display = 'none';
            document.querySelectorAll('.action-buttons button, .divider').forEach(element => element.style.display = '');
            document.getElementById('backArrow').style.display = 'none';
        });
    }

    // function definitions for loginFormSubmitHandler and createAccountFormSubmitHandler
    if (document.querySelector('#loginForm form')) {
        document.querySelector('#loginForm form').addEventListener('submit', function(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Failed to login');
                }
            })
            .then(data => {
                console.log(data);
                const email = formData.get('email');
                localStorage.setItem('userEmail', email);
                window.location.href = 'user_home.html'; // Ensure this path is correct
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed. Please check your credentials and try again.');
            });
        });
    }

    if (document.querySelector('#createAccountForm form')) {
        document.querySelector('#createAccountForm form').addEventListener('submit', function (event) {
            event.preventDefault();
            const form = event.target;
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
                .then(response => {
                    if (!response.ok) throw new Error('Failed to create account');
                    return response.text(); // Assuming the response is text indicating success
                })
                .then(data => {
                    console.log(data);
                    // Update localStorage with the new user's email
                    localStorage.setItem('userEmail', jsonData.email);
                    alert('Account created successfully');
                    window.location.href = 'user_home.html';
                })
                .catch(error => {
                    console.error('Error creating account:', error);
                    alert('Error creating account. Please try again.');
                });
        });
    }

    if (window.location.pathname.endsWith('/profile.html')) {
        fetchAndDisplayUserProfile();
    }
});

function fetchAndDisplayUserProfile() {
    console.log('Fetching user profile...');
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        console.error('User email not found');
        return;
    }

    console.log(`Found email: ${userEmail}`);
    fetch(`/profile?email=${encodeURIComponent(userEmail)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }
        return response.json();
    })
    .then(userData => {
        console.log('User data:', userData);
        const userProfileDiv = document.getElementById('userProfile');
        userProfileDiv.innerHTML = `
            <p>Username: ${userData.username}</p>
            <p>Name: ${userData.firstName} ${userData.lastName}</p>
            <p>Email: ${userData.email}</p>
            <p>Department: ${userData.department}</p>
            <p>Position: ${userData.positionTitle}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
}

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
