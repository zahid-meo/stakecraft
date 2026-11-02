<?php
/**
 * Muhammad Zahid - Portfolio Contact Form API Handler
 * Handles AJAX requests, validates user inputs, and saves inquiries to an SQLite database.
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// Read raw JSON input or fallback to standard form POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Extract and sanitize fields
$name    = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email   = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$subject = isset($data['subject']) ? trim(strip_tags($data['subject'])) : 'General Inquiry';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

// Validation
$errors = [];

if (empty($name) || mb_strlen($name) < 2) {
    $errors[] = 'Please provide your full name (at least 2 characters).';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (empty($message) || mb_strlen($message) < 5) {
    $errors[] = 'Please enter a message of at least 5 characters.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors),
        'errors'  => $errors
    ]);
    exit;
}

// Database Persistence (SQLite)
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$dbPath = $dataDir . '/messages.db';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create table if it does not exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS contact_inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Insert record
    $stmt = $pdo->prepare("
        INSERT INTO contact_inquiries (name, email, subject, message, ip_address, user_agent)
        VALUES (:name, :email, :subject, :message, :ip, :ua)
    ");

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? 'UNKNOWN';

    $stmt->execute([
        ':name'    => $name,
        ':email'   => $email,
        ':subject' => $subject,
        ':message' => $message,
        ':ip'      => $ip,
        ':ua'      => $ua
    ]);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => "Thank you, {$name}! Your message has been received successfully. Muhammad Zahid will get back to you shortly."
    ]);
} catch (Exception $e) {
    // Fallback: If SQLite fails, log to text file
    $logFile = $dataDir . '/messages.log';
    $logEntry = sprintf(
        "[%s] IP: %s | Name: %s | Email: %s | Subject: %s | Message: %s\n",
        date('Y-m-d H:i:s'),
        $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN',
        $name,
        $email,
        $subject,
        str_replace(["\r", "\n"], ' ', $message)
    );
    @file_put_contents($logFile, $logEntry, FILE_APPEND);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => "Thank you, {$name}! Your message has been saved successfully. Muhammad Zahid will get back to you shortly."
    ]);
}
