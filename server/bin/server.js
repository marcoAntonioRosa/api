require('dotenv').config()
const app = require('../app')
const port = process.env.DB_PORT || 3000;
app.listen(port)