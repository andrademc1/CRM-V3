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

// Function to render geography URL fields
                function renderGeographyURLs() {
                    const urlContainer = document.getElementById("url-geographies-container");
                    const noGeographiesMessage = document.getElementById("url-no-geographies-message");

                    if (!urlContainer) return;

                    // Show or hide the no geographies message
                    if (selectedGeographies.length === 0) {
                        noGeographiesMessage.style.display = "block";
                        urlContainer.innerHTML = "";
                        return;
                    } else {
                        noGeographiesMessage.style.display = "none";
                    }

                    urlContainer.innerHTML = "";

                    // Create URL field for each geography
                    selectedGeographies.forEach((geography) => {
                        // Find existing URL or create empty one
                        const geographyURL = bookmakerURLs.find(u => u.geographyCode === geography.code)?.url || "";

                        const urlFieldContainer = document.createElement("div");
                        urlFieldContainer.className = "geography-url-field";
                        urlFieldContainer.innerHTML = `
                            <div class="geography-name" style="margin-top: 15px; margin-bottom: 5px;">
                                <span class="country-flag">${geography.flag}</span>
                                <strong>${geography.name}</strong>
                            </div>
                            <div class="auto-fill-buttons" style="margin-bottom: 10px;">
                                <button type="button" class="btn auto-fill-url-bookmaker" 
                                    data-geography-code="${geography.code}" 
                                    style="margin-right: 10px; background-color: #28a745; font-size: 12px; padding: 4px 8px;">
                                    Auto-fill from Bookmaker
                                </button>
                                <button type="button" class="btn auto-fill-url-group" 
                                    data-geography-code="${geography.code}" 
                                    style="background-color: #17a2b8; font-size: 12px; padding: 4px 8px;">
                                    Auto-fill from Group
                                </button>
                            </div>
                            <div class="form-group">
                                <label for="geography-url-${geography.code}">URL for ${geography.name}</label>
                                <input 
                                    type="url" 
                                    id="geography-url-${geography.code}" 
                                    class="form-control geography-url" 
                                    data-geography-code="${geography.code}" 
                                    placeholder="Enter URL for ${geography.name}"
                                    value="${geographyURL}"
                                />
                            </div>
                        `;

                        urlContainer.appendChild(urlFieldContainer);
                    });

                    // Add event listeners for URL changes
                    document.querySelectorAll(".geography-url").forEach(input => {
                        input.addEventListener("input", function() {
                            const geographyCode = this.dataset.geographyCode;
                            const urlValue = this.value;

                            // Find if URL already exists for this geography
                            const existingURLIndex = bookmakerURLs.findIndex(u => u.geographyCode === geographyCode);

                            if (existingURLIndex !== -1) {
                                bookmakerURLs[existingURLIndex].url = urlValue;
                            } else {
                                bookmakerURLs.push({
                                    geographyCode: geographyCode,
                                    url: urlValue
                                });
                            }
                        });
                    });

                    // Add event listeners for auto-fill buttons
                    // Auto-fill from Bookmaker
                    document.querySelectorAll(".auto-fill-url-bookmaker").forEach(button => {
                        button.addEventListener("click", function() {
                            const geographyCode = this.dataset.geographyCode;
                            const bookmakerAffiliateUrl = document.getElementById("bookmaker-affiliate-url").value;

                            if (!bookmakerAffiliateUrl) {
                                alert("Please set the Bookmaker Affiliate URL in the Bookmaker Settings tab first.");
                                return;
                            }

                            // Set the URL field value
                            const urlField = document.getElementById(`geography-url-${geographyCode}`);
                            if (urlField) {
                                urlField.value = bookmakerAffiliateUrl;

                                // Trigger input event to save the value
                                const inputEvent = new Event('input', { bubbles: true });
                                urlField.dispatchEvent(inputEvent);
                            }

                            alert(`URL for ${geographyCode} filled from Bookmaker Affiliate URL.`);
                        });
                    });

                    // Auto-fill from Group
                    document.querySelectorAll(".auto-fill-url-group").forEach(button => {
                        button.addEventListener("click", function() {
                            const geographyCode = this.dataset.geographyCode;

                            // Get selected group from bookmaker settings
                            const selectedGroupId = document.getElementById("bookmaker-group").value;
                            if (!selectedGroupId) {
                                alert("Please select a group in the Bookmaker Settings tab first.");
                                return;
                            }

                            // Find the group
                            const group = groupsData.find(g => g.id === selectedGroupId);

                            if (!group) {
                                alert("Selected group not found.");
                                return;
                            }

                            if (!group.affiliateUrl) {
                                alert("The selected group does not have an Affiliate URL configured.");
                                return;
                            }

                            // Set the URL field value
                            const urlField = document.getElementById(`geography-url-${geographyCode}`);
                            if (urlField) {
                                urlField.value = group.affiliateUrl;

                                // Trigger input event to save the value
                                const inputEvent = new Event('input', { bubbles: true });
                                urlField.dispatchEvent(inputEvent);
                            }

                            alert(`URL for ${geographyCode} filled from Group Affiliate URL.`);
                        });
                    });
                }