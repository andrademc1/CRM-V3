// Simple Express server for hosting our CRM
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Handle static files
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});

// Per geography toggle listeners
                    document
                        .querySelectorAll(".per-geography-billing-checkbox")
                        .forEach((checkbox) => {
                            checkbox.addEventListener("change", function () {
                                const accountId = this.dataset.accountId;
                                const account = bookmakerAccounts.find(
                                    (a) => a.id === accountId,
                                );
                                if (!account) return;

                                account.billing.perGeography = this.checked;

                                // Find the sections that need to be shown/hidden
                                const geographyBillingSection =
                                    document.getElementById(
                                        `geography-billing-${accountId}`,
                                    );
                                const generalBillingSection = this.closest(
                                    ".billing-card",
                                ).querySelector(".general-billing-section");
                                const autoFillButtons = this.closest(
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

                                // Show/hide the auto-fill buttons
                                if (autoFillButtons) {
                                    if (this.checked) {
                                        autoFillButtons.classList.add("hidden");
                                    } else {
                                        autoFillButtons.classList.remove("hidden");
                                    }
                                }
                            });
                        });