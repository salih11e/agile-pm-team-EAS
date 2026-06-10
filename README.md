Notizen-App (REST-API)

Node.js/Express-Anwendung zur Verwaltung von Notizen und Aufgaben.
Entstanden im Modul Agiles Projektmanagement (Sommersemester 2026) an der Hochschule RheinMain.

Team

• Enes Ersoy (Product Owner)
• Ajuub Husein (Scrum Master)
• Salih Erkut (Developer)
• [Dein Name] (Developer)

Beschreibung

Die Notizen-App ist eine REST-API-basierte Anwendung, die es Studierenden ermöglicht, Lerninhalte und Aufgaben strukturiert zu erfassen, abzurufen und zu verwalten. Sie unterstützt grundlegende CRUD-Funktionalitäten und speichert Daten persistent in einer lokalen JSON-Datei. Entwickelt wurde das Projekt iterativ in Sprints nach Scrum-Vorgaben.

Technologien

• Node.js
• Express.js
• Git / GitHub
• JSON (Datenpersistenz)

Getting Started / Installation

Voraussetzung: Installiertes Node.js (v14 oder höher).

1. Abhängigkeiten installieren: 
   npm install

2. Anwendung starten: 
   npm start (oder: node src/index.js)
   Der Server lauscht anschließend auf Port 3000.

Projektstruktur

/src: Enthält den Quellcode, aufgeteilt in Einstiegspunkt (index.js) und Routen-Definitionen (noteRoutes.js).
/data: Beinhaltet die lokale JSON-Datenbank (notes.json) zur Persistierung.
/docs/block2: Enthält die agile Projektdokumentation (Backlogs, Story Map, Retrospektive, Reflexionsbogen).

API-Endpunkte & Sprint-Übersicht (Sprint 1)

• POST /api/notes: Notiz erstellen (US-001)
• GET /api/notes: Alle Notizen nach Fach anzeigen (US-002)
• GET /api/notes/:id: Einzelne Notiz über ID anzeigen (US-003)
• PATCH /api/notes/:id/mark-exam: Prüfungsrelevanz einer Notiz markieren (US-007)