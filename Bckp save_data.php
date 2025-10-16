<?php
$file_path = 'Online-Classes-2025-26/saved_form_entries.txt';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize all input fields from the form
    $fullName = isset($_POST['fullName']) ? htmlspecialchars(trim($_POST['fullName'])) : 'N/A';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'N/A';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : 'N/A';
    $grade = isset($_POST['grade']) ? htmlspecialchars(trim($_POST['grade'])) : 'N/A';
    $parentName = isset($_POST['parentName']) ? htmlspecialchars(trim($_POST['parentName'])) : 'N/A';
    $address = isset($_POST['address']) ? htmlspecialchars(trim($_POST['address'])) : 'N/A';
    $topics = isset($_POST['topics']) ? htmlspecialchars(trim($_POST['topics'])) : 'N/A';

    // Format data with timestamp
    $timestamp = date("Y-m-d H:i:s");
    $data_to_save = "Time: " . $timestamp . "\n";
    $data_to_save .= "Full Name: " . $fullName . "\n";
    $data_to_save .= "Email: " . $email . "\n";
    $data_to_save .= "Phone: " . $phone . "\n";
    $data_to_save .= "Grade: " . $grade . "\n";
    $data_to_save .= "Parent/Guardian Name: " . $parentName . "\n";
    $data_to_save .= "Address: " . $address . "\n";
    $data_to_save .= "Topics of Interest: " . $topics . "\n";
    $data_to_save .= "------------------------------\n";

    // Write the data to file
    $result = file_put_contents($file_path, $data_to_save, FILE_APPEND | LOCK_EX);

    if ($result !== false) {
        echo "<h1>Success!</h1>";
        echo "<p>Your data has been saved successfully.</p>";
    } else {
        echo "<h1>Error!</h1>";
        echo "<p>Could not save data. Check server file permissions.</p>";
    }

} else {
    echo "Access denied: This script is only for processing form submissions.";
}
?>
