const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Der Pfad zu unserer JSON-Datei
const dataPath = path.join(__dirname, '../../data/notes.json');

// Hilfsfunktion: Notizen aus der Datei lesen
const getNotes = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data || '[]'); 
};

// US-002: Alle Notizen anzeigen
router.get('/', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

// US-001: Neue Notiz erstellen
router.post('/', (req, res) => {
    const notes = getNotes();
    
    const newNote = {
        id: Date.now().toString(),
        fach: req.body.fach,
        titel: req.body.titel,
        inhalt: req.body.inhalt,
        examRelevant: req.body.examRelevant || false,
        timestamp: new Date().toISOString()
    };
    
    notes.push(newNote);
    fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));
    
    res.status(201).json(newNote);
});

module.exports = router;