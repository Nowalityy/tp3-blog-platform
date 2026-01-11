const express = require('express');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../modeles/Utilisateur');
const { genererToken } = require('../utils/jwt');
const authentification = require('../middleware/auth');

const routeur = express.Router();

routeur.post('/inscription', async (req, res) => {
  try {
    const { nomUtilisateur, email, motDePasse } = req.body;

    if (!nomUtilisateur || !email || !motDePasse) {
      return res.status(400).json({ 
        message: 'Tous les champs sont requis.' 
      });
    }

    const utilisateurExistant = await Utilisateur.findOne({ 
      $or: [{ email }, { nomUtilisateur }] 
    });

    if (utilisateurExistant) {
      return res.status(400).json({ 
        message: 'Cet email ou nom d\'utilisateur est déjà utilisé.' 
      });
    }

    const motDePasseHash = await bcrypt.hash(motDePasse, 10);

    const nouvelUtilisateur = await Utilisateur.create({
      nomUtilisateur,
      email,
      motDePasse: motDePasseHash
    });

    const token = genererToken(nouvelUtilisateur._id);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: 'Inscription réussie !',
      utilisateur: {
        id: nouvelUtilisateur._id,
        nomUtilisateur: nouvelUtilisateur.nomUtilisateur,
        email: nouvelUtilisateur.email
      }
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de l\'inscription.',
      erreur: erreur.message 
    });
  }
});

routeur.post('/connexion', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ 
        message: 'Email et mot de passe requis.' 
      });
    }

    const utilisateur = await Utilisateur.findOne({ email });

    if (!utilisateur) {
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect.' 
      });
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);

    if (!motDePasseValide) {
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect.' 
      });
    }

    const token = genererToken(utilisateur._id);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Connexion réussie !',
      utilisateur: {
        id: utilisateur._id,
        nomUtilisateur: utilisateur.nomUtilisateur,
        email: utilisateur.email
      }
    });
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur lors de la connexion.',
      erreur: erreur.message 
    });
  }
});

routeur.get('/moi', authentification, async (req, res) => {
  res.json({
    utilisateur: req.utilisateur
  });
});

routeur.post('/deconnexion', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Déconnexion réussie !' });
});

module.exports = routeur;
