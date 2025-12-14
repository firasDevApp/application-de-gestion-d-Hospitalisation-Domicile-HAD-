const Visit = require('../models/Visit');

exports.demandeVisit = async (req, res) => {
  try {
    const {
      visitType,
      prefferedInfermier,
      date,
      time,
      description,
      symptoms
    } = req.body;

    if (!visitType || !date || !description) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const visit = new Visit({
      patient: req.userId,
      visitType,
      prefferedInfermier: prefferedInfermier || null,
      date,
      time,
      description,
      symptoms: symptoms || ''
    });

    await visit.save();

    res.status(201).json({
      message: 'Demande de visite enregistrée avec succès',
      visit
    });

  } catch (error) {
    console.error('Erreur création visite:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
