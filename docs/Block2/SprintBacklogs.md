# Sprint Backlogs und Entwicklungs-Dokumentation (Block 2)

Dieses Dokument dokumentiert die agile Planung, Schätzung und technische Umsetzung der Notizen-REST-API über zwei Sprints hinweg.

---

## 1. Sprint 1: Fundament & Basis-Features

### Sprint 1 Ziel
Entwicklung eines funktionsfähigen "Walking Skeleton" (Basis-Backend) auf Node.js- und Express-Basis, das grundlegende Lese- und Schreibzugriffe auf eine JSON-Datenbank ermöglicht.

### Sprint 1 User Stories & Aufwandsschätzung
Die Stories wurden im Team mittels Planning Poker geschätzt:
* **US-001: Notiz erstellen (3 SP)**
* **US-002: Alle Notizen auflisten (3 SP)**
* **US-003: Einzelne Notiz anzeigen (2 SP)**
* **US-007: Notiz als prüfungsrelevant markieren (2 SP)**

### Technische Task-Zerlegung (Sprint 1 Backlog)

#### US-001: Notiz erstellen (POST)
* Task 1.1: Express-Server-Infrastruktur aufsetzen (`src/index.js`) und Port 3000 öffnen.
* Task 1.2: Middleware für JSON-Parsing aktivieren (`express.json()`).
* Task 1.3: `POST /api/notes` Endpunkt einrichten.
* Task 1.4: ID-Generierung über `Date.now()` und Datumsstempel über `new Date().toISOString()` einbauen.
* Task 1.5: Persistente Speicherung im Dateisystem mittels `fs.writeFileSync` in `data/notes.json` umsetzen.

#### US-002: Alle Notizen auflisten (GET)
* Task 2.1: `GET /api/notes` Endpunkt einrichten.
* Task 2.2: Hilfsfunktion `getNotes()` zum sicheren Einlesen und Parsen der `notes.json` implementieren.
* Task 2.3: Fehlerbehandlung für den Fall integrieren, dass die JSON-Datei noch leer ist oder fehlt.

#### US-003: Einzelne Notiz anzeigen (GET mit ID)
* Task 3.1: Dynamische Route `GET /api/notes/:id` definieren.
* Task 3.2: Array-Methode `find()` nutzen, um den passenden Datensatz anhand des URL-Parameters `req.params.id` zu isolieren.
* Task 3.3: Fehlerbehandlung mit HTTP-Statuscode `404 Not Found` einbauen, falls die ID nicht existiert.

#### US-007: Prüfungsrelevanz markieren (PATCH)
* Task 7.1: Spezifische Route `PATCH /api/notes/:id/mark-exam` anlegen.
* Task 7.2: Notiz im Array lokalisieren (`findIndex()`) und den Boolean-Wert `examRelevant` fest auf `true` setzen.
* Task 7.3: Daten-Update zurück in die `notes.json` schreiben und aktualisiertes Objekt zurückgeben.

### Sprint 1 Review & Velocity
Alle für Sprint 1 eingeplanten User Stories wurden erfolgreich umgesetzt, im Team reviewed und getestet.
* **Berechnete Sprint 1 Velocity:** **10 Story Points** (3 + 3 + 2 + 2)

---

## 2. Sprint 2: Datenpflege, Suche & Filterung

### Sprint 2 Ziel
Den CRUD-Zyklus der API vollständig abschließen und das System um fortgeschrittene Such- sowie Filterfunktionen für den Anwender erweitern.

### Sprint 2 User Stories & Aufwandsschätzung
Die verbleibenden Stories für den zweiten Entwicklungszyklus wurden ebenfalls via Planning Poker bewertet:
* **US-004: Notiz bearbeiten (3 SP)**
* **US-005: Notiz löschen (2 SP)**
* **US-006: Volltextsuche (3 SP)**
* **US-008: Nach Prüfungsrelevanz filtern (3 SP)**

### Technische Task-Zerlegung (Sprint 2 Backlog)

#### US-004: Notiz bearbeiten (PUT)
* Task 4.1: Dynamische Route `PUT /api/notes/:id` anlegen.
* Task 4.2: Abgleich der ID und Auslesen der geänderten Felder (`fach`, `titel`, `inhalt`, `examRelevant`) aus dem Request-Body.
* Task 4.3: Validierung einbauen, damit nur existierende und mitgeschickte Werte im Speicher-Array überschrieben werden (`undefined`-Prüfung).
* Task 4.4: Datenbestand in `notes.json` aktualisieren.

#### US-005: Notiz löschen (DELETE)
* Task 5.1: Dynamische Route `DELETE /api/notes/:id` bereitstellen.
* Task 5.2: JavaScript-Methode `filter()` anwenden, um ein neues Array zu erzeugen, das die zu löschende ID nicht mehr enthält.
* Task 5.3: Überprüfung einbauen, ob sich die Array-Länge verändert hat (falls nicht: `404 Not Found` zurückgeben).
* Task 5.4: Bereinigten Datenstand abspeichern.

#### US-008: Nach Prüfungsrelevanz filtern (GET - Spezifisch)
* Task 8.1: Die spezifische Route `GET /api/notes/filter/exam-relevant` definieren.
* Task 8.2: **Wichtig:** Die Route im Code *vor* den ID-basierten Routen platzieren, um Routing-Konflikte in Express zu vermeiden.
* Task 8.3: Filter-Logik implementieren, die ausschließlich Objekte liefert, bei denen gilt: `examRelevant === true`.

#### US-006: Volltextsuche (GET - Query Parameter)
* Task 6.1: Spezifische Route `GET /api/notes/search` anlegen (ebenfalls oberhalb der ID-Routen platziert).
* Task 6.2: Den URL-Suchparameter `req.query.q` auslesen und zur fehlertoleranten Suche mittels `.toLowerCase()` standardisieren.
* Task 6.3: Array filtern und mittels `.includes()` prüfen, ob der Suchbegriff im Titel, im Inhalt oder im Fach der Notiz auftaucht.

---

## 3. Product Backlog / Zukünftige Erweiterungen (Future Work)

Folgende User Story wurde im Rahmen des initialen Scopings erfasst, ist jedoch nicht Bestandteil des aktuellen MVP-Releases (Sprints 1 & 2) und verbleibt als priorisierter Eintrag im übergeordneten Product Backlog:

* **US-009: JSON-Export (Schätzung: 2 SP)**
  * *Beschreibung:* Als Nutzer möchte ich meine Notizdaten als eigenständige JSON-Datei herunterladen können, um Backups außerhalb des Servers zu sichern.
  * *Status:* Zurückgestellt für zukünftige Entwicklungszyklen (Release 3).