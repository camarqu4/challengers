// Mock data
const activeUsers = [{ empId: '123', email: 'jane.doe@example.com' }];
const accountRequests = [
    { name: 'John Doe', empId: '456', email: 'john.doe@example.com' },
    { name: 'Jane Doe', empId: '123', email: 'jane.doe@example.com' }
];

function displayRequests() {
    const requestsList = document.getElementById('requestsList');
    accountRequests.forEach((request, index) => {
        const isFlagged = activeUsers.some(user => user.empId === request.empId || user.email === request.email);
        const requestElement = document.createElement('div');
        requestElement.innerHTML = `
            <p>${request.name} ${isFlagged ? '<span class="flagged">(Flagged)</span>' : ''}</p>
            <button onclick="approveRequest(${index})">Approve</button>
            <button onclick="denyRequest(${index})">Deny</button>
        `;
        requestsList.appendChild(requestElement);
    });
}

function approveRequest(index) {
    alert(`Approved: ${accountRequests[index].name}`);
    // Here, you'd normally call a backend service to update the request status.
}

function denyRequest(index) {
    alert(`Denied: ${accountRequests[index].name}`);
    // Similar to approve, you'd call a backend service here.
}

document.getElementById('backToMain').addEventListener('click', function() {
    window.location.href = 'adminhomescreen.html';
});

displayRequests();
