const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { initialRoles } = require('./models/Role');
const { createAdminUser, createDefaultUsers } = require('./config/initialSetup');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

// Connexion à MongoDB
const dbConfig = require('./config/db');
mongoose.connect(dbConfig.url)
.then(async () => {  // Ajout de async ici
  console.log('Connecté à MongoDB');

  // Utiliser await car ces fonctions sont asynchrones
  await initialRoles(); // Créer les rôles par défaut
  await createAdminUser(); // Créer l'admin
  await createDefaultUsers(); // Créer les utilisateurs par défaut
})
.catch(err => {
  console.error('Erreur de connexion MongoDB:', err);
  process.exit();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Route test
app.get('/', (req, res) => {
  res.json({ message: 'API d\'authentification médicale' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});