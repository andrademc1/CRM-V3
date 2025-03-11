
// Função que corrige a visibilidade dos botões auto-fill quando o modo por geografia está ativo
function fixBillingButtonsVisibility() {
  document.addEventListener('DOMContentLoaded', function() {
    // Aplicar imediatamente aos checkboxes existentes
    document.querySelectorAll('.per-geography-billing-checkbox').forEach(checkbox => {
      const billingCard = checkbox.closest('.billing-card');
      const generalAutoFillButtons = billingCard.querySelectorAll('.auto-fill-buttons:not([data-geography-code])');
      
      // Definir visibilidade inicial com base no estado atual do checkbox
      generalAutoFillButtons.forEach(button => {
        button.style.display = checkbox.checked ? 'none' : 'block';
      });
      
      // Adicionar evento para quando o checkbox mudar
      checkbox.addEventListener('change', function() {
        generalAutoFillButtons.forEach(button => {
          button.style.display = this.checked ? 'none' : 'block';
        });
      });
    });
    
    // Adicionando uma verificação periódica para garantir que os botões continuem ocultos
    setInterval(function() {
      document.querySelectorAll('.per-geography-billing-checkbox:checked').forEach(checkbox => {
        const billingCard = checkbox.closest('.billing-card');
        const generalAutoFillButtons = billingCard.querySelectorAll('.auto-fill-buttons:not([data-geography-code])');
        
        generalAutoFillButtons.forEach(button => {
          if (button.style.display !== 'none') {
            button.style.display = 'none';
          }
        });
      });
    }, 500); // Verificar a cada meio segundo
  });
}

// Executar a função
fixBillingButtonsVisibility();

// Também aplicar quando o DOM estiver totalmente carregado
window.addEventListener('load', fixBillingButtonsVisibility);
