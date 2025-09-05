const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Modèle User (copié de userModel.js)
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

const User = mongoose.model('User', userSchema);

// Données des utilisateurs de test
const users = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    password: 'password123'
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    email: 'steve@rogers.com',
    password: 'password456'
  }
];

const populateDatabase = async () => {
  try {
    // Connexion à MongoDB
    const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/argenbank';
    await mongoose.connect(databaseUrl);
    console.log('✅ Connexion à la base de données réussie');

    // Vider la collection User
    await User.deleteMany({});
    console.log('🗑️ Collection User vidée');

    // Créer les utilisateurs
    for (const userData of users) {
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Créer l'utilisateur
      const user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword
      });

      await user.save();
      console.log(`✅ Utilisateur créé: ${userData.firstName} ${userData.lastName} (${userData.email})`);
    }

    console.log('🎉 Base de données peuplée avec succès !');
    console.log('\n📋 Comptes de test disponibles :');
    console.log('👤 Tony Stark - tony@stark.com / password123');
    console.log('👤 Steve Rogers - steve@rogers.com / password456');

  } catch (error) {
    console.error('❌ Erreur lors du peuplement de la base de données:', error);
  } finally {
    // Fermer la connexion
    await mongoose.connection.close();
    console.log('🔌 Connexion fermée');
    process.exit(0);
  }
};

// Exécuter le script
populateDatabase();