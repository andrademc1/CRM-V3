
// Gerenciador de Modais e Formulários

// Modal de Proprietário (Owner)
function handleOwnerModal() {
    // Seletor do modal
    const ownerModal = document.getElementById('ownerModal');
    if (!ownerModal) return;
    
    // Seletor do formulário
    const ownerForm = ownerModal.querySelector('form') || ownerModal.querySelector('#owner-form');
    if (!ownerForm) return;
    
    // Botão de salvar
    const saveButton = ownerModal.querySelector('#save-owner');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Coletar dados do formulário
            const formData = new FormData(ownerForm);
            const ownerData = {
                id: formData.get('id') || Date.now().toString(),
                name: formData.get('name'),
                status: formData.get('status') || 'active',
                url: formData.get('url') || '',
                notes: formData.get('notes') || ''
            };
            
            // Verificar dados obrigatórios
            if (!ownerData.name) {
                alert('O nome do proprietário é obrigatório.');
                return;
            }
            
            // Salvar dados
            const savedSuccessfully = saveOwner(ownerData);
            
            if (savedSuccessfully) {
                // Fechar modal
                closeModal(ownerModal);
                
                // Atualizar tabela
                updateOwnersTable();
            } else {
                alert('Erro ao salvar o proprietário. Tente novamente.');
            }
        });
    }
    
    // Botão de cancelar
    const cancelButton = ownerModal.querySelector('button.btn:not(#save-owner)');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            closeModal(ownerModal);
        });
    }
}

// Modal de Grupo
function handleGroupModal() {
    // Seletor do modal
    const groupModal = document.getElementById('groupModal');
    if (!groupModal) return;
    
    // Seletor do formulário
    const groupForm = groupModal.querySelector('form') || groupModal.querySelector('#group-form');
    if (!groupForm) return;
    
    // Botão de salvar
    const saveButton = groupModal.querySelector('#save-group');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Coletar dados do formulário
            const formData = new FormData(groupForm);
            const groupData = {
                id: formData.get('id') || Date.now().toString(),
                name: formData.get('name'),
                status: formData.get('status') || 'active',
                url: formData.get('url') || '',
                affiliateUrl: formData.get('affiliateUrl') || '',
                notes: formData.get('notes') || ''
            };
            
            // Verificar dados obrigatórios
            if (!groupData.name) {
                alert('O nome do grupo é obrigatório.');
                return;
            }
            
            // Salvar dados
            const savedSuccessfully = saveGroup(groupData);
            
            if (savedSuccessfully) {
                // Fechar modal
                closeModal(groupModal);
                
                // Atualizar tabela
                updateGroupsTable();
            } else {
                alert('Erro ao salvar o grupo. Tente novamente.');
            }
        });
    }
    
    // Botão de cancelar
    const cancelButton = groupModal.querySelector('button.btn:not(#save-group)');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            closeModal(groupModal);
        });
    }
}

// Modal de Bookmaker
function handleBookmakerModal() {
    // Seletor do modal
    const bookmakerModal = document.getElementById('bookmakerModal');
    if (!bookmakerModal) return;
    
    // Seletor do formulário
    const bookmakerForm = bookmakerModal.querySelector('form') || bookmakerModal.querySelector('#bookmaker-form');
    if (!bookmakerForm) return;
    
    // Botão de salvar
    const saveButton = bookmakerModal.querySelector('#save-bookmaker');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Coletar dados do formulário
            const formData = new FormData(bookmakerForm);
            
            // Dados básicos
            const bookmakerData = {
                id: formData.get('id') || Date.now().toString(),
                name: formData.get('name'),
                status: formData.get('status') || 'active',
                ownerId: formData.get('ownerId'),
                groupId: formData.get('groupId'),
                notes: formData.get('notes') || '',
                
                // Referências completas aos objetos relacionados
                owner: null,
                group: null,
                
                // Dados de geografia
                geographies: getSelectedGeographies(),
                
                // Dados de contatos
                contacts: getContacts(),
                
                // Dados de negociação
                deals: getDeals(),
                
                // Dados de faturamento
                billing: getBilling(),
                
                // URLs por geografia
                urls: getGeographyUrls()
            };
            
            // Resolver referências a owner e group
            if (bookmakerData.ownerId) {
                bookmakerData.owner = window.appData.owners.find(o => o.id === bookmakerData.ownerId) || null;
            }
            
            if (bookmakerData.groupId) {
                bookmakerData.group = window.appData.groups.find(g => g.id === bookmakerData.groupId) || null;
            }
            
            // Verificar dados obrigatórios
            if (!bookmakerData.name) {
                alert('O nome do bookmaker é obrigatório.');
                return;
            }
            
            // Salvar dados
            const savedSuccessfully = saveBookmaker(bookmakerData);
            
            if (savedSuccessfully) {
                // Fechar modal
                closeModal(bookmakerModal);
                
                // Atualizar tabela
                updateBookmakersTable();
            } else {
                alert('Erro ao salvar o bookmaker. Tente novamente.');
            }
        });
    }
    
    // Botão de cancelar
    const cancelButton = bookmakerModal.querySelector('button.btn:not(#save-bookmaker)');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            closeModal(bookmakerModal);
        });
    }
    
    // Funções auxiliares para coletar dados específicos do formulário
    
    // Geografias selecionadas
    function getSelectedGeographies() {
        const geographiesContainer = bookmakerModal.querySelector('.selected-geographies');
        if (!geographiesContainer) return [];
        
        const geographyTags = geographiesContainer.querySelectorAll('.geography-tag');
        return Array.from(geographyTags).map(tag => {
            return {
                code: tag.getAttribute('data-code'),
                name: tag.querySelector('.geography-name').textContent
            };
        });
    }
    
    // Contatos
    function getContacts() {
        const contactsContainer = bookmakerModal.querySelector('#contacts-container');
        if (!contactsContainer) return [];
        
        const contactCards = contactsContainer.querySelectorAll('.contact-card');
        return Array.from(contactCards).map(card => {
            const contact = {
                id: card.getAttribute('data-id') || Date.now().toString(),
                name: card.querySelector('.contact-name').textContent,
                role: card.querySelector('.contact-role').textContent,
                geographies: [],
                methods: []
            };
            
            // Geografias do contato
            const geographyTags = card.querySelectorAll('.contact-geography');
            contact.geographies = Array.from(geographyTags).map(tag => {
                return {
                    code: tag.getAttribute('data-code'),
                    name: tag.textContent
                };
            });
            
            // Métodos de contato
            const methodItems = card.querySelectorAll('.contact-method-item');
            contact.methods = Array.from(methodItems).map(item => {
                return {
                    type: item.querySelector('.contact-method-type').textContent,
                    value: item.querySelector('.contact-method-value').textContent
                };
            });
            
            return contact;
        });
    }
    
    // Negociações
    function getDeals() {
        const dealsContainer = bookmakerModal.querySelector('#deals-container');
        if (!dealsContainer) return { perGeography: false, general: null, byGeography: [] };
        
        const perGeography = dealsContainer.querySelector('.per-geography-toggle input').checked;
        
        // Dados gerais
        let general = null;
        const generalSection = dealsContainer.querySelector('.general-deal-section');
        if (generalSection && !generalSection.classList.contains('hidden')) {
            general = {
                games: getSelectedItemsFromContainer(generalSection.querySelector('.selected-games')),
                fees: {
                    cpa: generalSection.querySelector('input[name="general-cpa"]').value || '',
                    revshare: generalSection.querySelector('input[name="general-revshare"]').value || ''
                }
            };
        }
        
        // Dados por geografia
        const byGeography = [];
        const geographyItems = dealsContainer.querySelectorAll('.geography-deal-item');
        
        geographyItems.forEach(item => {
            byGeography.push({
                geography: {
                    code: item.getAttribute('data-code'),
                    name: item.querySelector('.geography-name').textContent
                },
                games: getSelectedItemsFromContainer(item.querySelector('.selected-games')),
                fees: {
                    cpa: item.querySelector('input[name$="-cpa"]').value || '',
                    revshare: item.querySelector('input[name$="-revshare"]').value || ''
                }
            });
        });
        
        return {
            perGeography,
            general,
            byGeography
        };
    }
    
    // Faturamento
    function getBilling() {
        const billingContainer = bookmakerModal.querySelector('#billing-container');
        if (!billingContainer) return { perGeography: false, general: null, byGeography: [] };
        
        const perGeography = billingContainer.querySelector('.per-geography-billing-toggle input').checked;
        
        // Dados gerais
        let general = null;
        const generalSection = billingContainer.querySelector('.general-billing-section');
        if (generalSection && !generalSection.classList.contains('hidden')) {
            general = {
                name: generalSection.querySelector('input[name="general-billing-name"]').value || '',
                email: generalSection.querySelector('input[name="general-billing-email"]').value || '',
                address: generalSection.querySelector('textarea[name="general-billing-address"]').value || '',
                taxId: generalSection.querySelector('input[name="general-billing-tax-id"]').value || ''
            };
        }
        
        // Dados por geografia
        const byGeography = [];
        const geographyItems = billingContainer.querySelectorAll('.geography-billing-item');
        
        geographyItems.forEach(item => {
            byGeography.push({
                geography: {
                    code: item.getAttribute('data-code'),
                    name: item.querySelector('.geography-name').textContent
                },
                name: item.querySelector('input[name$="-billing-name"]').value || '',
                email: item.querySelector('input[name$="-billing-email"]').value || '',
                address: item.querySelector('textarea[name$="-billing-address"]').value || '',
                taxId: item.querySelector('input[name$="-billing-tax-id"]').value || ''
            });
        });
        
        return {
            perGeography,
            general,
            byGeography
        };
    }
    
    // URLs por geografia
    function getGeographyUrls() {
        const urlContainer = bookmakerModal.querySelector('#url-geographies-container');
        if (!urlContainer) return [];
        
        const geographyFields = urlContainer.querySelectorAll('.geography-url-field');
        return Array.from(geographyFields).map(field => {
            return {
                geography: {
                    code: field.getAttribute('data-code'),
                    name: field.querySelector('.geography-name').textContent
                },
                url: field.querySelector('input[name$="-url"]').value || '',
                affiliateUrl: field.querySelector('input[name$="-affiliate-url"]').value || ''
            };
        });
    }
    
    // Função auxiliar para obter itens selecionados de um container
    function getSelectedItemsFromContainer(container) {
        if (!container) return [];
        
        const selectedItems = container.querySelectorAll('.selected-item');
        return Array.from(selectedItems).map(item => {
            return {
                id: item.getAttribute('data-id'),
                name: item.querySelector('.item-name').textContent
            };
        });
    }
}

// Função para fechar uma modal
function closeModal(modal) {
    if (!modal) return;
    
    // Se tiver classe Bootstrap
    if (typeof bootstrap !== 'undefined') {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
            bsModal.hide();
            return;
        }
    }
    
    // Método alternativo
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    
    // Remover backdrop se existir
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
}

// Inicializar handlers nas modais quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar handlers das modais
    handleOwnerModal();
    handleGroupModal();
    handleBookmakerModal();
});
