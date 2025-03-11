
// Configuração global de dados da aplicação
window.appData = {
    owners: [],
    groups: [],
    bookmakers: []
};

// Inicializar banco de dados
function initDatabase() {
    try {
        // Carregar dados do localStorage
        const savedData = window.StorageManager.loadAllData();
        window.appData = savedData;
        
        console.log("Banco de dados inicializado:", {
            message: "Banco de dados inicializado com sucesso"
        });
        
        // Registro de dados carregados
        const counts = {
            owners: savedData.owners ? savedData.owners.length : 0,
            groups: savedData.groups ? savedData.groups.length : 0,
            bookmakers: savedData.bookmakers ? savedData.bookmakers.length : 0
        };
        
        console.log("Dados carregados:", counts);
        
        return savedData;
    } catch (error) {
        console.error("Erro ao inicializar banco de dados:", error);
        return { owners: [], groups: [], bookmakers: [] };
    }
}

// Função para atualizar tabelas de dados
function updateTables() {
    try {
        console.log("Atualizando tabelas com dados carregados:", {
            owners: window.appData.owners ? window.appData.owners.length : 0,
            groups: window.appData.groups ? window.appData.groups.length : 0,
            bookmakers: window.appData.bookmakers ? window.appData.bookmakers.length : 0
        });
        
        // Se estiver na página de bookmakers, atualizar as tabelas
        if (document.querySelector('.bookmakers-table')) {
            updateBookmakersTable();
        }
        
        // Se estiver na página de grupos, atualizar a tabela
        if (document.querySelector('.groups-table')) {
            updateGroupsTable();
        }
        
        // Se estiver na página de owners, atualizar a tabela
        if (document.querySelector('.owners-table')) {
            updateOwnersTable();
        }
    } catch (error) {
        console.error("Erro ao atualizar tabelas:", error);
    }
}

// Atualizar tabela de bookmakers
function updateBookmakersTable() {
    const table = document.querySelector('.bookmakers-table tbody');
    if (!table) return;
    
    console.log("Populando tabela de bookmakers:", window.appData.bookmakers ? window.appData.bookmakers.length : 0);
    
    // Limpar tabela
    table.innerHTML = '';
    
    // Verificar se há dados
    if (!window.appData.bookmakers || window.appData.bookmakers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center">Nenhum bookmaker encontrado</td>';
        table.appendChild(row);
        return;
    }
    
    // Preencher tabela com bookmakers
    window.appData.bookmakers.forEach(bookmaker => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bookmaker.name || 'N/A'}</td>
            <td>${bookmaker.status || 'N/A'}</td>
            <td>${bookmaker.owner ? bookmaker.owner.name : 'N/A'}</td>
            <td>${bookmaker.group ? bookmaker.group.name : 'N/A'}</td>
            <td>
                <button class="btn btn-sm edit-bookmaker" data-id="${bookmaker.id}">Editar</button>
                <button class="btn btn-sm delete-bookmaker" data-id="${bookmaker.id}">Excluir</button>
            </td>
        `;
        table.appendChild(row);
    });
    
    // Adicionar event listeners para botões
    addBookmakerButtonListeners();
}

// Atualizar tabela de grupos
function updateGroupsTable() {
    const table = document.querySelector('.groups-table tbody');
    if (!table) return;
    
    console.log("Populando tabela de grupos:", window.appData.groups ? window.appData.groups.length : 0);
    
    // Limpar tabela
    table.innerHTML = '';
    
    // Verificar se há dados
    if (!window.appData.groups || window.appData.groups.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" class="text-center">Nenhum grupo encontrado</td>';
        table.appendChild(row);
        return;
    }
    
    // Preencher tabela com grupos
    window.appData.groups.forEach(group => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${group.name || 'N/A'}</td>
            <td>${group.status || 'N/A'}</td>
            <td>${group.url || 'N/A'}</td>
            <td>
                <button class="btn btn-sm edit-group" data-id="${group.id}">Editar</button>
                <button class="btn btn-sm delete-group" data-id="${group.id}">Excluir</button>
            </td>
        `;
        table.appendChild(row);
    });
    
    // Adicionar event listeners para botões
    addGroupButtonListeners();
}

// Atualizar tabela de owners
function updateOwnersTable() {
    const table = document.querySelector('.owners-table tbody');
    if (!table) return;
    
    // Limpar tabela
    table.innerHTML = '';
    
    // Verificar se há dados
    if (!window.appData.owners || window.appData.owners.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3" class="text-center">Nenhum owner encontrado</td>';
        table.appendChild(row);
        return;
    }
    
    // Preencher tabela com owners
    window.appData.owners.forEach(owner => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${owner.name || 'N/A'}</td>
            <td>${owner.status || 'N/A'}</td>
            <td>
                <button class="btn btn-sm edit-owner" data-id="${owner.id}">Editar</button>
                <button class="btn btn-sm delete-owner" data-id="${owner.id}">Excluir</button>
            </td>
        `;
        table.appendChild(row);
    });
    
    // Adicionar event listeners para botões
    addOwnerButtonListeners();
}

// Adicionar listeners para botões de bookmaker
function addBookmakerButtonListeners() {
    // Botões de edição
    document.querySelectorAll('.edit-bookmaker').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editBookmaker(id);
        });
    });
    
    // Botões de exclusão
    document.querySelectorAll('.delete-bookmaker').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            deleteBookmaker(id);
        });
    });
}

// Adicionar listeners para botões de grupo
function addGroupButtonListeners() {
    // Botões de edição
    document.querySelectorAll('.edit-group').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editGroup(id);
        });
    });
    
    // Botões de exclusão
    document.querySelectorAll('.delete-group').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            deleteGroup(id);
        });
    });
}

// Adicionar listeners para botões de owner
function addOwnerButtonListeners() {
    // Botões de edição
    document.querySelectorAll('.edit-owner').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editOwner(id);
        });
    });
    
    // Botões de exclusão
    document.querySelectorAll('.delete-owner').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            deleteOwner(id);
        });
    });
}

// Salvar todos os dados
function saveAllData() {
    try {
        console.log("Salvando todos os dados...");
        
        // Salvar owners
        const ownersSaved = window.StorageManager.saveItem(window.StorageManager.KEYS.OWNERS, window.appData.owners || []);
        console.log("Owners salvos:", window.appData.owners ? window.appData.owners.length : 0);
        
        // Salvar grupos
        const groupsSaved = window.StorageManager.saveItem(window.StorageManager.KEYS.GROUPS, window.appData.groups || []);
        console.log("Groups salvos:", window.appData.groups ? window.appData.groups.length : 0);
        
        // Checar bookmakers antes de salvar
        const validBookmakers = window.appData.bookmakers ? 
            window.appData.bookmakers.filter(b => b && b.id) : [];
        console.log("Bookmakers salvos verificados:", validBookmakers.length);
        
        // Salvar bookmakers
        const bookmakersSaved = window.StorageManager.saveItem(window.StorageManager.KEYS.BOOKMAKERS, validBookmakers);
        console.log("Bookmakers salvos:", validBookmakers.length);
        
        // Salvar todos os dados unificados
        window.StorageManager.saveItem(window.StorageManager.KEYS.ALL_DATA, window.appData);
        
        console.log("Dados salvos com sucesso!");
        return ownersSaved && groupsSaved && bookmakersSaved;
    } catch (error) {
        console.error("Erro ao salvar dados:", error);
        return false;
    }
}

// Função para criar modal de owner
function openOwnerModal(ownerId = null) {
    // Implementação da abertura de modal de owner
    // Se ownerId for fornecido, carrega dados do owner para edição
    const owner = ownerId ? 
        window.appData.owners.find(o => o.id === ownerId) : 
        { id: Date.now().toString(), status: 'active' };
    
    // Abrir modal e preencher campos
    // Implementação depende da estrutura da modal
}

// Função para criar modal de grupo
function openGroupModal(groupId = null) {
    // Implementação da abertura de modal de grupo
    // Se groupId for fornecido, carrega dados do grupo para edição
    const group = groupId ? 
        window.appData.groups.find(g => g.id === groupId) : 
        { id: Date.now().toString(), status: 'active' };
    
    // Abrir modal e preencher campos
    // Implementação depende da estrutura da modal
}

// Função para criar modal de bookmaker
function openBookmakerModal(bookmakerId = null) {
    // Implementação da abertura de modal de bookmaker
    // Se bookmakerId for fornecido, carrega dados do bookmaker para edição
    const bookmaker = bookmakerId ? 
        window.appData.bookmakers.find(b => b.id === bookmakerId) : 
        { id: Date.now().toString(), status: 'active' };
    
    // Abrir modal e preencher campos
    // Implementação depende da estrutura da modal
}

// Salvar owner
function saveOwner(ownerData) {
    try {
        // Verificar se owner já existe (edição)
        const ownerIndex = window.appData.owners.findIndex(o => o.id === ownerData.id);
        
        if (ownerIndex >= 0) {
            // Atualizar owner existente
            window.appData.owners[ownerIndex] = ownerData;
        } else {
            // Adicionar novo owner
            window.appData.owners.push(ownerData);
        }
        
        // Salvar dados
        saveAllData();
        
        // Atualizar tabelas
        updateTables();
        
        return true;
    } catch (error) {
        console.error("Erro ao salvar owner:", error);
        return false;
    }
}

// Salvar grupo
function saveGroup(groupData) {
    try {
        console.log("Group data:", groupData);
        
        // Verificar se grupo já existe (edição)
        const groupIndex = window.appData.groups.findIndex(g => g.id === groupData.id);
        
        if (groupIndex >= 0) {
            // Atualizar grupo existente
            window.appData.groups[groupIndex] = groupData;
        } else {
            // Adicionar novo grupo
            window.appData.groups.push(groupData);
        }
        
        // Salvar dados
        saveAllData();
        
        // Atualizar tabelas
        updateTables();
        
        return true;
    } catch (error) {
        console.error("Erro ao salvar grupo:", error);
        return false;
    }
}

// Salvar bookmaker
function saveBookmaker(bookmakerData) {
    try {
        // Verificar se bookmaker já existe (edição)
        const bookmakerIndex = window.appData.bookmakers.findIndex(b => b.id === bookmakerData.id);
        
        if (bookmakerIndex >= 0) {
            // Atualizar bookmaker existente
            window.appData.bookmakers[bookmakerIndex] = bookmakerData;
        } else {
            // Adicionar novo bookmaker
            window.appData.bookmakers.push(bookmakerData);
        }
        
        // Salvar dados
        saveAllData();
        
        // Atualizar tabelas
        updateTables();
        
        return true;
    } catch (error) {
        console.error("Erro ao salvar bookmaker:", error);
        return false;
    }
}

// Excluir owner
function deleteOwner(ownerId) {
    if (confirm('Tem certeza que deseja excluir este owner?')) {
        // Filtrar owners para remover o selecionado
        window.appData.owners = window.appData.owners.filter(o => o.id !== ownerId);
        
        // Salvar dados
        saveAllData();
        
        // Atualizar tabelas
        updateTables();
    }
}

// Excluir grupo
function deleteGroup(groupId) {
    if (confirm('Tem certeza que deseja excluir este grupo?')) {
        // Filtrar grupos para remover o selecionado
        window.appData.groups = window.appData.groups.filter(g => g.id !== groupId);
        
        // Salvar dados
        saveAllData();
        
        // Atualizar tabelas
        updateTables();
    }
}

// Excluir bookmaker
function deleteBookmaker(bookmakerId) {
    if (confirm('Tem certeza que deseja excluir este bookmaker?')) {
        // Filtrar bookmakers para remover o selecionado
        window.appData.bookmakers = window.appData.bookmakers.filter(b => b.id !== bookmakerId);
        
        // Salvar dados
        saveAllData();
        
        // Atualizar tabelas
        updateTables();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar banco de dados
    initDatabase();
    
    // Verificar se estamos na página de bookmaker
    if (window.location.pathname.includes('bookmaker.html')) {
        console.log("Banco de dados inicializado com sucesso na página bookmaker.html");
        
        // Dados de exemplo
        const bookmakerPage = {
            owners: window.appData.owners || [],
            groups: window.appData.groups || [],
            bookmakers: window.appData.bookmakers || []
        };
        
        console.log("Dados carregados diretamente em bookmaker.html:", bookmakerPage);
        
        // Adicionar event listeners para botões de ação
        const addOwnerBtn = document.getElementById('addOwner');
        const addGroupBtn = document.getElementById('addGroup');
        const addBookmakerBtn = document.getElementById('addBookmaker');
        
        if (addOwnerBtn) {
            addOwnerBtn.addEventListener('click', function() {
                openOwnerModal();
            });
        }
        
        if (addGroupBtn) {
            addGroupBtn.addEventListener('click', function() {
                openGroupModal();
            });
        }
        
        if (addBookmakerBtn) {
            addBookmakerBtn.addEventListener('click', function() {
                openBookmakerModal();
            });
        }
        
        // Atualizar tabelas
        updateTables();
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav li a');
    const sectionTitle = document.getElementById('section-title');
    
    // Add click event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se o link tiver um href diferente de "#", não previna o comportamento padrão
            if (href && href !== "#") {
                return; // Permite a navegação para outra página
            }
            
            e.preventDefault();
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Get the section to show
            const sectionId = this.getAttribute('data-section');
            
            // Update section title
            sectionTitle.textContent = this.querySelector('span:last-child').textContent;
            
            // Hide all sections and show the selected one
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });
            
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Per geography toggle listeners
    const checkboxes = document.querySelectorAll(".per-geography-billing-checkbox");
    if (checkboxes.length > 0) {
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                const accountId = this.dataset.accountId;
                const account = window.bookmakerAccounts ? window.bookmakerAccounts.find(
                    (a) => a.id === accountId,
                ) : null;
                if (account) {
                    account.billing.perGeography = this.checked;
                }

                // Find the sections that need to be shown/hidden
                const geographyBillingSection =
                    document.getElementById(
                        `geography-billing-${accountId}`,
                    );
                const generalBillingSection = this.closest(
                    ".billing-card",
                ).querySelector(".general-billing-section");
                
                // Find all auto-fill buttons in the card - both general and geography-specific
                const generalAutoFillButtons = this.closest(
                    ".billing-card",
                ).querySelector(".auto-fill-buttons");
                
                // Show/hide the appropriate sections
                if (geographyBillingSection) {
                    geographyBillingSection.style.display = this
                        .checked
                        ? "block"
                        : "none";
                }

                if (generalBillingSection) {
                    if (this.checked) {
                        generalBillingSection.classList.add(
                            "hidden",
                        );
                    } else {
                        generalBillingSection.classList.remove(
                            "hidden",
                        );
                    }
                }

                // Show/hide the general auto-fill buttons
                if (generalAutoFillButtons) {
                    if (this.checked) {
                        generalAutoFillButtons.classList.add("hidden");
                    } else {
                        generalAutoFillButtons.classList.remove("hidden");
                    }
                }
            });
        });
    }
    
    // Salvar dados periodicamente
    setInterval(function() {
        saveAllData();
    }, 60000); // A cada minuto
});
