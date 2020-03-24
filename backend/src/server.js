const app = require('./app');

// Connection with MongoDB
// require('../src/database').connect();

// ease to deploy || Verify the environment
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log('@port', PORT);
});
