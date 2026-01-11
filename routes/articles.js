const express = require('express');
const Article = require('../modeles/Article');
const authentification = require('../middleware/auth');

const routeur = express.Router();

routeur.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('utilisateurId', 'nomUtilisateur')
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des articles.',
      erreur: erreur.message 
    });
  }
});

routeur.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('utilisateurId', 'nomUtilisateur email');

    if (!article) {
      return res.status(404).json({ 
        message: 'Article non trouvé.' 
      });
    }

    res.json(article);
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'article.',
      erreur: erreur.message 
    });
  }
});

routeur.post('/', authentification, async (req, res) => {
  try {
    const { titre, contenu } = req.body;

    if (!titre || !contenu) {
      return res.status(400).json({ 
        message: 'Le titre et le contenu sont requis.' 
      });
    }

    const nouvelArticle = await Article.create({
      titre,
      contenu,
      utilisateurId: req.utilisateur._id
    });

    const articleComplet = await Article.findById(nouvelArticle._id)
      .populate('utilisateurId', 'nomUtilisateur');

    res.status(201).json({
      message: 'Article créé avec succès !',
      article: articleComplet
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'article.',
      erreur: erreur.message 
    });
  }
});

routeur.put('/:id', authentification, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ 
        message: 'Article non trouvé.' 
      });
    }

    if (article.utilisateurId.toString() !== req.utilisateur._id.toString()) {
      return res.status(403).json({ 
        message: 'Vous n\'êtes pas autorisé à modifier cet article.' 
      });
    }

    const { titre, contenu } = req.body;

    if (titre) article.titre = titre;
    if (contenu) article.contenu = contenu;

    await article.save();

    const articleMisAJour = await Article.findById(article._id)
      .populate('utilisateurId', 'nomUtilisateur');

    res.json({
      message: 'Article modifié avec succès !',
      article: articleMisAJour
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la modification de l\'article.',
      erreur: erreur.message 
    });
  }
});

routeur.delete('/:id', authentification, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ 
        message: 'Article non trouvé.' 
      });
    }

    if (article.utilisateurId.toString() !== req.utilisateur._id.toString()) {
      return res.status(403).json({ 
        message: 'Vous n\'êtes pas autorisé à supprimer cet article.' 
      });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({ 
      message: 'Article supprimé avec succès !' 
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de l\'article.',
      erreur: erreur.message 
    });
  }
});

module.exports = routeur;
