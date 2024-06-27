const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const productRoute = require('./routes/productsRoutes');

require('dotenv').config();

const app = express();

app.use(cors());

// Configura morgan para que registre las solicitudes HTTP
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoute);

app.listen(port, () => {
    console.log(`Serve on port ${port}`);
});
