
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
