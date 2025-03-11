
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
  
  // Transformar o select em um campo com pesquisa
  // Primeiro, escondemos o select original
  countrySelect.style.display = 'none';
  
  // Criar o contêiner para o campo de pesquisa e resultados
  const searchContainer = document.createElement('div');
  searchContainer.className = 'country-search-container';
  
  // Criar o campo de pesquisa
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'form-control country-search-input';
  searchInput.placeholder = 'Pesquisar país...';
  
  // Criar o contêiner para os resultados da pesquisa
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'country-search-results';
  resultsContainer.style.display = 'none';
  
  // Adicionar os elementos ao DOM
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(resultsContainer);
  countrySelect.parentNode.insertBefore(searchContainer, countrySelect.nextSibling);
  
  // Adicionar evento de input para pesquisar países
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    // Filtrar países com base no termo de pesquisa
    const filteredCountries = countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm)
    );
    
    // Exibir resultados
    updateSearchResults(filteredCountries, resultsContainer, countrySelect, searchInput);
    
    // Mostrar ou esconder o contêiner de resultados
    resultsContainer.style.display = filteredCountries.length > 0 && searchTerm.length > 0 ? 'block' : 'none';
  });
  
  // Esconder resultados ao clicar fora
  document.addEventListener('click', function(e) {
    if (!searchContainer.contains(e.target)) {
      resultsContainer.style.display = 'none';
    }
  });
  
  // Exibir todos os países ao clicar no campo de pesquisa
  searchInput.addEventListener('focus', function() {
    if (this.value === '') {
      updateSearchResults(countries, resultsContainer, countrySelect, searchInput);
      resultsContainer.style.display = 'block';
    }
  });
}

// Função para atualizar os resultados da pesquisa
function updateSearchResults(filteredCountries, resultsContainer, countrySelect, searchInput) {
  resultsContainer.innerHTML = '';
  
  // Limitar a 10 resultados para não sobrecarregar a interface
  const displayCountries = filteredCountries.slice(0, 10);
  
  displayCountries.forEach(country => {
    const resultItem = document.createElement('div');
    resultItem.className = 'country-result-item';
    resultItem.innerHTML = `${country.flag} ${country.name}`;
    
    // Ao clicar em um resultado
    resultItem.addEventListener('click', function() {
      // Atualizar o valor do select original
      countrySelect.value = country.code;
      
      // Atualizar o texto do campo de pesquisa
      searchInput.value = `${country.flag} ${country.name}`;
      
      // Esconder resultados
      resultsContainer.style.display = 'none';
      
      // Disparar evento de mudança no select original
      const event = new Event('change');
      countrySelect.dispatchEvent(event);
    });
    
    resultsContainer.appendChild(resultItem);
  });
  
  // Se não houver resultados
  if (displayCountries.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'country-no-results';
    noResults.textContent = 'Nenhum país encontrado';
    resultsContainer.appendChild(noResults);
  }
}

// Função para lidar com o envio do formulário
function handleOwnerFormSubmit(event) {
  event.preventDefault();
  
  // Aqui você adicionaria o código para processar os dados do formulário
  // Por exemplo, enviar para um servidor ou armazenar localmente
  
  alert('Owner adicionado com sucesso!');
  closeOwnerModal();
}

// Função para mudar entre as abas
function changeTab(tabName) {
  // Ocultar todas as abas e remover classe ativa
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Mostrar a aba selecionada e adicionar classe ativa
  if (tabName === 'settings') {
    document.getElementById('settingsTab').classList.add('active');
    document.querySelector('.tab:nth-child(1)').classList.add('active');
  } else if (tabName === 'billing') {
    document.getElementById('billingTab').classList.add('active');
    document.querySelector('.tab:nth-child(2)').classList.add('active');
  }
}

// Exportar funções para uso em outros arquivos
window.openOwnerModal = openOwnerModal;
window.closeOwnerModal = closeOwnerModal;
window.toggleBillingDetails = toggleBillingDetails;
window.handleOwnerFormSubmit = handleOwnerFormSubmit;
window.changeTab = changeTab;
