<?php
session_start(); // Start the session at the beginning

// Database connection parameters
$host = '107.180.1.16';
$dbName = 'spring2024team1';
$user = 'spring2024team1';
$pass = 'spring2024team1';

// Create new connection
$conn = new mysqli($host, $user, $pass, $dbName);

// Check new connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($stmt->execute()) {
    $_SESSION['message'] = "Account created successfully!";
    $_SESSION['message_type'] = "success"; //  to style the message (e.g., green for success)
} else {
    $_SESSION['message'] = "Error: " . $stmt->error;
    $_SESSION['message_type'] = "error"; // Use this to style the message (e.g., red for error)
}

header("Location: create_account_details.html"); // Redirect back to the form or to a confirmation page
exit();
?>