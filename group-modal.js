
// Função para abrir a modal de adicionar grupo
function openGroupModal() {
  const modal = document.getElementById('groupModal');
  modal.style.display = 'block';
  
  // Reset form
  document.getElementById('groupForm').reset();
  
  // Por padrão, todas as opções são "NO"
  document.getElementById('accountSettingsContainer').style.display = 'none';
  document.getElementById('billingSettingsContainer').style.display = 'none';
  document.getElementById('dealSettingsContainer').style.display = 'none';
  
  // Carregar países para o dropdown
  loadCountriesForGroup();
  
  // Carregar owners para o dropdown
  loadOwners();
}

// Função para fechar a modal
function closeGroupModal() {
  const modal = document.getElementById('groupModal');
  modal.style.display = 'none';
}

// Fechar modal quando clicar fora dela
window.addEventListener('click', function(event) {
  const modal = document.getElementById('groupModal');
  if (event.target == modal) {
    closeGroupModal();
  }
});

// Função para carregar os países no dropdown
function loadCountriesForGroup() {
  const countrySelect = document.getElementById('groupCountry');
  
  // Limpar opções existentes
  countrySelect.innerHTML = '<option value="">Selecione um país</option>';
  
  // Adicionar países do arquivo countries.js
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = `${country.flag} ${country.name}`;
    countrySelect.appendChild(option);
  });
}

// Função para carregar os owners no dropdown
function loadOwners() {
  // Esta função deveria carregar os owners de um banco de dados
  // Por enquanto, adicionaremos alguns exemplos
  const ownerSelect = document.getElementById('groupOwner');
  
  // Limpar opções existentes
  ownerSelect.innerHTML = '<option value="">Selecione um owner</option>';
  
  // Adicionar alguns owners de exemplo
  const owners = [
    { id: 1, name: "Owner A" },
    { id: 2, name: "Owner B" },
    { id: 3, name: "Owner C" }
  ];
  
  owners.forEach(owner => {
    const option = document.createElement('option');
    option.value = owner.id;
    option.textContent = owner.name;
    ownerSelect.appendChild(option);
  });
}

// Função para alternar a exibição dos campos de configurações da conta
function toggleAccountSettings() {
  const applyAccount = document.querySelector('input[name="applyAccountSettings"]:checked').value;
  const accountSettingsContainer = document.getElementById('accountSettingsContainer');
  
  if (applyAccount === 'yes') {
    accountSettingsContainer.style.display = 'block';
  } else {
    accountSettingsContainer.style.display = 'none';
  }
}

// Função para alternar a exibição dos campos de configurações de faturamento
function toggleBillingSettings() {
  const applyBilling = document.querySelector('input[name="applyBillingSettings"]:checked').value;
  const billingSettingsContainer = document.getElementById('billingSettingsContainer');
  
  if (applyBilling === 'yes') {
    billingSettingsContainer.style.display = 'block';
  } else {
    billingSettingsContainer.style.display = 'none';
  }
}

// Função para alternar a exibição dos campos de configurações de acordo
function toggleDealSettings() {
  const applyDeal = document.querySelector('input[name="applyDealSettings"]:checked').value;
  const dealSettingsContainer = document.getElementById('dealSettingsContainer');
  
  if (applyDeal === 'yes') {
    dealSettingsContainer.style.display = 'block';
  } else {
    dealSettingsContainer.style.display = 'none';
  }
}

// Função para lidar com o envio do formulário
function handleGroupFormSubmit(event) {
  event.preventDefault();
  
  // Aqui você adicionaria o código para processar os dados do formulário
  // Por exemplo, enviar para um servidor ou armazenar localmente
  
  alert('Grupo adicionado com sucesso!');
  closeGroupModal();
}

// Função para mudar entre as abas
function changeGroupTab(tabName) {
  // Ocultar todas as abas e remover classe ativa
  document.querySelectorAll('.group-tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  document.querySelectorAll('.group-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Mostrar a aba selecionada e adicionar classe ativa
  document.getElementById(tabName + 'Tab').classList.add('active');
  document.querySelector(`.group-tab[data-tab="${tabName}"]`).classList.add('active');
}

// Exportar funções para uso em outros arquivos
window.openGroupModal = openGroupModal;
window.closeGroupModal = closeGroupModal;
window.toggleAccountSettings = toggleAccountSettings;
window.toggleBillingSettings = toggleBillingSettings;
window.toggleDealSettings = toggleDealSettings;
window.handleGroupFormSubmit = handleGroupFormSubmit;
window.changeGroupTab = changeGroupTab;
