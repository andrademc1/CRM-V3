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
});

            document.getElementById(sectionId).classList.add('active');
        });
    });
});

// ... (rest of the code, including bookmaker save functionality and resetBookmakerForm function) ...

//Example of where the changes might be integrated.  This assumes existing save functionality. Adapt as needed to match your actual code.
function saveBookmaker() {
    const bookmakerData = getBookmakerData(); //Existing function assumed
    const bookmakerAffiliateURLs = getBookmakerAffiliateURLs();//New function needed
    // Include the affiliate URLs data
    bookmakerData.geographyAffiliateURLs = bookmakerAffiliateURLs;

    // Add to bookmakers array
    bookmakersData.push(bookmakerData);

    console.log("Bookmaker data:", bookmakerData);
    alert("Bookmaker added successfully!");
}

function resetBookmakerForm() {
    // ... (Existing reset code) ...

    // Reset affiliate URLs
    bookmakerAffiliateURLs = [];
    const affiliateUrlGeographiesContainer = document.getElementById("affiliate-url-geographies-container");
    if (affiliateUrlGeographiesContainer) {
        affiliateUrlGeographiesContainer.innerHTML = "";
    }
    const affiliateNoGeographiesMessage = document.getElementById("affiliate-url-no-geographies-message");
    if (affiliateNoGeographiesMessage) {
        affiliateNoGeographiesMessage.style.display = "block";
    }
}

// Placeholder functions -  replace with your actual implementation
function getBookmakerData() {
    // Your logic to get bookmaker data
    return {};
}

function getBookmakerAffiliateURLs(){
    //Your logic to get affiliate URLs
    const selectedGeographies = getSelectedGeographies(); //Assumed function to get selected geographies
    const affiliateUrls = {};

    selectedGeographies.forEach(geography => {
        const urlInput = document.getElementById(`affiliate-url-${geography}`);
        affiliateUrls[geography] = urlInput ? urlInput.value : "";
    });
    return affiliateUrls;
}

function getSelectedGeographies(){
    //Your logic to get selected geographies
    return [];
}