
// database.js - Gerencia o armazenamento local de dados

const DATABASE_KEYS = {
  OWNERS: 'crm_owners',
  GROUPS: 'crm_groups',
  BOOKMAKERS: 'crm_bookmakers'
};

// Função para inicializar o banco de dados local
function initDatabase() {
  try {
    // Verificar se os dados já existem, caso contrário inicializar
    if (!localStorage.getItem(DATABASE_KEYS.OWNERS)) {
      localStorage.setItem(DATABASE_KEYS.OWNERS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(DATABASE_KEYS.GROUPS)) {
      localStorage.setItem(DATABASE_KEYS.GROUPS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(DATABASE_KEYS.BOOKMAKERS)) {
      localStorage.setItem(DATABASE_KEYS.BOOKMAKERS, JSON.stringify([]));
    }
    
    // Verificar se os dados estão em formatos válidos
    try {
      JSON.parse(localStorage.getItem(DATABASE_KEYS.OWNERS));
      JSON.parse(localStorage.getItem(DATABASE_KEYS.GROUPS));
      JSON.parse(localStorage.getItem(DATABASE_KEYS.BOOKMAKERS));
    } catch (parseError) {
      console.error("Erro ao analisar dados existentes, resetando...", parseError);
      localStorage.setItem(DATABASE_KEYS.OWNERS, JSON.stringify([]));
      localStorage.setItem(DATABASE_KEYS.GROUPS, JSON.stringify([]));
      localStorage.setItem(DATABASE_KEYS.BOOKMAKERS, JSON.stringify([]));
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
    localStorage.setItem(DATABASE_KEYS.OWNERS, JSON.stringify(ownersData));
    return true;
  } catch (error) {
    console.error("Erro ao salvar owners:", error);
    return false;
  }
}

function getOwners() {
  try {
    const owners = localStorage.getItem(DATABASE_KEYS.OWNERS);
    return owners ? JSON.parse(owners) : [];
  } catch (error) {
    console.error("Erro ao recuperar owners:", error);
    return [];
  }
}

// Funções para manipular os groups
function saveGroups(groupsData) {
  try {
    localStorage.setItem(DATABASE_KEYS.GROUPS, JSON.stringify(groupsData));
    return true;
  } catch (error) {
    console.error("Erro ao salvar groups:", error);
    return false;
  }
}

function getGroups() {
  try {
    const groups = localStorage.getItem(DATABASE_KEYS.GROUPS);
    return groups ? JSON.parse(groups) : [];
  } catch (error) {
    console.error("Erro ao recuperar groups:", error);
    return [];
  }
}

// Funções para manipular os bookmakers
function saveBookmakers(bookmakersData) {
  try {
    // Verifica se os dados são válidos
    if (!bookmakersData || !Array.isArray(bookmakersData)) {
      console.error("Dados de bookmakers inválidos:", bookmakersData);
      return false;
    }
    
    console.log("Bookmakers para salvar:", bookmakersData.length);
    console.log("Bookmakers válidos:", bookmakersData.filter(b => b && b.id).length);
    
    // Salva no localStorage
    localStorage.setItem(DATABASE_KEYS.BOOKMAKERS, JSON.stringify(bookmakersData));
    
    // Verifica se o salvamento foi bem-sucedido
    const savedData = localStorage.getItem(DATABASE_KEYS.BOOKMAKERS);
    console.log("Bookmakers salvos com sucesso:", savedData ? JSON.parse(savedData).length : 0);
    console.log("Dados no localStorage após salvar:", savedData ? `${savedData.substring(0, 5)}...` : "nenhum");
    
    return true;
  } catch (error) {
    console.error("Erro ao salvar bookmakers:", error);
    return false;
  }
}

function getBookmakers() {
  try {
    const bookmakers = localStorage.getItem(DATABASE_KEYS.BOOKMAKERS);
    console.log("Bookmakers recuperados do localStorage:", bookmakers ? JSON.parse(bookmakers).length : 0);
    return bookmakers ? JSON.parse(bookmakers) : [];
  } catch (error) {
    console.error("Erro ao recuperar bookmakers:", error);
    return [];
  }
}

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
