document.addEventListener('DOMContentLoaded', function() {
    const requestsList = document.getElementById('requestsList');

    // Example account requests data
    const accountRequests = [
        { id: 1, name: 'John Doe', status: 'pending' },
        { id: 2, name: 'Jane Doe', status: 'pending' }
    ];

    function updateRequestsList() {
        requestsList.innerHTML = ''; // Clear the list
        accountRequests.forEach(request => {
            const div = document.createElement('div');
            div.innerHTML = `<p>${request.name}</p>
                             <button onclick="approveRequest(${request.id})">Approve</button>
                             <button onclick="denyRequest(${request.id})">Deny</button>`;
            requestsList.appendChild(div);

            // If approved, show access type selection
            if (request.status === 'approved') {
                const select = document.createElement('select');
                select.innerHTML = `<option value="">Select Access Type</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>`;
                select.onchange = function() { setAccessType(request.id, this.value); };
                div.appendChild(select);
            }
        });
    }

    window.approveRequest = function(id) {
        const request = accountRequests.find(request => request.id === id);
        request.status = 'approved';
        updateRequestsList();
    };

    window.denyRequest = function(id) {
        const request = accountRequests.find(request => request.id === id);
        request.status = 'denied';
        // Optionally, remove the request from the list or mark it visibly as denied
        updateRequestsList();
        console.log(`Request ${id} denied.`);
        // Here, you would typically inform the server about the denial.
    };

    window.setAccessType = function(id, accessType) {
        console.log(`Access type for request ${id} set to ${accessType}.`);
        // Here, you would typically update the server with the new access type.
    };

    updateRequestsList();
});


// navigate back to admin home screen

document.getElementById('backToMain').addEventListener('click', () => {
    window.location.href = 'adminhomescreen.html';
});

