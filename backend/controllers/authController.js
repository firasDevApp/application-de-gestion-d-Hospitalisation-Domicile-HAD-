const User = require('../models/User');
const { Role } = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription
exports.signup = async (req, res) => {
  try {
    const { username, email, password, roles, profile } = req.body;
    
    // Hacher le mot de passe
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    // Créer l'utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
      profile
    });
    
    // Assigner les rôles
    if (roles && roles.length > 0) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map(role => role._id);
    } else {
      // Rôle par défaut : patient
      const defaultRole = await Role.findOne({ name: 'patient' });
      user.roles = [defaultRole._id];
    }
    
    // Sauvegarder l'utilisateur
    await user.save();
    
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Connexion
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Chercher l'utilisateur
    const user = await User.findOne({ email }).populate('roles');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Vérifier le mot de passe
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: 'Mot de passe incorrect'
      });
    }
    
    // Générer le token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 86400 } // 24 heures
    );
    
    // Récupérer les rôles
    const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);
    
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      profile: user.profile,
      accessToken: token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Changer le mot de passe
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Vérifier le mot de passe actuel
    const passwordIsValid = bcrypt.compareSync(currentPassword, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ 
        message: 'Mot de passe actuel incorrect' 
      });
    }
    
    // Hacher le nouveau mot de passe
    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    user.password = hashedPassword;
    
    await user.save();
    
    res.status(200).json({ 
      message: 'Mot de passe changé avec succès' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};