document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'adminhomescreen.html';
});

// Example user data
const users = [
    { firstName: 'Alice', lastName: 'Johnson', empID: '1001', department: 'HR', points: 120 },
    { firstName: 'Bob', lastName: 'Smith', empID: '1002', department: 'Engineering', points: 150 },
    // Add more users here
];

// Function to populate the user list
function populateUserList(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the list
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `${user.firstName} ${user.lastName} - Points: ${user.points}`;
        userList.appendChild(userItem);
    });
}

// Function to apply filter and sorting
function applyFilter() {
    let filterInput = document.getElementById('filterInput').value.toLowerCase();
    let sortSelect = document.getElementById('sortSelect').value;
    let filteredUsers = users.filter(user => user.firstName.toLowerCase().includes(filterInput) ||
                                              user.lastName.toLowerCase().includes(filterInput) ||
                                              user.empID.includes(filterInput) ||
                                              user.department.toLowerCase().includes(filterInput));
    // Sort based on the selected attribute
    filteredUsers.sort((a, b) => (a[sortSelect] > b[sortSelect]) ? 1 : -1);
    populateUserList(filteredUsers);
}

// Initially populate the list with all users
window.onload = () => {
    populateUserList(users);
};
