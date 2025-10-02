const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500; // Use port 5500 or environment variable

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the root URL to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Optional: Handle any other routes by serving index.html (for SPA-like behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server with error handling
const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Clean URL: http://localhost:5500 (no file extension)');
    console.log('Press Ctrl+C to stop the server');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
        const newPort = PORT + 1;
        const newServer = app.listen(newPort, () => {
            console.log(`Server is running at http://localhost:${newPort}`);
            console.log('Clean URL: http://localhost:5501 (no file extension)');
        });
    } else {
        console.error('Server error:', err);
    }
});
