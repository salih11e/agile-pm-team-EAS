# Sprint Backlogs & Task-Zerlegung

## Sprint 1 Backlog
**Sprint Goal:** Basis Notizen-App mit Erstellen-, Lese- und Markierungsfunktion in Node.js.
**Velocity:** 10 Story Points abgeschlossen.

* **US-001: Notiz erstellen (3 SP)**
  * Task 1.1: Express.js Projekt initialisieren und `POST`-Route anlegen.
  * Task 1.2: JSON-Body parsen (Titel, Fach, Inhalt).
  * Task 1.3: Neue Notiz mit generierter ID und Zeitstempel in `notes.json` speichern.
* **US-002: Notizen nach Fach anzeigen (3 SP)**
  * Task 2.1: `GET`-Route für alle Notizen anlegen.
  * Task 2.2: Daten aus `notes.json` auslesen und als JSON-Response zurückgeben.
* **US-003: Einzelne Notiz anzeigen (2 SP)**
  * Task 3.1: `GET`-Route mit URL-Parameter `/:id` anlegen.
  * Task 3.2: Array durchsuchen und bei Nicht-Finden Fehler 404 werfen.
* **US-007: Prüfungsrelevanz markieren (2 SP)**
  * Task 7.1: `PATCH`-Route `/:id/mark-exam` anlegen.
  * Task 7.2: Boolean-Wert `examRelevant` im Array auf `true` setzen und speichern.

---

## Sprint 2 Backlog
**Sprint Goal:** Den CRUD-Zyklus vervollständigen und Notizen filterbar machen.
**Geplante Kapazität:** 8 Story Points (80% der Sprint 1 Velocity).

* **US-004: Notiz bearbeiten (3 SP)**
  * Task 4.1: `PUT`-Route mit `/:id` anlegen.
  * Task 4.2: Logik implementieren, um bestehende Felder der Notiz zu überschreiben.
  * Task 4.3: Aktualisiertes Array in `notes.json` sichern.
* **US-005: Notiz löschen (2 SP)**
  * Task 5.1: `DELETE`-Route mit `/:id` anlegen.
  * Task 5.2: `filter()`-Funktion auf das Array anwenden, um die ID zu entfernen.
  * Task 5.3: Bereinigtes Array in `notes.json` speichern.
* **US-008: Nach Prüfungsrelevanz filtern (3 SP)**
  * Task 8.1: Neue `GET`-Route `/exam-relevant` anlegen.
  * Task 8.2: Liste aus `notes.json` auslesen und nach `examRelevant === true` filtern.