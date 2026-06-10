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
// US-003: Einzelne Notiz über ihre ID anzeigen
router.get('/:id', (req, res) => {
    const notes = getNotes();
    // Sucht die Notiz, deren ID mit der ID aus der URL übereinstimmt
    const note = notes.find(n => n.id === req.params.id);

    if (!note) {
        return res.status(404).json({ error: 'Notiz nicht gefunden' });
    }
    res.json(note);
});

// US-007: Prüfungsrelevanz markieren
router.patch('/:id/mark-exam', (req, res) => {
    const notes = getNotes();
    const noteIndex = notes.findIndex(n => n.id === req.params.id);

    if (noteIndex === -1) {
        return res.status(404).json({ error: 'Notiz nicht gefunden' });
    }

    // Markierung setzen
    notes[noteIndex].examRelevant = true;

    // Aktualisierte Liste in der JSON-Datei speichern
    fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));

    res.json({ message: 'Erfolgreich als prüfungsrelevant markiert', note: notes[noteIndex] });
});
module.exports = router;