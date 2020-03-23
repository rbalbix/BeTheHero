require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const cors = require('cors');

// Separa a lógica de criação do servidor da lógica de alocação da porta.
// Quando for executar os testes, não quero que aloque portas. Testes direto dentro da aplicação
class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.disable('x-powered-by');
    this.express.use(cors());
    // To understand body with json format
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new AppController().express;
