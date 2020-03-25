const routes = require('express').Router();

const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
