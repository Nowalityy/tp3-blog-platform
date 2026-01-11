const { verifierToken } = require('../utils/jwt');
const Utilisateur = require('../modeles/Utilisateur');

const authentification = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        message: 'Accès refusé. Vous devez être connecté.' 
      });
    }

    const decoded = verifierToken(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        message: 'Token invalide ou expiré.' 
      });
    }

    const utilisateur = await Utilisateur.findById(decoded.id).select('-motDePasse');
    
    if (!utilisateur) {
      return res.status(401).json({ 
        message: 'Utilisateur non trouvé.' 
      });
    }

    req.utilisateur = utilisateur;
    next();
  } catch (erreur) {
    res.status(500).json({ 
      message: 'Erreur d\'authentification.',
      erreur: erreur.message 
    });
  }
};

module.exports = authentification;
