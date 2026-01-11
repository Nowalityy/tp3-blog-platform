const logger = (req, res, next) => {
  const date = new Date().toISOString();
  const methode = req.method;
  const chemin = req.path;
  
  console.log(`${date} - ${methode} ${chemin}`);
  
  next();
};

module.exports = logger;
