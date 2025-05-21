const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://shieldcrypt:4gBn9ZMoRj3opvDx@cluster0.l4siktg.mongodb.net/ShieldCrypt';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  class: String
});

const User = mongoose.model('User', userSchema, 'Users');


mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ Connecté à MongoDB");

    const users = await User.find();
    console.log("📋 Utilisateurs dans la base :\n", users);

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Erreur de connexion :", err);
  });
