
const http = require('http');

const PORT = 3000;

// Create HTTP Server
const server = http.createServer((req, res) => {

    // Route 1: GET /
    if (req.method === 'GET' && req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
        });

        res.end('Hello World! Welcome to Node.js Server.');
    }

    // Route 2: GET /about
    else if (req.method === 'GET' && req.url === '/about') {

        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache',
            'X-Custom-Header': 'My Node.js Server'
        });

        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>About Page</title>
            </head>
            <body>
                <h1>About Us</h1>
                <p>This is a simple HTML page served using Node.js.</p>
                <p>Assignment 3 - Static File & Custom Header Server</p>
            </body>
            </html>
        `);
    }

    // Route 3: GET /info
    else if (req.method === 'GET' && req.url === '/info') {

        const info = {
            server: 'Node.js HTTP Server',
            method: req.method,
            url: req.url,
            httpVersion: req.httpVersion,
            userAgent: req.headers['user-agent'],
            date: new Date().toLocaleString()
        };

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });

        res.end(JSON.stringify(info, null, 2));
    }

    // Route 4: Handle all other routes
    else {

        res.writeHead(404, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
        });

        res.end('404 Not Found - The requested route does not exist.');
    }

});

// Start Server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Server Port: ${PORT}`);
});