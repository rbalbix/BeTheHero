const routes = require('express').Router();

routes.get('/', (req, res) => {
  return res.json({ name: 'Ricardo' });
});

module.exports = routes;
