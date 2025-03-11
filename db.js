
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
  console.log("Initializing database...");
  try {
    // Try to load data from localStorage first (for backward compatibility)
    const ownersData = localStorage.getItem('owners') ? JSON.parse(localStorage.getItem('owners')) : [];
    const groupsData = localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')) : [];
    const bookmakersData = localStorage.getItem('bookmakers') ? JSON.parse(localStorage.getItem('bookmakers')) : [];
    
    // Update the database with any existing data
    database.owners = ownersData;
    database.groups = groupsData;
    database.bookmakers = bookmakersData;
    
    console.log("Database initialized with data from localStorage:", {
      owners: database.owners.length,
      groups: database.groups.length,
      bookmakers: database.bookmakers.length
    });
    
    // Save to file to ensure file is up to date
    saveDatabase();
    
    return {
      message: "Database initialized successfully",
      data: database
    };
  } catch (error) {
    console.error("Error initializing database:", error);
    return {
      message: "Error initializing database",
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
    
    // Also update localStorage for backward compatibility
    localStorage.setItem('owners', JSON.stringify(database.owners));
    localStorage.setItem('groups', JSON.stringify(database.groups));
    localStorage.setItem('bookmakers', JSON.stringify(database.bookmakers));
    
    console.log("Database loaded successfully:", {
      owners: database.owners.length,
      groups: database.groups.length,
      bookmakers: database.bookmakers.length
    });
    
    return {
      message: "Database loaded successfully",
      data: database
    };
  } catch (error) {
    console.error("Error loading database from file:", error);
    console.log("Using data from memory or initializing empty database...");
    
    // If the file doesn't exist or has an error, try to use localStorage
    initDatabase();
    
    return {
      message: "Error loading database from file, using localStorage instead",
      data: database
    };
  }
}

// Save database to file
async function saveDatabase() {
  try {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Also update localStorage for backward compatibility
    localStorage.setItem('owners', JSON.stringify(database.owners));
    localStorage.setItem('groups', JSON.stringify(database.groups));
    localStorage.setItem('bookmakers', JSON.stringify(database.bookmakers));
    
    console.log("Database saved successfully:", result);
    
    return {
      message: "Database saved successfully",
      result
    };
  } catch (error) {
    console.error("Error saving database to file:", error);
    
    // Fallback to localStorage if fetch fails
    localStorage.setItem('owners', JSON.stringify(database.owners));
    localStorage.setItem('groups', JSON.stringify(database.groups));
    localStorage.setItem('bookmakers', JSON.stringify(database.bookmakers));
    
    console.log("Data saved to localStorage as fallback");
    
    return {
      message: "Error saving database to file, using localStorage instead",
      error: error.message
    };
  }
}

// Owner management
function addOwner(ownerData) {
  database.owners.push(ownerData);
  saveDatabase();
  return ownerData;
}

function updateOwner(ownerId, ownerData) {
  const index = database.owners.findIndex(owner => owner.id === ownerId);
  if (index !== -1) {
    database.owners[index] = { ...database.owners[index], ...ownerData };
    saveDatabase();
    return database.owners[index];
  }
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
