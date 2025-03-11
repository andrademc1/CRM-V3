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

            document.getElementById(sectionId).classList.add('active');
        });
    });
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

                // Fix duplicate IDs by ensuring that all form field labels have matching IDs
                // This adds unique suffixes to the geography-specific fields 
                // For account-specific elements that have duplicates
                let formFields = this.closest(".billing-card").querySelectorAll("[id]");
                formFields.forEach(field => {
                    // Skip if field is already properly formed with account ID
                    if (field.id.includes(accountId)) return;
                    
                    // Make sure label for attributes match field IDs
                    let associatedLabel = this.closest(".billing-card").querySelector(`label[for="${field.id}"]`);
                    if (associatedLabel) {
                        const newId = `${field.id}-${accountId}`;
                        field.id = newId;
                        associatedLabel.setAttribute('for', newId);
                    }
                });

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

// Helper function to ensure form field IDs are unique
function ensureUniqueFormFieldIds(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    const processedIds = new Set();
    
    containers.forEach(container => {
        const formFields = container.querySelectorAll('[id]');
        formFields.forEach(field => {
            // If this ID has already been processed, make it unique
            if (processedIds.has(field.id)) {
                const uniqueId = `${field.id}-${Math.random().toString(36).substr(2, 5)}`;
                
                // Find and update any label that references this field
                const associatedLabel = document.querySelector(`label[for="${field.id}"]`);
                if (associatedLabel) {
                    associatedLabel.setAttribute('for', uniqueId);
                }
                
                // Update the field ID
                field.id = uniqueId;
            }
            
            processedIds.add(field.id);
        });
    });
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all dynamic content is rendered
    setTimeout(() => {
        ensureUniqueFormFieldIds('.modal-content');
        ensureUniqueFormFieldIds('.billing-card');
        ensureUniqueFormFieldIds('.deal-card');
        ensureUniqueFormFieldIds('.geography-billing-item');
        ensureUniqueFormFieldIds('.geography-deal-item');
    }, 500);
});