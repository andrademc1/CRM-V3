
// database.js - Gerencia o armazenamento local de dados

// Definindo constantes para as chaves do localStorage
const DATABASE_KEYS = {
  OWNERS: 'crm_owners',
  GROUPS: 'crm_groups',
  BOOKMAKERS: 'crm_bookmakers'
};

// Tornando DATABASE_KEYS acessível globalmente
window.DATABASE_KEYS = DATABASE_KEYS;

// Função para inicializar o banco de dados local
function initDatabase() {
  try {
    // Verificar se os dados já existem, caso contrário inicializar
    if (!localStorage.getItem(window.DATABASE_KEYS.OWNERS)) {
      localStorage.setItem(window.DATABASE_KEYS.OWNERS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(window.DATABASE_KEYS.GROUPS)) {
      localStorage.setItem(window.DATABASE_KEYS.GROUPS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(window.DATABASE_KEYS.BOOKMAKERS)) {
      localStorage.setItem(window.DATABASE_KEYS.BOOKMAKERS, JSON.stringify([]));
    }
    
    // Verificar se os dados estão em formatos válidos
    try {
      JSON.parse(localStorage.getItem(window.DATABASE_KEYS.OWNERS));
      JSON.parse(localStorage.getItem(window.DATABASE_KEYS.GROUPS));
      JSON.parse(localStorage.getItem(window.DATABASE_KEYS.BOOKMAKERS));
    } catch (parseError) {
      console.error("Erro ao analisar dados existentes, resetando...", parseError);
      localStorage.setItem(window.DATABASE_KEYS.OWNERS, JSON.stringify([]));
      localStorage.setItem(window.DATABASE_KEYS.GROUPS, JSON.stringify([]));
      localStorage.setItem(window.DATABASE_KEYS.BOOKMAKERS, JSON.stringify([]));
    }
    
    console.log("Banco de dados inicializado:", { message: "Banco de dados inicializado com sucesso" });
    return true;
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    return { error: "Erro ao configurar banco de dados" };
  }
}

// Funções para manipular os owners
function saveOwners(ownersData) {
  try {
    if (!Array.isArray(ownersData)) {
      console.error("Dados de owners inválidos:", ownersData);
      return false;
    }
    localStorage.setItem(window.DATABASE_KEYS.OWNERS, JSON.stringify(ownersData));
    console.log("Owners salvos com sucesso:", ownersData.length);
    return true;
  } catch (error) {
    console.error("Erro ao salvar owners:", error);
    return false;
  }
}

function getOwners() {
  try {
    const owners = localStorage.getItem(window.DATABASE_KEYS.OWNERS);
    const parsedData = owners ? JSON.parse(owners) : [];
    console.log("Owners recuperados do localStorage:", parsedData.length);
    return parsedData;
  } catch (error) {
    console.error("Erro ao recuperar owners:", error);
    return [];
  }
}

// Funções para manipular os groups
function saveGroups(groupsData) {
  try {
    if (!Array.isArray(groupsData)) {
      console.error("Dados de groups inválidos:", groupsData);
      return false;
    }
    localStorage.setItem(window.DATABASE_KEYS.GROUPS, JSON.stringify(groupsData));
    console.log("Groups salvos com sucesso:", groupsData.length);
    return true;
  } catch (error) {
    console.error("Erro ao salvar groups:", error);
    return false;
  }
}

function getGroups() {
  try {
    const groups = localStorage.getItem(window.DATABASE_KEYS.GROUPS);
    const parsedData = groups ? JSON.parse(groups) : [];
    console.log("Groups recuperados do localStorage:", parsedData.length);
    return parsedData;
  } catch (error) {
    console.error("Erro ao recuperar groups:", error);
    return [];
  }
}

// Funções para manipular os bookmakers
function saveBookmakers(bookmakersData) {
  try {
    if (!Array.isArray(bookmakersData)) {
      console.error("Dados de bookmakers inválidos:", bookmakersData);
      return false;
    }
    
    // Verificar se os dados são válidos antes de salvar
    const validData = bookmakersData.filter(item => item && typeof item === 'object');
    
    // Salvar no localStorage com stringify melhorado
    const jsonData = JSON.stringify(validData);
    localStorage.setItem(DATABASE_KEYS.BOOKMAKERS, jsonData);
    
    // Verificar se os dados foram realmente salvos
    const savedData = localStorage.getItem(DATABASE_KEYS.BOOKMAKERS);
    console.log("Bookmakers salvos com sucesso:", validData.length);
    console.log("Dados no localStorage após salvar:", savedData ? savedData.substring(0, 50) + "..." : "vazio");
    
    return true;
  } catch (error) {
    console.error("Erro ao salvar bookmakers:", error);
    return false;
  }
}

function getBookmakers() {
  try {
    const bookmakers = localStorage.getItem(DATABASE_KEYS.BOOKMAKERS);
    
    if (!bookmakers) {
      console.log("Nenhum dado de bookmakers encontrado no localStorage");
      return [];
    }
    
    try {
      const parsedData = JSON.parse(bookmakers);
      if (!Array.isArray(parsedData)) {
        console.error("Dados de bookmakers no localStorage não são um array");
        return [];
      }
      
      console.log("Bookmakers recuperados do localStorage:", parsedData.length);
      return parsedData;
    } catch (parseError) {
      console.error("Erro ao fazer parse dos dados de bookmakers:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Erro ao recuperar bookmakers:", error);
    return [];
  }
}

// Verificar se DB já existe antes de criar
if (typeof window.DB === 'undefined') {
  // Exportar funções para uso global
  window.DB = {
    init: initDatabase,
    owners: {
      save: saveOwners,
      get: getOwners
    },
    groups: {
      save: saveGroups,
      get: getGroups
    },
    bookmakers: {
      save: saveBookmakers,
      get: getBookmakers
    }
  };
}
