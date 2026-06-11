const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Pfad zur Datenbank-Datei
const dataPath = path.join(__dirname, '../../data/notes.json');

// Hilfsfunktion: Notizen aus der JSON-Datei sicher auslesen
function getNotes() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return []; // Falls die Datei leer ist oder fehlt, leeres Array zurückgeben
    }
}

// ==========================================
// ALLGEMEINE & SPEZIFISCHE ROUTEN
// ==========================================

// US-002: Alle Notizen anzeigen
router.get('/', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

// US-001: Neue Notiz erstellen
router.post('/', (req, res) => {
    const notes = getNotes();
    
    // Neue Notiz aus dem Request-Body zusammenbauen
    const newNote = {
        id: Date.now().toString(), // Automatische ID
        fach: req.body.fach || "Ohne Fach",
        titel: req.body.titel || "Ohne Titel",
        inhalt: req.body.inhalt || "",
        examRelevant: false, // Standardmäßig nicht prüfungsrelevant
        createdAt: new Date().toISOString()
    };

    notes.push(newNote);
    fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));

    res.status(201).json({ message: 'Notiz erstellt', note: newNote });
});

// US-008: Nach Prüfungsrelevanz filtern (Muss VOR /:id stehen!)
router.get('/filter/exam-relevant', (req, res) => {
    const notes = getNotes();
    const relevantNotes = notes.filter(n => n.examRelevant === true);
    res.json(relevantNotes);
});

// US-006: Volltextsuche (Muss VOR /:id stehen!)
router.get('/search', (req, res) => {
    const notes = getNotes();
    const query = req.query.q?.toLowerCase(); 
    
    if (!query) {
        return res.json(notes);
    }

    const results = notes.filter(n => 
        n.titel.toLowerCase().includes(query) || 
        n.inhalt.toLowerCase().includes(query) ||
        n.fach.toLowerCase().includes(query)
    );
    res.json(results);
});


// ==========================================
// DYNAMISCHE ROUTEN (Mit ID Parameter)
// ==========================================

// US-003: Einzelne Notiz anzeigen
router.get('/:id', (req, res) => {
    const notes = getNotes();
    const note = notes.find(n => n.id === req.params.id);

    if (!note) return res.status(404).json({ error: 'Notiz nicht gefunden' });
    res.json(note);
});

// US-007: Prüfungsrelevanz markieren
router.patch('/:id/mark-exam', (req, res) => {
    const notes = getNotes();
    const index = notes.findIndex(n => n.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Notiz nicht gefunden' });

    notes[index].examRelevant = true;
    fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));

    res.json({ message: 'Als prüfungsrelevant markiert', note: notes[index] });
});

// US-004: Notiz bearbeiten
router.put('/:id', (req, res) => {
    const notes = getNotes();
    const index = notes.findIndex(n => n.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Notiz nicht gefunden' });

    const { fach, titel, inhalt, examRelevant } = req.body;
    
    // Nur Werte überschreiben, die auch mitgeschickt wurden
    if (fach !== undefined) notes[index].fach = fach;
    if (titel !== undefined) notes[index].titel = titel;
    if (inhalt !== undefined) notes[index].inhalt = inhalt;
    if (examRelevant !== undefined) notes[index].examRelevant = examRelevant;

    fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));
    res.json({ message: 'Notiz aktualisiert', note: notes[index] });
});

// US-005: Notiz löschen
router.delete('/:id', (req, res) => {
    let notes = getNotes();
    const initialLength = notes.length;
    
    // Filtere alle Notizen heraus, die NICHT die gesuchte ID haben
    notes = notes.filter(n => n.id !== req.params.id);

    if (notes.length === initialLength) {
        return res.status(404).json({ error: 'Notiz nicht gefunden' });
    }

    fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2));
    res.json({ message: 'Notiz erfolgreich gelöscht' });
});

module.exports = router;