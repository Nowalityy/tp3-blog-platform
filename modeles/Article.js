const mongoose = require('mongoose');

const schemaArticle = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    minlength: [3, 'Le titre doit contenir au moins 3 caractères']
  },
  contenu: {
    type: String,
    required: [true, 'Le contenu est requis'],
    minlength: [10, 'Le contenu doit contenir au moins 10 caractères']
  },
  utilisateurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: [true, 'L\'auteur est requis'],
    index: true
  }
}, {
  timestamps: true
});

schemaArticle.index({ createdAt: -1 });
schemaArticle.index({ utilisateurId: 1, createdAt: -1 });

module.exports = mongoose.model('Article', schemaArticle);
