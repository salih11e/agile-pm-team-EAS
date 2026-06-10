const express = require('express');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(express.json()); // Erlaubt das Parsen von JSON-Eingaben

// Hier binden wir die Routen ein
app.use('/api/notes', noteRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}...`));