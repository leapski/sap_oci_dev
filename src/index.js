require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const punchoutRoutes = require('./routes/punchout');
const catalogRoutes = require('./routes/catalog');

const app = express();

// Trust proxy for rate limiting behind load balancers
app.set('trust proxy', 1);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/functions', punchoutRoutes);
app.use('/functions', catalogRoutes);

app.post('/hook', (req, res) => {
  res.send(`<pre>${JSON.stringify(req.body, null, 2)}</pre>`);
});

app.get('/hello', (req, res) => {
  res.send(`hello world`);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;