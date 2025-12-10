const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(403).json({ message: 'Aucun token fourni' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Non autorisé' });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('roles');
    const isAdmin = user.roles.some(role => role.name === 'admin');
    
    if (isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Requiert un rôle admin' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const isInfermier = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('roles');
    const isInfermier = user.roles.some(role => role.name === 'infermier');
    
    if (isInfermier) {
      next();
    } else {
      res.status(403).json({ message: 'Requiert un rôle infirmier' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const isPatient = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('roles');
    const isPatient = user.roles.some(role => role.name === 'patient');
    
    if (isPatient) {
      next();
    } else {
      res.status(403).json({ message: 'Requiert un rôle patient' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isInfermier,
  isPatient
};