
/**
 * Database management module for CRM system
 * Handles loading and saving data from the modals to a JSON file
 */

// Database structure
let database = {
  owners: [],
  groups: [],
  bookmakers: []
};

// Initialize the database
function initDatabase() {
  console.log("Inicializando banco de dados...");
  try {
    // Começar com um banco de dados vazio e então carregar do arquivo
    database = {
      owners: [],
      groups: [],
      bookmakers: []
    };
    
    console.log("Banco de dados inicializado:", {
      message: "Banco de dados inicializado com sucesso"
    });
    
    return {
      message: "Banco de dados inicializado com sucesso",
      data: database
    };
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    return {
      message: "Erro ao inicializar banco de dados",
      error: error.message
    };
  }
}

// Load database from file
async function loadDatabase() {
  try {
    const response = await fetch('database.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    database = data;
    
    console.log("Dados carregados:", {
      owners: database.owners.length,
      groups: database.groups.length,
      bookmakers: database.bookmakers.length
    });
    
    return {
      message: "Banco de dados carregado com sucesso",
      data: database
    };
  } catch (error) {
    console.error("Erro ao carregar banco de dados do arquivo:", error);
    console.log("Inicializando banco de dados vazio...");
    
    // Se o arquivo não existir ou tiver erro, inicializa vazio
    initDatabase();
    
    return {
      message: "Erro ao carregar banco de dados do arquivo, inicializando vazio",
      data: database
    };
  }
}

// Save database to file
async function saveDatabase() {
  try {
    // Verificar dados antes de salvar
    console.log("Tentando salvar dados:", {
      owners: database.owners.length,
      groups: database.groups.length,
      bookmakers: database.bookmakers.length
    });
    
    // Create a payload that will be sent to the server
    const payload = JSON.stringify(database, null, 2);
    
    // Save to server using fetch
    const response = await fetch('/save-database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
    }
    
    const result = await response.json();
    
    console.log("Banco de dados salvo com sucesso:", result);
    
    // Verificar se o salvamento realmente funcionou
    await loadDatabase();
    
    return {
      message: "Banco de dados salvo com sucesso",
      result
    };
  } catch (error) {
    console.error("Erro ao salvar banco de dados no arquivo:", error);
    alert("Erro ao salvar dados: " + error.message);
    
    return {
      message: "Erro ao salvar banco de dados no arquivo",
      error: error.message
    };
  }
}

// Owner management
function addOwner(ownerData) {
  database.owners.push(ownerData);
  console.log("Adicionando owner:", ownerData);
  console.log("Total de owners agora:", database.owners.length);
  const result = saveDatabase();
  return ownerData;
}

function updateOwner(ownerId, ownerData) {
  console.log("Atualizando owner:", ownerId, ownerData);
  const index = database.owners.findIndex(owner => owner.id === ownerId);
  if (index !== -1) {
    database.owners[index] = { ...database.owners[index], ...ownerData };
    console.log("Owner atualizado:", database.owners[index]);
    const result = saveDatabase();
    return database.owners[index];
  }
  console.error("Owner não encontrado para atualização:", ownerId);
  return null;
}

function deleteOwner(ownerId) {
  const index = database.owners.findIndex(owner => owner.id === ownerId);
  if (index !== -1) {
    const deleted = database.owners.splice(index, 1)[0];
    saveDatabase();
    return deleted;
  }
  return null;
}

function getOwners() {
  return database.owners;
}

// Group management
function addGroup(groupData) {
  database.groups.push(groupData);
  saveDatabase();
  return groupData;
}

function updateGroup(groupId, groupData) {
  const index = database.groups.findIndex(group => group.id === groupId);
  if (index !== -1) {
    database.groups[index] = { ...database.groups[index], ...groupData };
    saveDatabase();
    return database.groups[index];
  }
  return null;
}

function deleteGroup(groupId) {
  const index = database.groups.findIndex(group => group.id === groupId);
  if (index !== -1) {
    const deleted = database.groups.splice(index, 1)[0];
    saveDatabase();
    return deleted;
  }
  return null;
}

function getGroups() {
  return database.groups;
}

// Bookmaker management
function addBookmaker(bookmakerData) {
  database.bookmakers.push(bookmakerData);
  saveDatabase();
  return bookmakerData;
}

function updateBookmaker(bookmakerId, bookmakerData) {
  const index = database.bookmakers.findIndex(bookmaker => bookmaker.id === bookmakerId);
  if (index !== -1) {
    database.bookmakers[index] = { ...database.bookmakers[index], ...bookmakerData };
    saveDatabase();
    return database.bookmakers[index];
  }
  return null;
}

function deleteBookmaker(bookmakerId) {
  const index = database.bookmakers.findIndex(bookmaker => bookmaker.id === bookmakerId);
  if (index !== -1) {
    const deleted = database.bookmakers.splice(index, 1)[0];
    saveDatabase();
    return deleted;
  }
  return null;
}

function getBookmakers() {
  return database.bookmakers;
}

// Export all functions
window.db = {
  init: initDatabase,
  load: loadDatabase,
  save: saveDatabase,
  owners: {
    add: addOwner,
    update: updateOwner,
    delete: deleteOwner,
    getAll: getOwners
  },
  groups: {
    add: addGroup,
    update: updateGroup,
    delete: deleteGroup,
    getAll: getGroups
  },
  bookmakers: {
    add: addBookmaker,
    update: updateBookmaker,
    delete: deleteBookmaker,
    getAll: getBookmakers
  },
  getData: () => database
};

// Initialize database when script loads
document.addEventListener('DOMContentLoaded', function() {
  initDatabase();
  loadDatabase();
});
