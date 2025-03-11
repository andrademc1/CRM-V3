
document.addEventListener('DOMContentLoaded', function() {
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

// Per geography toggle listeners
document.addEventListener('DOMContentLoaded', function() {
    // Função para esconder/mostrar elementos corretamente com base no estado do checkbox
    function updateVisibility(checkbox) {
        const accountId = checkbox.dataset.accountId;
        const account = window.bookmakerAccounts ? window.bookmakerAccounts.find(
            (a) => a.id === accountId,
        ) : null;
        
        if (account) {
            account.billing.perGeography = checkbox.checked;
        }

        // Encontrar os elementos relevantes
        const billingCard = checkbox.closest(".billing-card");
        const geographyBillingSection = document.getElementById(`geography-billing-${accountId}`);
        const generalBillingSection = billingCard.querySelector(".general-billing-section");
        const generalAutoFillButtons = billingCard.querySelectorAll(".auto-fill-buttons:not([data-geography-code])");
        
        // Atualizar visibilidade
        if (geographyBillingSection) {
            geographyBillingSection.style.display = checkbox.checked ? "block" : "none";
        }

        if (generalBillingSection) {
            generalBillingSection.style.display = checkbox.checked ? "none" : "block";
        }

        // Esconder TODOS os botões auto-fill gerais
        generalAutoFillButtons.forEach(button => {
            button.style.display = checkbox.checked ? "none" : "block";
        });
    }

    // Aplicar aos checkboxes existentes
    const checkboxes = document.querySelectorAll(".per-geography-billing-checkbox");
    if (checkboxes.length > 0) {
        checkboxes.forEach((checkbox) => {
            // Aplicar visibilidade inicial
            updateVisibility(checkbox);
            
            // Adicionar listener para mudanças
            checkbox.addEventListener("change", function() {
                updateVisibility(this);
            });
        });
    }
});

            document.getElementById(sectionId).classList.add('active');
        });
    });
});
