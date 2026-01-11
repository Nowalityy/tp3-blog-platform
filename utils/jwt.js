const jwt = require('jsonwebtoken');
require('dotenv').config();

const genererToken = (utilisateurId) => {
  return jwt.sign(
    { id: utilisateurId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const verifierToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (erreur) {
    return null;
  }
};

module.exports = { genererToken, verifierToken };
