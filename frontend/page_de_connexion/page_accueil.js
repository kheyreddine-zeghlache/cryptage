// Fonction pour afficher/masquer le mot de passe
document.querySelector('.password-toggle').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
    this.textContent = passwordField.type === 'text' ? 'Masquer' : 'Afficher';
});

// Fonction de connexion à MongoDB via Flask
document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    const result = await response.json();

    if (result.success) {
        window.location.href = "frontend/choix_action/choix_action.html";
    } else {
        alert(result.message);
    }
});
