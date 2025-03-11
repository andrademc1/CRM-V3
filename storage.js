
// Módulo para gerenciar o armazenamento de dados (owners, groups, bookmakers)
const StorageManager = {
    // Chaves para o localStorage
    KEYS: {
        OWNERS: 'owners',
        GROUPS: 'groups',
        BOOKMAKERS: 'bookmakers',
        ALL_DATA: 'appData'
    },
    
    // Salvar um item individual
    saveItem: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`Dados salvos com sucesso em ${key}:`, data.length || Object.keys(data).length);
            return true;
        } catch (error) {
            console.error(`Erro ao salvar em ${key}:`, error);
            return false;
        }
    },
    
    // Obter um item
    getItem: function(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            if (!data) return defaultValue;
            
            try {
                return JSON.parse(data);
            } catch (jsonError) {
                console.error(`Erro ao fazer parse JSON de ${key}:`, jsonError);
                localStorage.removeItem(key); // Remove dados inválidos
                return defaultValue;
            }
        } catch (error) {
            console.error(`Erro ao recuperar dados de ${key}:`, error);
            return defaultValue;
        }
    },
    
    // Salvar todos os dados
    saveAllData: function(data) {
        console.log("Salvando todos os dados...");
        
        try {
            // Salvar individualmente para compatibilidade com código existente
            this.saveItem(this.KEYS.OWNERS, data.owners || []);
            console.log("Owners salvos:", data.owners ? data.owners.length : 0);
            
            this.saveItem(this.KEYS.GROUPS, data.groups || []);
            console.log("Groups salvos:", data.groups ? data.groups.length : 0);
            
            // Verificar bookmakers antes de salvar
            const bookmakers = data.bookmakers || [];
            console.log("Bookmakers para salvar:", bookmakers.length);
            
            // Filtrar bookmakers inválidos
            const validBookmakers = bookmakers.filter(bm => bm && bm.id);
            console.log("Bookmakers válidos:", validBookmakers.length);
            
            this.saveItem(this.KEYS.BOOKMAKERS, validBookmakers);
            console.log("Bookmakers salvos com sucesso:", validBookmakers.length);
            
            // Salvar tudo em uma única entrada para maior eficiência
            this.saveItem(this.KEYS.ALL_DATA, data);
            
            console.log("Dados no localStorage após salvar:", 
                JSON.stringify(this.getItem(this.KEYS.ALL_DATA)).substring(0, 5) + "...");
                
            return true;
        } catch (error) {
            console.error("Erro ao salvar todos os dados:", error);
            return false;
        }
    },
    
    // Carregar todos os dados
    loadAllData: function() {
        // Tentar carregar da entrada unificada primeiro
        const allData = this.getItem(this.KEYS.ALL_DATA);
        if (allData && Object.keys(allData).length > 0) {
            return allData;
        }
        
        // Caso contrário, carregar individualmente
        return {
            owners: this.getItem(this.KEYS.OWNERS, []),
            groups: this.getItem(this.KEYS.GROUPS, []),
            bookmakers: this.getItem(this.KEYS.BOOKMAKERS, [])
        };
    },
    
    // Adicionar um novo item a uma coleção
    addItem: function(collectionKey, item) {
        const collection = this.getItem(collectionKey, []);
        
        // Verificar se já existe um item com mesmo ID
        const existingIndex = collection.findIndex(i => i.id === item.id);
        
        if (existingIndex >= 0) {
            // Atualizar item existente
            collection[existingIndex] = {...collection[existingIndex], ...item};
        } else {
            // Adicionar novo item
            if (!item.id) {
                item.id = Date.now().toString();
            }
            collection.push(item);
        }
        
        // Salvar coleção atualizada
        this.saveItem(collectionKey, collection);
        
        // Atualizar dados unificados
        const allData = this.loadAllData();
        allData[collectionKey.toLowerCase()] = collection;
        this.saveItem(this.KEYS.ALL_DATA, allData);
        
        return item;
    }
};

// Auto-salvamento periódico
setInterval(() => {
    if (window.appData) {
        console.log("Salvamento automático de dados...");
        StorageManager.saveAllData(window.appData);
    }
}, 30000); // A cada 30 segundos

// Exportar o módulo
window.StorageManager = StorageManager;
