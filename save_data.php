<?php
// Set the correct file path as requested.
$file_path = 'Online-Classes-2025-26/saved_form_data.txt';

// Check if the form was submitted using the POST method.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize all input fields from the form to prevent security issues.
    // If a field is not set, it defaults to 'N/A'.
    $fullName = isset($_POST['fullName']) ? htmlspecialchars(trim($_POST['fullName'])) : 'N/A';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'N/A';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : 'N/A';
    $grade = isset($_POST['grade']) ? htmlspecialchars(trim($_POST['grade'])) : 'N/A';
    $parentName = isset($_POST['parentName']) ? htmlspecialchars(trim($_POST['parentName'])) : 'N/A';
    $address = isset($_POST['address']) ? htmlspecialchars(trim($_POST['address'])) : 'N/A';
    $topics = isset($_POST['topics']) ? htmlspecialchars(trim($_POST['topics'])) : 'N/A';

    // Format the data to be saved, including a timestamp.
    $timestamp = date("Y-m-d H:i:s");
    $data_to_save = "Time: " . $timestamp . "
";
    $data_to_save .= "Full Name: " . $fullName . "
";
    $data_to_save .= "Email: " . $email . "
";
    $data_to_save .= "Phone: " . $phone . "
";
    $data_to_save .= "Grade: " . $grade . "
";
    $data_to_save .= "Parent/Guardian Name: " . $parentName . "
";
    $data_to_save .= "Address: " . $address . "
";
    $data_to_save .= "Topics of Interest: " . $topics . "
";
    $data_to_save .= "------------------------------
";

    // Write the data to the file, appending it and locking the file during the write.
    $result = file_put_contents($file_path, $data_to_save, FILE_APPEND | LOCK_EX);

    // Provide feedback to the user based on whether the write was successful.
    if ($result !== false) {
        echo "<h1>Success!</h1>";
        echo "<p>Your data has been saved successfully.</p>";
    } else {
        echo "<h1>Error!</h1>";
        echo "<p>Could not save data. Check server file permissions.</p>";
    }

} else {
    // Prevent direct access to the script.
    echo "Access denied: This script is only for processing form submissions.";
}
?>
