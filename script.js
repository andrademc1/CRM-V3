document.addEventListener('DOMContentLoaded', function() {
    // Inicializar a variável selectedGeographies, caso não esteja definida
    if (typeof selectedGeographies === 'undefined') {
        window.selectedGeographies = [];
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


// Array para armazenar owners registrados
let ownersData = [];
// Array para armazenar groups registrados
let groupsData = [];
// Array para armazenar bookmakers registrados
let bookmakersData = [];
// Array para armazenar geographies selecionadas
let selectedGeographies = [];
// Objeto para armazenar URLs do bookmaker por geografia
let bookmakerURLs = {
    generalURL: "",
    geographyURLs: []
};

// Add a country to selected geographies
function addGeography(country) {
    // Check if already selected
    if (
        selectedGeographies.some(
            (selected) => selected.code === country.code,
        )
    ) {
        return;
    }

    // Add to selected array
    selectedGeographies.push(country);

    // Add to UI
    renderSelectedGeographies();

    // Add empty URL entry for this geography
    if (!bookmakerURLs.geographyURLs.some(url => url.geographyCode === country.code)) {
        bookmakerURLs.geographyURLs.push({
            geographyCode: country.code,
            url: ""
        });
    }
}

// Remove a country from selected geographies
function removeGeography(countryCode) {
    selectedGeographies = selectedGeographies.filter(
        (country) => country.code !== countryCode,
    );
    renderSelectedGeographies();
    // Re-render geography list since a country was removed
    renderGeographyList(geographySearch.value);

    // Remove URL entry for this geography
    bookmakerURLs.geographyURLs = bookmakerURLs.geographyURLs.filter(
        url => url.geographyCode !== countryCode
    );
}


// Render Bookmaker URLs
function renderBookmakerURLs() {
    const urlsContainer = document.getElementById("bookmaker-urls-container");
    const noGeographiesMessage = document.getElementById("url-no-geographies-message");

    if (!urlsContainer) return;
    
    console.log("Geografias selecionadas:", selectedGeographies); // Para debug
    
    // Se não houver geografias selecionadas, mostrar mensagem
    if (!selectedGeographies || selectedGeographies.length === 0) {
        noGeographiesMessage.style.display = "block";
        urlsContainer.innerHTML = "";
        return;
    } else {
        noGeographiesMessage.style.display = "none";
    }

    urlsContainer.innerHTML = "<h4>Configure as URLs para cada geografia selecionada:</h4>";

    // Criar seção para URL geral
    const generalURLSection = document.createElement("div");
    generalURLSection.className = "url-section";
    generalURLSection.innerHTML = `
        <div class="form-group">
            <label for="general-url">URL Geral</label>
            <input type="url" id="general-url" class="form-control" 
                   placeholder="URL padrão para todas as geografias" 
                   value="${bookmakerURLs?.generalURL || ''}">
            <small class="form-text text-muted">Esta URL será usada para todas as geografias, a menos que uma URL específica seja definida.</small>
        </div>
    `;
    urlsContainer.appendChild(generalURLSection);

    // Adicionar input para cada geografia
    const geographyURLsContainer = document.createElement("div");
    geographyURLsContainer.className = "geography-urls-container";
    geographyURLsContainer.style.marginTop = "20px";

    selectedGeographies.forEach(geography => {
        const geographyURLItem = document.createElement("div");
        geographyURLItem.className = "geography-url-item";
        geographyURLItem.style.marginBottom = "15px";
        geographyURLItem.style.padding = "10px";
        geographyURLItem.style.backgroundColor = "#f8f9fa";
        geographyURLItem.style.borderRadius = "4px";

        // Encontrar URL específica para esta geografia ou usar vazio
        const geographyURL = bookmakerURLs?.geographyURLs?.find(
            url => url.geographyCode === geography.code
        );

        geographyURLItem.innerHTML = `
            <div class="geography-name" style="margin-bottom: 8px;">
                <span class="country-flag">${geography.flag}</span>
                <strong>${geography.name}</strong>
            </div>
            <div class="form-group">
                <label for="geo-url-${geography.code}">URL para ${geography.name}</label>
                <input type="url" id="geo-url-${geography.code}" 
                       class="form-control geography-url" 
                       data-geography-code="${geography.code}" 
                       placeholder="URL específica para ${geography.name}" 
                       value="${geographyURL?.url || ''}">
            </div>
        `;

        geographyURLsContainer.appendChild(geographyURLItem);
    });

    urlsContainer.appendChild(geographyURLsContainer);

    // Adicionar listeners para os inputs
    document.getElementById("general-url").addEventListener("input", function() {
        if (!bookmakerURLs) {
            bookmakerURLs = {
                generalURL: "",
                geographyURLs: []
            };
        }
        bookmakerURLs.generalURL = this.value;
    });

    document.querySelectorAll(".geography-url").forEach(input => {
        input.addEventListener("input", function() {
            const geographyCode = this.dataset.geographyCode;

            if (!bookmakerURLs) {
                bookmakerURLs = {
                    generalURL: "",
                    geographyURLs: []
                };
            }

            let geographyURL = bookmakerURLs.geographyURLs.find(
                url => url.geographyCode === geographyCode
            );

            if (!geographyURL) {
                geographyURL = {
                    geographyCode: geographyCode,
                    url: ""
                };
                bookmakerURLs.geographyURLs.push(geographyURL);
            }

            geographyURL.url = this.value;
        });
    });
}

// Placeholder functions com implementações mínimas
function renderDealAccounts() {}
function renderBillingAccounts() {}

// Implementação da função renderSelectedGeographies para garantir que a UI seja atualizada
function renderSelectedGeographies() {
    const selectedGeographiesContainer = document.getElementById("selected-geographies");
    
    if (!selectedGeographiesContainer) return;
    
    selectedGeographiesContainer.innerHTML = "";
    
    if (!selectedGeographies || selectedGeographies.length === 0) {
        selectedGeographiesContainer.innerHTML = "<i>No countries selected</i>";
        return;
    }
    
    selectedGeographies.forEach((country) => {
        const tag = document.createElement("div");
        tag.className = "geography-tag";
        tag.dataset.code = country.code;
        tag.innerHTML = `
            <span class="country-flag">${country.flag}</span>
            <span>${country.name}</span>
            <span class="remove-geography">×</span>
        `;
        
        tag.querySelector(".remove-geography").addEventListener("click", function () {
            removeGeography(country.code);
        });
        
        selectedGeographiesContainer.appendChild(tag);
    });
}

function renderGeographyList(searchValue) {}


// Tab functionality for all modals
const tabsContainers = document.querySelectorAll(".tabs");

tabsContainers.forEach((container) => {
    const tabs = container.querySelectorAll(".tab");
    // Find the parent modal
    const modal = container.closest(".modal");
    // Get all tab contents in this modal
    const tabContents = modal.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            const target = this.getAttribute("data-tab");

            // Remove active class from all tabs and contents within this modal
            tabs.forEach((t) => t.classList.remove("active"));
            tabContents.forEach((content) =>
                content.classList.remove("active"),
            );

            // Add active class to clicked tab and corresponding content
            this.classList.add("active");
            modal
                .querySelector(`#${target}`)
                .classList.add("active");

            // Verificar se há geografias selecionadas
            const geographyTags = document.querySelectorAll("#selected-geographies .geography-tag");
            if (geographyTags.length > 0 && (!selectedGeographies || selectedGeographies.length === 0)) {
                // Reconstruir o array selectedGeographies a partir dos elementos HTML
                selectedGeographies = [];
                geographyTags.forEach(tag => {
                    const code = tag.dataset.code;
                    const name = tag.querySelector("span:nth-child(2)").textContent;
                    const flag = tag.querySelector(".country-flag").textContent;
                    selectedGeographies.push({ code, name, flag });
                });
                console.log("Geografias recuperadas da UI:", selectedGeographies);
            }

            // If this is one of the special tabs that needs data rendering
            if (target === "bookmaker-deal") {
                renderDealAccounts();
            }

            if (target === "bookmaker-billing") {
                renderBillingAccounts();
            }

            if (target === "bookmaker-url") {
                renderBookmakerURLs();
            }
        });
    });
});


// Reset bookmaker URLs
bookmakerURLs = {
    generalURL: "",
    geographyURLs: []
};

// Reset to first tab
const bookmakerModal = document.getElementById("bookmaker-modal");
if (bookmakerModal) { //Check if element exists to avoid errors
    bookmakerModal
        .querySelector('.tab[data-tab="bookmaker-settings"]')
        .click();
}


// Placeholder for bookmakerId -  This needs to be defined appropriately in your application
const bookmakerId = 1; //Example ID

// Function to submit bookmaker data (needs to be adapted to your actual submission mechanism)
function submitBookmakerData() {
    const bookmakerData = {
        id: bookmakerId,
        group: document.getElementById("bookmaker-group").value,
        status: document.getElementById("bookmaker-status")
            .value,
        name: document.getElementById("bookmaker-name").value,
        affiliateUrl: document.getElementById(
            "bookmaker-affiliate-url",
        ).value,
        geographies: selectedGeographies.map((country) => ({
            code: country.code,
            name: country.name,
            flag: country.flag,
        })),
        urls: bookmakerURLs,
        accounts: bookmakerAccounts,
    };

    //  Replace this with your actual submission logic (e.g., fetch request)
    console.log("Bookmaker data to submit:", bookmakerData); 
}

// Example of adding a submit button (adapt to your HTML structure)
const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.addEventListener('click', submitBookmakerData);
if (bookmakerModal) bookmakerModal.appendChild(submitButton); //Append only if modal exists