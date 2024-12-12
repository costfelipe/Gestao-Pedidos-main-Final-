document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const body = document.body;

    toggleBtn.addEventListener('click', () => {
        // Alterna a classe "expanded" na barra lateral
        sidebar.classList.toggle('expanded');
        // Ajusta o corpo para compensar a largura da barra lateral
        body.classList.toggle('sidebar-expanded');
    });
});