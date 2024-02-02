<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Additional Details</title>
    <link rel="stylesheet" href="style.css"> <!--  path to style.css  -->
</head>
<body>
<div class="full-screen-container">
    <div class="form-container" style="margin-top: 50px;">
        <h2>Additional Details</h2>
        <form action="submit_details.php" method="POST" class="details-form">
            <input type="hidden" name="username" required> <!-- Adjust if you're handling username in different way -->
            <input type="hidden" name="email" required> <!-- Adjust if you're handling email in  different way -->
            <input type="hidden" name="password" required> <!-- Adjust if you're handling password in  different way -->
            <input type="text" id="firstName" name="firstName" placeholder="First Name" required><br>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required><br>
            <input type="text" id="companyName" name="companyName" placeholder="Company Name" required><br>
            <input type="text" id="department" name="department" placeholder="Department" required><br>
            <input type="text" id="positionTitle" name="positionTitle" placeholder="Position Title" required><br>
            <button type="submit" class="submit-details">Create Account</button>
        </form>
        <?php
        if (isset($_SESSION['message'])) {
            $message_type = $_SESSION['message_type'] === "success" ? "success-class" : "error-class"; // Replace 'success-class' and 'error-class' with your actual CSS classes
            echo "<div class='{$message_type}'>{$_SESSION['message']}</div>";
            unset($_SESSION['message']);
            unset($_SESSION['message_type']);
        }
        ?>
    </div>
</div>
</body>
</html>