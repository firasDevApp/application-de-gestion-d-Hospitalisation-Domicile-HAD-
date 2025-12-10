const User = require('../models/User');
const { Role } = require('../models/Role');
const bcrypt = require('bcryptjs');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('roles', 'name');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('roles', 'name');
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { username, email, profile } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Mettre à jour les champs
    if (username) user.username = username;
    if (email) user.email = email;
    if (profile) user.profile = { ...user.profile, ...profile };
    
    await user.save();
    
    res.status(200).json({
      message: 'Utilisateur mis à jour',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Empêcher la suppression de l'admin principal
    if (user.username === 'admin') {
      return res.status(400).json({ message: 'Impossible de supprimer l\'admin principal' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour les rôles d'un utilisateur
exports.updateUserRoles = async (req, res) => {
  try {
    const { roles } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Trouver les rôles
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map(role => role._id);
    
    await user.save();
    
    res.status(200).json({
      message: 'Rôles mis à jour',
      roles: foundRoles.map(role => role.name)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouvel utilisateur (admin seulement)
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, roles, profile } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Nom d\'utilisateur ou email déjà utilisé' 
      });
    }
    
    // Hacher le mot de passe
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    // Trouver les rôles
    let userRoles;
    if (roles && roles.length > 0) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      userRoles = foundRoles.map(role => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: 'patient' });
      userRoles = [defaultRole._id];
    }
    
    // Créer l'utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
      roles: userRoles,
      profile
    });
    
    await user.save();
    
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: roles || ['patient']
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};