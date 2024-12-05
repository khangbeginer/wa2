const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Body parser for POST requests
global.Vocab = require('./api/models/vocabSchema');
const routes = require('./api/routes/vocabRoutes'); 
const authRoutes = require('./api/routes/authRoutes');

// Set mongoose to use global promises (optional in recent versions)
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/vocab-builder', {
  // Removed deprecated options
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
//
// login nguoi dung
app.use('/api/auth', authRoutes);
///
// Initialize routesD
routes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
