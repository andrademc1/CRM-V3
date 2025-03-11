
// Database.js - Sistema de persistência de dados usando localStorage

// Chaves para o localStorage
const KEYS = {
    OWNERS: 'bookmaker_owners',
    GROUPS: 'bookmaker_groups',
    BOOKMAKERS: 'bookmaker_bookmakers'
};

// Inicializar o banco de dados
function initDatabase() {
    try {
        // Verificar se as chaves já existem no localStorage, caso contrário, criar vazias
        if (!localStorage.getItem(KEYS.OWNERS)) {
            localStorage.setItem(KEYS.OWNERS, JSON.stringify([]));
        }
        
        if (!localStorage.getItem(KEYS.GROUPS)) {
            localStorage.setItem(KEYS.GROUPS, JSON.stringify([]));
        }
        
        if (!localStorage.getItem(KEYS.BOOKMAKERS)) {
            localStorage.setItem(KEYS.BOOKMAKERS, JSON.stringify([]));
        }
        
        console.log("Banco de dados inicializado:", { message: "Banco de dados inicializado com sucesso" });
        return true;
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
        return false;
    }
}

// Funções para salvar dados
function saveOwners(owners) {
    try {
        localStorage.setItem(KEYS.OWNERS, JSON.stringify(owners));
        console.log("Owners salvos:", owners.length);
        return true;
    } catch (error) {
        console.error("Erro ao salvar owners:", error);
        return false;
    }
}

function saveGroups(groups) {
    try {
        localStorage.setItem(KEYS.GROUPS, JSON.stringify(groups));
        console.log("Groups salvos:", groups.length);
        return true;
    } catch (error) {
        console.error("Erro ao salvar groups:", error);
        return false;
    }
}

function saveBookmakers(bookmakers) {
    try {
        // Verificar se bookmakers é um array válido
        if (!Array.isArray(bookmakers)) {
            console.error("Bookmakers não é um array válido:", bookmakers);
            return false;
        }
        
        // Filtrar objetos inválidos ou duplicados
        const validBookmakers = bookmakers.filter(b => b && b.id).reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        
        console.log("Bookmakers válidos:", validBookmakers.length);
        localStorage.setItem(KEYS.BOOKMAKERS, JSON.stringify(validBookmakers));
        console.log("Bookmakers salvos com sucesso:", validBookmakers.length);
        return true;
    } catch (error) {
        console.error("Erro ao salvar bookmakers:", error);
        return false;
    }
}

// Funções para carregar dados
function loadOwners() {
    try {
        const owners = JSON.parse(localStorage.getItem(KEYS.OWNERS) || '[]');
        console.log("Owners recuperados do localStorage:", owners.length);
        return owners;
    } catch (error) {
        console.error("Erro ao carregar owners:", error);
        return [];
    }
}

function loadGroups() {
    try {
        const groups = JSON.parse(localStorage.getItem(KEYS.GROUPS) || '[]');
        console.log("Groups recuperados do localStorage:", groups.length);
        return groups;
    } catch (error) {
        console.error("Erro ao carregar groups:", error);
        return [];
    }
}

function loadBookmakers() {
    try {
        const bookmakers = JSON.parse(localStorage.getItem(KEYS.BOOKMAKERS) || '[]');
        console.log("Bookmakers recuperados do localStorage:", bookmakers.length);
        return bookmakers;
    } catch (error) {
        console.error("Erro ao carregar bookmakers:", error);
        return [];
    }
}

// Função para carregar todos os dados
function loadAllData() {
    const owners = loadOwners();
    const groups = loadGroups();
    const bookmakers = loadBookmakers();
    
    console.log("Dados carregados:", {
        owners: owners.length,
        groups: groups.length,
        bookmakers: bookmakers.length
    });
    
    return {
        owners,
        groups,
        bookmakers
    };
}

// Função para salvar todos os dados
function saveAllData(owners, groups, bookmakers) {
    console.log("Salvando todos os dados...");
    
    const ownersResult = saveOwners(owners);
    const groupsResult = saveGroups(groups);
    const bookmakersResult = saveBookmakers(bookmakers);
    
    const allDataSaved = ownersResult && groupsResult && bookmakersResult;
    
    if (allDataSaved) {
        // Verificar se os dados foram realmente salvos
        console.log("Dados verificados no localStorage:", {
            owners: loadOwners().length,
            groups: loadGroups().length,
            bookmakers: loadBookmakers().length
        });
        console.log("Dados salvos com sucesso!");
    } else {
        console.error("Erro ao salvar todos os dados!");
    }
    
    return allDataSaved;
}

// Exportar funções
const database = {
    init: initDatabase,
    saveOwners,
    saveGroups,
    saveBookmakers,
    loadOwners,
    loadGroups,
    loadBookmakers,
    loadAllData,
    saveAllData
};

// Se estiver em um ambiente de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = database;
} else {
    // Se estiver no navegador, adicionar ao objeto window
    window.database = database;
}
