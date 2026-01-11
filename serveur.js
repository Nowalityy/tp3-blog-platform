const express = require('express');
const cookieParser = require('cookie-parser');
const connecterBaseDeDonnees = require('./config/baseDeDonnees');
const logger = require('./middleware/logger');
const routesAuth = require('./routes/auth');
const routesArticles = require('./routes/articles');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connecterBaseDeDonnees();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

app.use(express.static('public'));

app.use('/api/auth', routesAuth);
app.use('/api/articles', routesArticles);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route non trouvée.' 
  });
});

app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);
  res.status(500).json({ 
    message: 'Une erreur est survenue sur le serveur.',
    erreur: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Blog TP3 - Application prête\n`);
});
