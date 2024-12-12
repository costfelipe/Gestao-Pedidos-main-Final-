const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Usuário e senha padrão
const user = 'cafeteriaforte@gmail.com';
const password = 'Admin1234';

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const enteredEmail = emailInput.value;
    const enteredPassword = passwordInput.value;

    // Verifica se o usuário e senha estão corretos
    if (enteredEmail === user && enteredPassword === password) {
        // Redireciona para a página de pedidos
        window.location.href = 'pedido.html';
    } else {
        alert('Usuário ou senha inválidos');
    }
});