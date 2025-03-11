
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

// Rota para criar as tabelas (inicialização)
app.post('/api/setup', async (req, res) => {
  try {
    // Verificar conexão com o banco de dados
    await pool.query('SELECT NOW()');
    
    // Criar tabela de países se não existir
    await query(`
      CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(2) NOT NULL UNIQUE,
        continent VARCHAR(50),
        flag VARCHAR(10),
        capital VARCHAR(100),
        languages TEXT[],
        currency VARCHAR(50)
      )
    `);
    
    // Criar tabela de owners
    await query(`
      CREATE TABLE IF NOT EXISTS owners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(50),
        logo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Criar tabela de groups
    await query(`
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        website VARCHAR(255),
        logo_url TEXT,
        owner_id INTEGER REFERENCES owners(id),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Criar tabela de bookmakers
    await query(`
      CREATE TABLE IF NOT EXISTS bookmakers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        website VARCHAR(255),
        logo_url TEXT,
        group_id INTEGER REFERENCES groups(id),
        status VARCHAR(20) DEFAULT 'active',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    res.json({ message: 'Banco de dados inicializado com sucesso' });
  } catch (err) {
    console.error('Erro ao configurar banco de dados:', err);
    res.status(500).json({ error: 'Erro ao configurar banco de dados: ' + err.message });
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

// Rota para salvar owner
app.post('/api/owners', async (req, res) => {
  const { name, email, phone, logo_url } = req.body;
  
  try {
    const result = await query(
      'INSERT INTO owners (name, email, phone, logo_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, logo_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar owner:', err);
    res.status(500).json({ error: 'Erro ao adicionar owner: ' + err.message });
  }
});

// Rota para obter todos os owners
app.get('/api/owners', async (req, res) => {
  try {
    const result = await query('SELECT * FROM owners ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar owners:', err);
    res.status(500).json({ error: 'Erro ao buscar owners: ' + err.message });
  }
});

// Rota para salvar group
app.post('/api/groups', async (req, res) => {
  const { name, website, logo_url, owner_id, description } = req.body;
  
  try {
    const result = await query(
      'INSERT INTO groups (name, website, logo_url, owner_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, website, logo_url, owner_id, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar grupo:', err);
    res.status(500).json({ error: 'Erro ao adicionar grupo: ' + err.message });
  }
});

// Rota para obter todos os grupos
app.get('/api/groups', async (req, res) => {
  try {
    const result = await query(`
      SELECT g.*, o.name as owner_name 
      FROM groups g 
      LEFT JOIN owners o ON g.owner_id = o.id 
      ORDER BY g.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar grupos:', err);
    res.status(500).json({ error: 'Erro ao buscar grupos: ' + err.message });
  }
});

// Rota para salvar bookmaker
app.post('/api/bookmakers', async (req, res) => {
  const { name, website, logo_url, group_id, status, description } = req.body;
  
  try {
    const result = await query(
      'INSERT INTO bookmakers (name, website, logo_url, group_id, status, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, website, logo_url, group_id, status || 'active', description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar bookmaker:', err);
    res.status(500).json({ error: 'Erro ao adicionar bookmaker: ' + err.message });
  }
});

// Rota para obter todos os bookmakers
app.get('/api/bookmakers', async (req, res) => {
  try {
    const result = await query(`
      SELECT b.*, g.name as group_name 
      FROM bookmakers b 
      LEFT JOIN groups g ON b.group_id = g.id 
      ORDER BY b.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar bookmakers:', err);
    res.status(500).json({ error: 'Erro ao buscar bookmakers: ' + err.message });
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
    
    // Verifica se a tabela existe, se não, cria
    await query(`
      CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(2) NOT NULL UNIQUE,
        continent VARCHAR(50),
        flag VARCHAR(10),
        capital VARCHAR(100),
        languages TEXT[],
        currency VARCHAR(50)
      )
    `);
    
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
          Array.isArray(country.languages) ? country.languages : [country.languages], 
          country.currency
        ]
      );
      insertedCount++;
    }
    
    res.json({ message: `${insertedCount} países importados com sucesso` });
  } catch (err) {
    console.error('Erro ao importar países:', err);
    res.status(500).json({ error: 'Erro ao importar países: ' + err.message });
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
