
// Variáveis globais para armazenar dados carregados
let ownersData = [];
let groupsData = [];
let bookmakersData = [];

// Função para inicializar o sistema CRM
async function initializeCRM() {
    try {
        // Inicializar banco de dados
        await fetch('/api/setup', {
            method: 'POST'
        }).then(response => response.json());
        
        // Carregar dados iniciais
        await Promise.all([
            fetchOwners(),
            fetchGroups(),
            fetchBookmakers()
        ]);
        
        console.log('CRM inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar CRM:', error);
    }
}

// Funções para carregar dados
async function fetchOwners() {
    try {
        const response = await fetch('/api/owners');
        if (response.ok) {
            ownersData = await response.json();
            updateOwnerDropdowns();
            updateOwnersTable();
        }
    } catch (error) {
        console.error('Erro ao buscar owners:', error);
    }
}

async function fetchGroups() {
    try {
        const response = await fetch('/api/groups');
        if (response.ok) {
            groupsData = await response.json();
            updateGroupDropdowns();
            updateGroupsTable();
        }
    } catch (error) {
        console.error('Erro ao buscar grupos:', error);
    }
}

async function fetchBookmakers() {
    try {
        const response = await fetch('/api/bookmakers');
        if (response.ok) {
            bookmakersData = await response.json();
            updateBookmakersTable();
        }
    } catch (error) {
        console.error('Erro ao buscar bookmakers:', error);
    }
}

// Funções para atualizar dropdowns
function updateOwnerDropdowns() {
    // Atualizar owner dropdown no modal de grupo
    const ownerDropdown = document.getElementById("account-owner");
    if (ownerDropdown) {
        // Limpar opções atuais exceto a primeira
        while (ownerDropdown.options.length > 1) {
            ownerDropdown.remove(1);
        }

        // Adicionar owners ao dropdown
        ownersData.forEach(owner => {
            const option = document.createElement("option");
            option.value = owner.id;
            option.textContent = owner.name;
            ownerDropdown.appendChild(option);
        });
    }
    
    // Atualizar owner dropdown no modal de bookmaker
    const bookmakerOwnerDropdown = document.getElementById("bookmaker-account-owner");
    if (bookmakerOwnerDropdown) {
        // Limpar opções atuais exceto a primeira
        while (bookmakerOwnerDropdown.options.length > 1) {
            bookmakerOwnerDropdown.remove(1);
        }

        // Adicionar owners ao dropdown
        ownersData.forEach(owner => {
            const option = document.createElement("option");
            option.value = owner.id;
            option.textContent = owner.name;
            bookmakerOwnerDropdown.appendChild(option);
        });
    }
}

function updateGroupDropdowns() {
    // Atualizar group dropdown no modal de bookmaker
    const groupDropdown = document.getElementById("bookmaker-group");
    if (groupDropdown) {
        // Limpar opções atuais exceto a primeira
        while (groupDropdown.options.length > 1) {
            groupDropdown.remove(1);
        }

        // Adicionar groups ao dropdown
        groupsData.forEach(group => {
            const option = document.createElement("option");
            option.value = group.id;
            option.textContent = group.name;
            groupDropdown.appendChild(option);
        });
    }
}

// Funções para atualizar tabelas
function updateOwnersTable() {
    const ownersTableBody = document.querySelector('#ownersTable tbody');
    if (!ownersTableBody) return;
    
    ownersTableBody.innerHTML = '';
    
    if (ownersData.length === 0) {
        ownersTableBody.innerHTML = '<tr><td colspan="4">Nenhum owner encontrado.</td></tr>';
        return;
    }
    
    ownersData.forEach((owner, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${owner.name}</td>
            <td>${owner.email || '-'}</td>
            <td class="action-buttons">
                <button class="btn btn-edit" data-owner-id="${owner.id}">Editar</button>
                <button class="btn btn-delete" data-owner-id="${owner.id}">Excluir</button>
            </td>
        `;
        ownersTableBody.appendChild(row);
    });
}

function updateGroupsTable() {
    const groupsTableBody = document.querySelector('#groupsTable tbody');
    if (!groupsTableBody) return;
    
    groupsTableBody.innerHTML = '';
    
    if (groupsData.length === 0) {
        groupsTableBody.innerHTML = '<tr><td colspan="5">Nenhum grupo encontrado.</td></tr>';
        return;
    }
    
    groupsData.forEach((group, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${group.name}</td>
            <td>${group.website || '-'}</td>
            <td>${group.owner_name || '-'}</td>
            <td class="action-buttons">
                <button class="btn btn-edit" data-group-id="${group.id}">Editar</button>
                <button class="btn btn-delete" data-group-id="${group.id}">Excluir</button>
            </td>
        `;
        groupsTableBody.appendChild(row);
    });
}

function updateBookmakersTable() {
    const bookmakersTableBody = document.querySelector('#bookmakersTable tbody');
    if (!bookmakersTableBody) return;
    
    bookmakersTableBody.innerHTML = '';
    
    if (bookmakersData.length === 0) {
        bookmakersTableBody.innerHTML = '<tr><td colspan="5">Nenhum bookmaker encontrado.</td></tr>';
        return;
    }
    
    bookmakersData.forEach((bookmaker, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmaker.name}</td>
            <td>${bookmaker.website || '-'}</td>
            <td>${bookmaker.status}</td>
            <td class="action-buttons">
                <button class="btn btn-edit" data-bookmaker-id="${bookmaker.id}">Editar</button>
                <button class="btn btn-delete" data-bookmaker-id="${bookmaker.id}">Excluir</button>
            </td>
        `;
        bookmakersTableBody.appendChild(row);
    });
}

// Funções para salvar dados
async function saveOwner() {
    const ownerForm = document.getElementById('ownerForm');
    if (!ownerForm) return;
    
    const name = document.getElementById('owner-name').value;
    const email = document.getElementById('owner-email').value;
    const phone = document.getElementById('owner-phone').value;
    const logoUrl = document.getElementById('owner-logo-preview').querySelector('img')?.src || '';
    
    if (!name) {
        alert('Por favor, informe o nome do owner.');
        return;
    }
    
    try {
        const response = await fetch('/api/owners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                logo_url: logoUrl
            })
        });
        
        if (response.ok) {
            const owner = await response.json();
            ownersData.push(owner);
            updateOwnerDropdowns();
            updateOwnersTable();
            
            // Fechar modal
            document.getElementById('ownerModal')?.classList.remove('active');
            
            // Resetar formulário
            ownerForm.reset();
            document.getElementById('owner-logo-preview').innerHTML = '';
            
            alert('Owner adicionado com sucesso!');
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao salvar owner');
        }
    } catch (error) {
        console.error('Erro ao salvar owner:', error);
        alert('Erro ao salvar owner: ' + error.message);
    }
}

async function saveGroup() {
    const groupForm = document.getElementById('groupForm');
    if (!groupForm) return;
    
    const name = document.getElementById('group-name').value;
    const website = document.getElementById('group-website').value;
    const ownerId = document.getElementById('account-owner').value;
    const description = document.getElementById('deal-description').value;
    const logoUrl = document.getElementById('group-logo-preview').querySelector('img')?.src || '';
    
    if (!name) {
        alert('Por favor, informe o nome do grupo.');
        return;
    }
    
    try {
        const response = await fetch('/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                website,
                owner_id: ownerId || null,
                description,
                logo_url: logoUrl
            })
        });
        
        if (response.ok) {
            const group = await response.json();
            await fetchGroups(); // Recarregar grupos para obter owner_name
            
            // Fechar modal
            document.getElementById('groupModal')?.classList.remove('active');
            
            // Resetar formulário
            groupForm.reset();
            document.getElementById('group-logo-preview').innerHTML = '';
            
            alert('Grupo adicionado com sucesso!');
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao salvar grupo');
        }
    } catch (error) {
        console.error('Erro ao salvar grupo:', error);
        alert('Erro ao salvar grupo: ' + error.message);
    }
}

async function saveBookmaker() {
    const bookmakerForm = document.getElementById('bookmakerForm');
    if (!bookmakerForm) return;
    
    const name = document.getElementById('bookmaker-name').value;
    const website = document.getElementById('bookmaker-website').value;
    const groupId = document.getElementById('bookmaker-group').value;
    const status = document.getElementById('bookmaker-status').value;
    const description = document.getElementById('bookmaker-description')?.value || '';
    const logoUrl = document.getElementById('bookmaker-logo-preview').querySelector('img')?.src || '';
    
    if (!name) {
        alert('Por favor, informe o nome do bookmaker.');
        return;
    }
    
    try {
        const response = await fetch('/api/bookmakers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                website,
                group_id: groupId || null,
                status,
                description,
                logo_url: logoUrl
            })
        });
        
        if (response.ok) {
            const bookmaker = await response.json();
            await fetchBookmakers(); // Recarregar bookmakers para obter group_name
            
            // Fechar modal
            document.getElementById('bookmakerModal')?.classList.remove('active');
            
            // Resetar formulário
            bookmakerForm.reset();
            document.getElementById('bookmaker-logo-preview').innerHTML = '';
            
            alert('Bookmaker adicionado com sucesso!');
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao salvar bookmaker');
        }
    } catch (error) {
        console.error('Erro ao salvar bookmaker:', error);
        alert('Erro ao salvar bookmaker: ' + error.message);
    }
}

// Exportar funções para uso global
window.initializeCRM = initializeCRM;
window.saveOwner = saveOwner;
window.saveGroup = saveGroup;
window.saveBookmaker = saveBookmaker;
