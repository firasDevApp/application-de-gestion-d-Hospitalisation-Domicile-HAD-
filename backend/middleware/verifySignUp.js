const User = require('../models/User');
const { Role } = require('../models/Role');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Vérifier username
    const userByUsername = await User.findOne({ username: req.body.username });
    if (userByUsername) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé' });
    }
    
    // Vérifier email
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    const roles = await Role.find({});
    const roleNames = roles.map(role => role.name);
    
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roleNames.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Le rôle ${req.body.roles[i]} n'existe pas`
        });
      }
    }
  }
  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};