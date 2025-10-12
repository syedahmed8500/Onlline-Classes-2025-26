<?php
// Define the name of the file where data will be saved
$file_path = 'saved_form_entries.txt';

// Check if the form was submitted via POST and the 'content' field exists
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['content'])) {
    
    // --- SECURITY WARNING & DATA PREPARATION ---
    // 1. Sanitize the input to prevent malicious code injection
    $user_input = htmlspecialchars($_POST['content']);
    
    // 2. Optional: Retrieve other fields (if you added them)
    // $user_name = isset($_POST['user_name']) ? htmlspecialchars($_POST['user_name']) : 'N/A';
    
    // 3. Format the data with a timestamp
    $timestamp = date("Y-m-d H:i:s");
    $data_to_save = "Time: " . $timestamp . "\n";
    // $data_to_save .= "User: " . $user_name . "\n";
    $data_to_save .= "Content: " . $user_input . "\n";
    $data_to_save .= "------------------------------\n"; // Separator

    // --- FILE WRITING PROCESS ---
    
    // The file_put_contents function is a simple way to write data.
    // 'FILE_APPEND' adds the new data to the end of the file.
    // 'LOCK_EX' prevents simultaneous writes from corrupting the file.
    $result = file_put_contents($file_path, $data_to_save, FILE_APPEND | LOCK_EX);

    if ($result !== false) {
        // Success: Redirect the user back or show a success message
        echo "<h1>Success!</h1>";
        echo "<p>Your data has been saved to " . $file_path . " on the server.</p>";
        // header("Location: index.html?status=success"); // Uncomment to redirect
    } else {
        // Failure: Usually a file permission issue
        echo "<h1>Error!</h1>";
        echo "<p>Could not save data. Check the server's write permissions on the file and directory.</p>";
    }

} else {
    // Handling for direct access or incomplete submission
    echo "Access denied: This script is only for processing form submissions.";
}
?>
