ocument.addEventListener('DOMContentLoaded', function() {
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

    if (document.querySelector('#loginForm form')) {
        document.querySelector('#loginForm form').addEventListener('submit', function(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            console.log("Before login fetch")

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
            .then(response => {

                console.log("After the login query")

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
        document.querySelector('#createAccountForm form').addEventListener('submit', function(event) {
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
                window.location.href = 'user_home.html'; // Redirect to user homepage
            })
            .catch(error => {
                console.error('Error creating account:', error);
                alert('Error creating account. Please try again.');
            });
        });
    }

    if (window.location.pathname.endsWith('/profile.html')) {
        fetchAndDisplayUserProfile(); // Call the function to display user profile
    }

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
        /* const userProfileDiv = document.getElementById('userProfile');
        userProfileDiv.innerHTML = `
            <p>Username: ${userData.username}</p>
            <p>Name: ${userData.firstName} ${userData.lastName}</p>
            <p>Email: ${userData.email}</p>
            <p>Department: ${userData.department}</p>
            <p>Position: ${userData.positionTitle}</p>
        `; */
        //Finding each of the profile divs, and updating their innerText
        let pName = document.getElementById("profileName")
        let pPoints = document.getElementById("profilePoints")
        let pDepartment = document.getElementById("profileDepartment")
        let pAccess = document.getElementById("profileAccess")
        let pEmployee = document.getElementById("profileEmployee")
        let pPosition = document.getElementById("profilePosition")

        pNameString = "Welcome " + userData.firstName + " " + userData.lastName
        pPointsString = "Current Point Total: " + userData.points
        pDepartmentString = "Department: " + userData.department
        //Access hard coded as employee, not sure where this information is stored currently
        pAccessString = "Access Level:  " + "Employee" //userData.access
        pEmployeeString = "Empolyee ID:  " + userData.id
        pPositionString = "Position Title: " + userData.positionTitle

        pName.innerText  = pNameString
        pPoints.innerText  = pPointsString
        pDepartment.innerText = pDepartmentString
        pAccess.innerText  = pAccessString
        pEmployee.innerText  = pEmployeeString
        pPosition.innerText = pPositionString
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
}

// admin navigate to view user request page
document.getElementById('toRequestsPage').addEventListener('click', function() {
    window.location.href = 'adminrequest.html';
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




// admin edit users function
document.addEventListener('DOMContentLoaded', function() {
    loadUsers(); // Simulate loading users from a source
});

function loadUsers() {
    const users = [
        { empID: '1', name: 'Alice', department: 'IT', points: 120, accessType: 'admin' },
        { empID: '2', name: 'Bob', department: 'HR', points: 105, accessType: 'user' },
        // Add more users as needed
    ];

    const userList = document.getElementById('userList');
    users.sort((a, b) => a.name.localeCompare(b.name)).forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.department}`;
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() { openEditModal(user); };
        li.appendChild(editBtn);
        userList.appendChild(li);
    });
}

function searchUsers() {
    const input = document.getElementById('userSearch');
    const filter = input.value.toUpperCase();
    const ul = document.getElementById('userList');
    const li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        let txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function openEditModal(user) {
    const modal = document.getElementById('editUserModal');
    modal.style.display = 'block';
    document.getElementById('name').value = user.name;
    document.getElementById('department').value = user.department;
    document.getElementById('points').value = user.points;
    document.getElementById('accessType').value = user.accessType;

    const span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function confirmEdit() {
    // Implement save logic here, possibly sending the data back to the server
    alert('Changes saved successfully.');
    document.getElementById('editUserModal').style.display = 'none';
}


// matching company values game
document.addEventListener('DOMContentLoaded', function() {
    let selectedValue = null;

    document.querySelectorAll('#values .item').forEach(button => {
        button.addEventListener('click', function() {
            // Clear previous selections
            if (selectedValue) {
                selectedValue.classList.remove('selected');
            }
            this.classList.add('selected');
            selectedValue = this;
        });
    });

    document.querySelectorAll('#definitions .item').forEach(definition => {
        definition.addEventListener('click', function() {
            if (!selectedValue) {
                return; // No value selected
            }

            if (selectedValue.dataset.match === this.dataset.match) {
                this.style.backgroundColor = '#90ee90'; // Light green for correct match
                selectedValue.disabled = true; // Disable the button to prevent re-selection
                selectedValue = null; // Reset selection
                updateResult('Correct match!');
            } else {
                this.style.backgroundColor = '#ffcccb'; // Light red for incorrect match
                selectedValue.classList.remove('selected');
                updateResult('Try again.');
            }
        });
    });

    function updateResult(message) {
        document.getElementById('result').textContent = message;
    }
});


// awards user 10 points after each survey is complete
document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
  
    awardPoints(10); // Award 10 points to the user
  
    // Redirect to surveys.html after awarding points
    window.location.href = 'surveys.html';
  });
  
  function awardPoints(points) {
    // Example using localStorage for simplicity
    //let currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
    //localStorage.setItem('userPoints', currentPoints + points);
  
    //alert(`Awarded ${points} points! Total now is ${currentPoints + points}.`);

    //Adding points to the user profile
    fetch(`/addpoints?email=${encodeURIComponent(userEmail)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }
        return response.json();
    })
    .then(userData => {
        alert(`Awarded ${points} points!`);
    })
  
    // The redirection will happen after the alert is acknowledged.

    // Needs to connect to the fetch(/addpoints) server endpoint
  }
  
