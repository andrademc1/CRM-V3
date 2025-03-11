
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('./'));

// Route handler for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback route handler for any other routes
app.use((req, res) => {
  const filePath = path.join(__dirname, req.url);
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('File not found');
      return;
    }
    
    // Determine content type
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpg';
        break;
    }
    
    // Read and send the file
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.status(500).send('Server Error: ' + error.code);
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });
});

// Error handling for port already in use
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Your app should be accessible via the "Open App" button in Replit`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use, trying ${PORT + 1}...`);
    // Try the next port
    app.listen(PORT + 1, '0.0.0.0', () => {
      console.log(`Server running at http://0.0.0.0:${PORT + 1}/`);
      console.log(`Your app should be accessible via the "Open App" button in Replit`);
    });
  } else {
    console.error('Server error:', e);
  }
});
