
// Função para popular a tabela de bookmakers - movida para o escopo global
function populateBookmakersTable() {
    const tableBody = document.getElementById('bookmakers-table-body');
    const noBookmakersMessage = document.getElementById('no-bookmakers-message');
    
    if (!tableBody) return;
    
    // Limpa a tabela
    tableBody.innerHTML = '';
    
    // Verifica se há bookmakers cadastrados
    if (!window.bookmakersData || window.bookmakersData.length === 0) {
        if (noBookmakersMessage) {
            noBookmakersMessage.style.display = 'block';
        }
        return;
    }
    
    // Esconde a mensagem de "sem bookmakers"
    if (noBookmakersMessage) {
        noBookmakersMessage.style.display = 'none';
    }
    
    // Adiciona cada bookmaker à tabela
    window.bookmakersData.forEach(bookmaker => {
        // Encontra o nome do grupo, se existir
        let groupName = 'N/A';
        if (bookmaker.group) {
            const group = window.groupsData.find(g => g.id === bookmaker.group);
            if (group) {
                groupName = group.name;
            }
        }
        
        // Formata o status para exibição
        let statusDisplay = bookmaker.status;
        if (statusDisplay === 'active') statusDisplay = 'Ativo';
        else if (statusDisplay === 'inactive') statusDisplay = 'Inativo';
        else if (statusDisplay === 'suspended') statusDisplay = 'Suspenso';
        
        // Cria a linha da tabela
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bookmaker.id}</td>
            <td>${bookmaker.name}</td>
            <td>${bookmaker.affiliateUrl || '-'}</td>
            <td>${statusDisplay}</td>
            <td>${groupName}</td>
            <td class="action-buttons">
                <button class="btn btn-edit" data-id="${bookmaker.id}">Editar</button>
                <button class="btn btn-delete" data-id="${bookmaker.id}">Excluir</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Adiciona event listeners para os botões de editar e excluir
    addBookmakerTableEventListeners();
}

// Função para adicionar event listeners aos botões da tabela
function addBookmakerTableEventListeners() {
    // Botões de editar
    document.querySelectorAll('.bookmaker-table .btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookmakerId = this.getAttribute('data-id');
            alert(`Edição de bookmaker será implementada em breve (ID: ${bookmakerId})`);
            // Implementar a lógica de edição no futuro
        });
    });
    
    // Botões de excluir
    document.querySelectorAll('.bookmaker-table .btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookmakerId = this.getAttribute('data-id');
            const bookmaker = window.bookmakersData.find(b => b.id === bookmakerId);
            
            if (!bookmaker) return;
            
            if (confirm(`Tem certeza que deseja excluir o bookmaker "${bookmaker.name}"?`)) {
                // Remove do array
                window.bookmakersData = window.bookmakersData.filter(b => b.id !== bookmakerId);
                
                // Salva no localStorage
                window.DB.bookmakers.save(window.bookmakersData);
                
                // Atualiza a tabela
                populateBookmakersTable();
                
                alert(`Bookmaker "${bookmaker.name}" foi excluído com sucesso!`);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o banco de dados local
    if(window.DB) {
        window.DB.init();
        
        // Carrega os dados existentes
        window.ownersData = window.DB.owners.get() || [];
        window.groupsData = window.DB.groups.get() || [];
        window.bookmakersData = window.DB.bookmakers.get() || [];
        
        console.log("Dados carregados:", {
            owners: window.ownersData.length,
            groups: window.groupsData.length,
            bookmakers: window.bookmakersData.length
        });
        
        // Popula a tabela de bookmakers quando estiver na página bookmaker.html
        if (document.getElementById('bookmakers-table-body')) {
            populateBookmakersTable();
        }
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
    
    // Adiciona observer para salvar dados quando modificados
    addDataSaveObserver();
});

// Per geography toggle listeners
document.addEventListener('DOMContentLoaded', function() {
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
                    
                    // Salva os dados quando houver alterações
                    saveBookmakerData();
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
});

// Funções para garantir o salvamento dos dados
function addDataSaveObserver() {
    // Adiciona listener para botões de salvar
    document.addEventListener('click', function(e) {
        // Verifica se é um botão de salvar
        if (e.target && e.target.matches('#save-owner, #save-group, #save-bookmaker, #save-account, #save-contact')) {
            // Aguarda um momento para garantir que os dados foram atualizados
            setTimeout(function() {
                saveAllData();
            }, 100);
        }

// As funções de popular tabela e adicionar event listeners foram movidas
// para a parte superior do arquivo

    });
    
    // Adiciona listener para mudanças em formulários importantes
    document.addEventListener('change', function(e) {
        if (e.target && (
            e.target.matches('.form-control') || 
            e.target.matches('select') ||
            e.target.matches('input[type="checkbox"]')
        )) {
            setTimeout(function() {
                saveAllData();
            }, 500);
        }
    });
}

function saveAllData() {
    console.log("Salvando todos os dados...");
    
    // Salva owners
    if (window.ownersData) {
        window.DB.owners.save(window.ownersData);
    }
    
    // Salva groups
    if (window.groupsData) {
        window.DB.groups.save(window.groupsData);
    }
    
    // Salva bookmakers
    if (window.bookmakersData) {
        window.DB.bookmakers.save(window.bookmakersData);
    }
    
    console.log("Dados salvos com sucesso!");
}

function saveOwnerData() {
    if (window.ownersData && window.DB) {
        window.DB.owners.save(window.ownersData);
        console.log("Dados de owners salvos com sucesso!", window.ownersData.length);
    }
}

function saveGroupData() {
    if (window.groupsData && window.DB) {
        window.DB.groups.save(window.groupsData);
        console.log("Dados de groups salvos com sucesso!", window.groupsData.length);
    }
}

function saveBookmakerData() {
    if (window.bookmakersData && window.DB) {
        window.DB.bookmakers.save(window.bookmakersData);
        console.log("Dados de bookmakers salvos com sucesso!", window.bookmakersData.length);
    }
}
