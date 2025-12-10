const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Role = mongoose.model('Role', RoleSchema);

// Rôles par défaut
const initialRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: 'patient' }).save(),
        new Role({ name: 'infermier' }).save(),
        new Role({ name: 'admin' }).save()
      ]);
      console.log('Rôles initiaux créés');
    }
  } catch (err) {
    console.error('Erreur création rôles:', err);
  }
};

module.exports = { Role, initialRoles };