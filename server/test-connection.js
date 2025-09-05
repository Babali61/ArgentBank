// Script de test pour vérifier la connectivité
const axios = require('axios');

const testConnection = async () => {
  try {
    console.log('Test de connexion au serveur...');
    
    // Test de l'endpoint principal
    const response = await axios.get('https://argentbank-n2wz.onrender.com/');
    console.log('✅ Serveur accessible:', response.data);
    
    // Test de l'endpoint de login
    const loginResponse = await axios.post('https://argentbank-n2wz.onrender.com/api/v1/user/login', {
      email: 'tony@stark.com',
      password: 'password123'
    });
    console.log('✅ Login test réussi:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
};

testConnection();
