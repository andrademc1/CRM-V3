
const express = require('express');
const path = require('path');
const fs = require('fs');
const { query, pool } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Serve static files
app.use(express.static('./'));

// Route handler for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API para o banco de dados
app.get('/api/countries', async (req, res) => {
  try {
    const result = await query('SELECT * FROM countries');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar países:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar a tabela countries (inicialização)
app.post('/api/setup', async (req, res) => {
  try {
    // Criar tabela de países se não existir
    await query(`
      CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(2) NOT NULL,
        continent VARCHAR(50),
        flag VARCHAR(10),
        capital VARCHAR(100),
        languages TEXT[],
        currency VARCHAR(50)
      )
    `);
    res.json({ message: 'Banco de dados inicializado com sucesso' });
  } catch (err) {
    console.error('Erro ao configurar banco de dados:', err);
    res.status(500).json({ error: 'Erro ao configurar banco de dados' });
  }
});

// Rota para adicionar um país
app.post('/api/countries', async (req, res) => {
  const { name, code, continent, flag, capital, languages, currency } = req.body;
  
  try {
    const result = await query(
      'INSERT INTO countries (name, code, continent, flag, capital, languages, currency) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, code, continent, flag, capital, languages, currency]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar país:', err);
    res.status(500).json({ error: 'Erro ao adicionar país' });
  }
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

// Rota para importar países do arquivo countries.js
app.post('/api/import-countries', async (req, res) => {
  try {
    // Carrega o arquivo countries.js
    const countriesData = require('./countries.js');
    
    // Insere cada país no banco de dados
    let insertedCount = 0;
    for (const country of countriesData) {
      await query(
        'INSERT INTO countries (name, code, continent, flag, capital, languages, currency) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (code) DO NOTHING',
        [
          country.name, 
          country.code, 
          country.continent, 
          country.flag, 
          country.capital, 
          country.languages, 
          country.currency
        ]
      );
      insertedCount++;
    }
    
    res.json({ message: `${insertedCount} países importados com sucesso` });
  } catch (err) {
    console.error('Erro ao importar países:', err);
    res.status(500).json({ error: 'Erro ao importar países' });
  }
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
