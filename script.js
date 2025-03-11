
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o banco de dados local
    if(window.DB) {
        window.DB.init();
        
        // Carrega os dados existentes
        window.ownersData = window.DB.owners.get() || [];
        window.groupsData = window.DB.groups.get() || [];
        window.bookmakersData = window.DB.bookmakers.get() || [];
        
        console.log("Dados carregados do localStorage:", {
            owners: window.ownersData.length,
            groups: window.groupsData.length,
            bookmakers: window.bookmakersData.length
        });
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
        const ownerResult = window.DB.owners.save(window.ownersData);
        console.log("Owners salvos com sucesso:", window.ownersData.length);
        console.log("Owners salvos:", window.DB.owners.get().length);
    }
    
    // Salva groups
    if (window.groupsData) {
        const groupResult = window.DB.groups.save(window.groupsData);
        console.log("Groups salvos com sucesso:", window.groupsData.length);
        console.log("Groups salvos:", window.DB.groups.get().length);
    }
    
    // Salva bookmakers
    if (window.bookmakersData) {
        const bookmakerResult = window.DB.bookmakers.save(window.bookmakersData);
        console.log("Resultado do salvamento de bookmakers:", bookmakerResult);
        const savedData = localStorage.getItem('crm_bookmakers');
        console.log("Dados brutos no localStorage:", savedData ? `${savedData.substring(0, 5)}...` : "nenhum");
    }
    
    // Verifica se os dados foram salvos corretamente
    const owners = window.DB.owners.get();
    const groups = window.DB.groups.get();
    const bookmakers = window.DB.bookmakers.get();
    
    console.log("Owners recuperados do localStorage:", owners.length);
    console.log("Groups recuperados do localStorage:", groups.length);
    console.log("Bookmakers recuperados do localStorage:", bookmakers.length);
    console.log("Dados verificados no localStorage:", {owners: owners.length, groups: groups.length, bookmakers: bookmakers.length});
    
    console.log("Dados salvos com sucesso!");
}

// Adiciona função para salvar dados ao fechar a página ou recarregar
window.addEventListener('beforeunload', function() {
    console.log("Página está sendo fechada, salvando dados...");
    saveAllData();
});

// Adiciona salvamento automático a cada 30 segundos
setInterval(function() {
    console.log("Salvamento automático de dados...");
    saveAllData();
}, 30000);

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
