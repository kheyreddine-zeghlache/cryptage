const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour parser les données JSON
app.use(express.json());

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/image', express.static(path.join(__dirname, 'image')));

// Simulation simple d’une route de login (facultatif)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Exemple simple : accepte n'importe quoi
    if (email && password) {
        res.json({ success: true, redirect: 'frontend/page_de_connexion/page_accueil.html' });
    } else {
        res.json({ success: false, message: "Identifiants incorrects" });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
