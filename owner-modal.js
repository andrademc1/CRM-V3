
// Função para abrir a modal de adicionar owner
function openOwnerModal() {
  const modal = document.getElementById('ownerModal');
  modal.style.display = 'block';
  
  // Reset form
  document.getElementById('ownerForm').reset();
  
  // Por padrão, a opção "Apply Billing Details by Owner" é "NO"
  document.getElementById('billingDetailsContainer').style.display = 'none';
  
  // Carregar países para o dropdown
  loadCountries();
}

// Função para fechar a modal
function closeOwnerModal() {
  const modal = document.getElementById('ownerModal');
  modal.style.display = 'none';
}

// Fechar modal quando clicar fora dela
window.addEventListener('click', function(event) {
  const modal = document.getElementById('ownerModal');
  if (event.target == modal) {
    closeOwnerModal();
  }
});

// Função para alternar a exibição dos campos de detalhes de faturamento
function toggleBillingDetails() {
  const applyBilling = document.querySelector('input[name="applyBilling"]:checked').value;
  const billingDetailsContainer = document.getElementById('billingDetailsContainer');
  
  if (applyBilling === 'yes') {
    billingDetailsContainer.style.display = 'block';
  } else {
    billingDetailsContainer.style.display = 'none';
  }
}

// Função para carregar os países no dropdown
function loadCountries() {
  const countrySelect = document.getElementById('country');
  
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

// Função para lidar com o envio do formulário
function handleOwnerFormSubmit(event) {
  event.preventDefault();
  
  // Aqui você adicionaria o código para processar os dados do formulário
  // Por exemplo, enviar para um servidor ou armazenar localmente
  
  alert('Owner adicionado com sucesso!');
  closeOwnerModal();
}

// Exportar funções para uso em outros arquivos
window.openOwnerModal = openOwnerModal;
window.closeOwnerModal = closeOwnerModal;
window.toggleBillingDetails = toggleBillingDetails;
window.handleOwnerFormSubmit = handleOwnerFormSubmit;
