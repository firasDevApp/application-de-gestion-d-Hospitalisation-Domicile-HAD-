const User = require('../models/User');
const { Role } = require('../models/Role');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    // Vérifier si un admin existe déjà
    const adminRole = await Role.findOne({ name: 'admin' });
    const adminUser = await User.findOne({ 
      'roles': adminRole._id 
    }).populate('roles');

    if (adminUser) {
      console.log('Admin existe déjà');
      return;
    }

    // Vérifier si l'utilisateur admin existe déjà
    const existingUser = await User.findOne({ 
      username: 'admin' 
    });

    if (existingUser) {
      // Si l'utilisateur existe mais n'a pas le rôle admin
      const adminRole = await Role.findOne({ name: 'admin' });
      existingUser.roles = [adminRole._id];
      await existingUser.save();
      console.log('Rôle admin ajouté à l\'utilisateur existant');
      return;
    }

    // Créer un nouvel utilisateur admin
    const roles = await Role.find({ name: { $in: ['admin', 'infermier'] } });
    const hashedPassword = bcrypt.hashSync('admin123', 8);

    const admin = new User({
      username: 'admin',
      email: 'admin@medical.com',
      password: hashedPassword,
      roles: roles.map(role => role._id),
      profile: {
        fullName: 'Administrateur Principal',
        phoneNumber: '+1234567890',
        dateOfBirth: new Date('1990-01-01'),
        address: 'Siège Social',
        licenseNumber: 'ADMIN-001',
        specialty: 'Administration'
      }
    });

    await admin.save();
    console.log('Utilisateur admin créé avec succès');
    console.log('Identifiants par défaut:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('⚠️ CHANGEZ LE MOT DE PASSE IMMÉDIATEMENT APRÈS LA PREMIÈRE CONNEXION ⚠️');

  } catch (err) {
    console.error('Erreur création admin:', err);
  }
};

const createDefaultUsers = async () => {
  try {
    // Créer des utilisateurs de test par défaut
    const patientRole = await Role.findOne({ name: 'patient' });
    const infermierRole = await Role.findOne({ name: 'infermier' });
    
    // Patient par défaut
    const existingPatient = await User.findOne({ username: 'patient' });
    if (!existingPatient) {
      const hashedPassword = bcrypt.hashSync('patient123', 8);
      const patient = new User({
        username: 'patient',
        email: 'patient@medical.com',
        password: hashedPassword,
        roles: [patientRole._id],
        profile: {
          fullName: 'Jean Dupont',
          phoneNumber: '+1234567891',
          dateOfBirth: new Date('1985-05-15'),
          address: '123 Rue de la Santé, Paris',
          bloodType: 'O+',
          allergies: ['Pénicilline', 'Arachides']
        }
      });
      await patient.save();
      console.log('Patient de test créé');
    }

    // Infirmier par défaut
    const existingInfermier = await User.findOne({ username: 'infermier' });
    if (!existingInfermier) {
      const hashedPassword = bcrypt.hashSync('infermier123', 8);
      const infermier = new User({
        username: 'infermier',
        email: 'infermier@medical.com',
        password: hashedPassword,
        roles: [infermierRole._id],
        profile: {
          fullName: 'Marie Curie',
          phoneNumber: '+1234567892',
          dateOfBirth: new Date('1990-03-20'),
          address: '456 Avenue des Soins, Lyon',
          licenseNumber: 'INF-2023-001',
          specialty: 'Soins Intensifs'
        }
      });
      await infermier.save();
      console.log('Infirmier de test créé');
    }

  } catch (err) {
    console.error('Erreur création utilisateurs de test:', err);
  }
};

module.exports = { createAdminUser, createDefaultUsers };