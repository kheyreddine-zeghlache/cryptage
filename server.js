/*************************************************************************
*   Chargement des modules nécessaires au fonctionnement du serveur      *
*                et Configuration du serveur express                     *
**************************************************************************/

// Chargement des modules nécessaires
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configuration du serveur express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des middleware
app.use(express.static(__dirname)); // Servir les fichiers statiques depuis le répertoire racine
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route principale vers la page de connexion
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/page_de_connexion/page_accueil.html'));
});

/*********************************************************************
*              Connexion à la base de données MongoDB                *
**********************************************************************/

// URL de connexion MongoDB (à remplacer par votre URL réelle)
const MONGO_URI = 'mongodb+srv://shieldcrypt:4gBn9ZMoRj3opvDx@cluster0.l4siktg.mongodb.net/ShieldCrypt';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connexion réussie à MongoDB');
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB :', err);
    });

// Vérification de la connexion à la base de données
mongoose.connection.on('connected', () => {
    console.log("Mongoose est connecté.");
});
mongoose.connection.on('error', (err) => {
    console.error("Erreur dans la connexion Mongoose :", err);
});

/*********************************************************************
*              Création du modèle pour les utilisateurs              *
**********************************************************************/

// Schéma pour la collection d'utilisateurs
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    class: String
});

// Création du modèle User basé sur ce schéma
const User = mongoose.model('User', userSchema, 'Users');

/*********************************************************************
*                   Route pour l'authentification                    *
**********************************************************************/

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Tentative de connexion avec :", email);

    if (!email || !password) {
        return res.json({ success: false, message: "Veuillez remplir tous les champs." });
    }

    try {
        // Rechercher l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.json({ success: false, message: "Email ou mot de passe incorrect." });
        }

        // Vérifier le mot de passe (en texte brut pour l'instant)
        if (user.password !== password) {
            return res.json({ success: false, message: "Email ou mot de passe incorrect." });
        }

        console.log("Connexion réussie pour :", email);
        
        // Stocker le prénom de l'utilisateur dans localStorage se fait côté client
        return res.json({ 
            success: true, 
            firstName: user.name.split(' ')[0], // Extrait le prénom du nom complet
            userClass: user.class // Change le nom de la propriété "class"
        });

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return res.json({ success: false, message: "Erreur interne du serveur." });
    }
});

/*********************************************************************
*                   Route pour les pages protégées                   *
**********************************************************************/

// Route vers la page action après connexion réussie
app.get('/frontend/choix_action/choix_action.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/choix_action/choix_action.html'));
});

// ROUTE API – doit être au-dessus du catch-all
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.json({ success: false, message: "Erreur interne du serveur." });
    }
});


// Nouvelle route pour le chiffrement AES
app.post('/api/crypt', (req, res) => {
    const { text } = req.body;
   
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python', ['./backend/crypto/aes_encrypt.py', text]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: "Erreur lors du chiffrement" });
        }
        res.json(JSON.parse(result));
    });
});

// Nouvelle route pour le déchiffrement AES
app.post('/api/decrypt', (req, res) => {
    const { encrypted, key } = req.body;
   
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python', ['./backend/crypto/aes_decrypt.py', encrypted, key]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: "Erreur lors du déchiffrement" });
        }
        res.json(JSON.parse(result));
    });
});


// Cette route doit venir APRÈS toutes les autres
app.get('*', (req, res) => {
    const requestPath = req.path;
    const filePath = path.join(__dirname, requestPath);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Erreur lors de l'envoi du fichier :", err);
            res.status(404).send('Page non trouvée');
        }
    });
});

app.post("/add-user", async (req, res) => {
    const { name, email, password, class: userClass } = req.body;

    if (!name || !email || !password || !userClass) {
        return res.json({ success: false, message: "Tous les champs sont requis." });
    }

    try {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Un utilisateur avec cet email existe déjà." });
        }

        const newUser = new User({ name, email, password, class: userClass });
        await newUser.save();

        res.json({ success: true, message: "Utilisateur ajouté avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        res.status(500).json({ success: false, message: "Erreur interne du serveur." });
    }
});





/*********************************************************************
*                   Démarrage du serveur                             *
**********************************************************************/

app.listen(PORT, () => {
    console.log(`Le serveur Cryptexis est en écoute sur le port ${PORT}`);
    console.log(`Accédez à l'application : http://localhost:${PORT}`);
});