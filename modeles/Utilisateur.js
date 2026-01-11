const mongoose = require('mongoose');

const schemaUtilisateur = new mongoose.Schema({
  nomUtilisateur: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    unique: true,
    trim: true,
    minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
    index: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir un email valide'],
    index: true
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  }
}, {
  timestamps: true
});

schemaUtilisateur.index({ email: 1, nomUtilisateur: 1 });

module.exports = mongoose.model('Utilisateur', schemaUtilisateur);
