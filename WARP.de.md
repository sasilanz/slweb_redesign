# WARP.md

Diese Datei bietet WARP (warp.dev) Anleitungen für die Arbeit mit Code in diesem Repository.

## Architektur-Übersicht

Dies ist eine statische Portfolio-Website für Sander Lückers Architektur GmbH. Die Website verfügt über ein zweispaltiges Layout mit dynamischer Navigation und Bildgalerien zur Präsentation von Architekturprojekten.

### Kern-Architektur
- **Reines Vanilla JavaScript**: Keine Frameworks, Single-Page-Anwendung mit sanftem Scrollen
- **Responsive Design**: Desktop- und Mobile-Layouts mit CSS Media Queries (Breakpoint bei 768px)
- **Zweispaltiges Layout**: Fixe linke Seitenleiste mit dynamischer Navigation, scrollbare rechte Inhaltsfläche
- **Projekt-Struktur**: Section-basierter Inhalt mit individuellen Projekt-Galerien
- **Dynamisches Text-System**: Bildbeschreibungen erscheinen in der Seitenleiste basierend auf Scroll-Position

### Wichtige technische Komponenten
- **Scroll-basierte Navigation**: Aktive Section-Erkennung bei 60% Viewport-Höhe als Referenzpunkt
- **Dynamische Text-Updates**: Bildbeschreibungen werden dynamisch in der linken Spalte aktualisiert beim Scrollen
- **Mobile Menü**: Hamburger-Menü für Mobile-Ansicht mit Toggle-Funktion
- **Debounced Scroll Handler**: 50ms Debounce für Performance-Optimierung
- **Header-Sichtbarkeit**: Automatisch ausblendbarer Header auf Mobilgeräten beim Scrollen über Header-Höhe

## Entwicklungs-Workflow

### Kein Build-Prozess erforderlich
Dies ist eine statische Website ohne Build-Schritt. Dateien direkt bearbeiten und Browser aktualisieren, um Änderungen zu sehen.

### Änderungen lokal testen
```bash
# Option 1: Python Simple Server
python3 -m http.server 8000

# Option 2: PHP Built-in Server
php -S localhost:8000

# Dann http://localhost:8000 öffnen
```

### Änderungen deployen
Dateien direkt auf Webserver hochladen. Keine Kompilierung oder Bundling notwendig.

## Neue Projekte hinzufügen

### 1. Projekt-Section in HTML hinzufügen
In `index.html` eine neue `<section>` mit eindeutiger ID hinzufügen:
```html
<section id="NeuesProjekt">
    <div class="Bilder" data-description="Projektbeschreibungstext">
        <img src="img/PRJ-01.jpg" alt="Projektname Bild 1">
    </div>
    <!-- Weitere Bild-Divs nach Bedarf hinzufügen -->
</section>
```

### 2. Projekt-Text in linker Spalte hinzufügen
Im `.left-column` Bereich ein Projektbeschreibungs-Div hinzufügen:
```html
<div id="NeuesProjekt-text" class="project-description" style="display: none;">
    <p>Ort<br>Projekttyp<br>Auftraggeber<br>Jahr<br>Status</p>
</div>
```

### 3. Navigationslinks hinzufügen
Navigationslink an beiden Stellen hinzufügen:
- Innerhalb des `#navigation-above` Divs
- Innerhalb des Mobile Menüs `.mobile-menu`

```html
<a href="#NeuesProjekt">Projektname</a>
```

### 4. Bilder zum img/ Verzeichnis hinzufügen
- Konsistente Benennung verwenden: `PRJ-01.jpg`, `PRJ-02.jpg`, etc.
- Bilder sind typischerweise große JPEGs (1.5-5MB pro Bild)
- Beobachtete Namenskonventionen:
  - TOE = Tödistrasse
  - KRK = Krokusstrasse  
  - BMS = Birmensdorferstrasse
  - BIJ = Bijenven

## Dateistruktur und Zuständigkeiten

### index.html
- Vollständige Website-Struktur und Inhalt
- Alle Projekte als `<section>` Elemente definiert
- Projektbeschreibungen in linker Spalte als separate Divs
- Navigationslinks in fixem Header und dynamischen Bereichen

### script.js
- `updateActiveSection()`: Erkennt welche Section bei 60% Viewport-Höhe ist
- `updateNavigationDisplay()`: Zeigt passende Navigation über/unter aktivem Projekt
- `updateDynamicText()`: Aktualisiert Bildbeschreibung basierend auf Scroll-Position
- `handleHeaderScroll()`: Mobile Header-Sichtbarkeitslogik
- Mobile Menü Toggle-Handler

### styles.css
- **Desktop Styles** (`@media (min-width: 769px)`): Zweispaltiges Flex-Layout
- **Mobile Styles** (`@media (max-width: 768px)`): Einspaltig, gestapeltes Layout
- `.fixed-header`: Kontaktinfo und Website-Einführung
- `.text-section`: Enthält Projektbeschreibungen und dynamische Navigation
- `.right-column`: Scrollbare Bildgalerie
- `.Bilder`: Individueller Bild-Container mit Abständen

### Konfiguration
- `SCROLL_DEBOUNCE_MS = 50`: Scroll-Event Throttling
- `VIEWPORT_REFERENCE_PERCENT = 0.6`: Aktive Section-Erkennung (60% vom Viewport)

## Bildverwaltung

### Bilder zu bestehendem Projekt hinzufügen
1. Bilddatei zum `img/` Verzeichnis mit Projekt-Präfix hinzufügen (z.B. `TOE-11.jpg`)
2. Entsprechendes `<div class="Bilder">` in der Projekt-`<section>` hinzufügen
3. `data-description` Attribut für die Bildunterschrift einschließen
4. Beschreibenden `alt` Text für Barrierefreiheit verwenden

### Bildbenennungskonvention
- Projekt-Präfix (3 Buchstaben) + fortlaufende Nummer verwenden
- Beispiele: `TOE-01.jpg`, `KRK-15.jpg`, `BMS-09.jpg`
- Nummerierung innerhalb jedes Projekts fortlaufend halten

### Bildbeschreibungen
- Werden über `data-description` Attribut am `.Bilder` Div gesetzt
- Unterstützt HTML (verwende `<br><br>` für Absatzumbrüche)
- Photo-Credits einschließen: `Photo © Fotografenname`
- Beschreibungen erscheinen in linker Spalte wenn Bild bei 60% Viewport-Höhe ist

## Apache Konfiguration

### Cache-Kontrolle
Zwei `.htaccess` Varianten sind vorhanden:

**`.htaccessnocache`** - Entwicklungsmodus:
- Deaktiviert alle Caching für Bilder, CSS und JS
- Verwenden während aktiver Entwicklung/Tests
- Stellt sicher, dass Browser immer frischen Inhalt lädt

**`.htacceswithcache`** - Produktionsmodus:
- Bilder werden 30 Tage gecacht
- CSS/JS wird 7 Tage gecacht
- Bessere Performance für Besucher
- Zu `.htaccess` umbenennen zum Aktivieren

Um Modi zu wechseln, gewünschte Datei zu `.htaccess` umbenennen.

## Inhalts-Richtlinien

### Projekt-Text Format
Standardformat in linker Spalte:
```
Ort
Projekttyp
Auftraggeber (meist "Direktauftrag")
Jahr
Status (laufend/abgeschlossen)
```

### Navigationsstruktur
Projekte erscheinen in dieser Reihenfolge (von oben):
1. Home (Landing Page)
2. Tödistrasse (Pfäffikon)
3. Krokusstrasse (Dietikon)
4. Birmensdorferstrasse (Zürich)
5. Bijenven (Uitdam, NL)
6. Info (Über/Kontakt Sektion)

### Info Section - Spezielle Behandlung
Die Info-Sektion hat spezielles Scroll-Verhalten - scrollt zu 20% Viewport-Offset statt zum Anfang der Sektion (siehe `script.js` Zeilen 31-38).

## Responsive Verhalten

### Desktop (>768px)
- Zweispaltiges Flex-Layout (25% links, 75% rechts)
- Fixe linke Spalte mit scrollbarer rechter Spalte
- Standard-Navigationslinks
- Header immer sichtbar

### Mobile (≤768px)
- Einspaltig, gestapeltes Layout
- Hamburger-Menü (☰) für Navigation
- Automatisch ausblendbarer Header beim Scrollen
- Kleinere Schriftgrößen (10px Basis vs. 13.33px Desktop)
- Mobile Menü togglet mit `#menu-toggle` Button

## Wichtige Muster

### Scroll-Referenzpunkt-System
Die Website verwendet einen 60% Viewport-Höhen-Referenzpunkt für alle scroll-basierten Interaktionen:
- Aktive Section-Erkennung
- Dynamische Text-Updates
- Navigations-Zustandsänderungen

Dies schafft eine natürliche "Leseposition", wo Inhalt aktiv wird bevor er oben ankommt.

### Navigations-Split-Muster
Navigation teilt sich um das aktive Projekt:
- Links zu früheren Projekten erscheinen oben
- Aktiver Projekt-Link ist hervorgehoben (kursiv)
- Links zu späteren Projekten erscheinen unten

Dies bietet Kontext zur Position innerhalb des Portfolios.

### Data-Attribute
- `data-description`: Bildunterschriften (auf `.Bilder` Divs)
- `data-nav-name`: Optionaler benutzerdefinierter Navigationstext (auf `<section>` Elementen)
- `data-target-section`: Link-Ziel Section-ID (dynamisch von JS hinzugefügt)

## Häufige Änderungen

### Homepage-Bild ändern
Zeile 90 in `index.html` bearbeiten:
```html
<img src="img/KRK-01.jpg" alt="Startseite - Aktuelles Projekt">
```

### Projekte neu anordnen
1. Gesamte `<section>` Blöcke in HTML verschieben
2. Entsprechende Navigationslinks neu anordnen
3. Projektbeschreibungs-Divs in linker Spalte neu anordnen
4. JavaScript behandelt neue Reihenfolge automatisch

### Scroll-Timing anpassen
In `script.js` anpassen:
- `SCROLL_DEBOUNCE_MS`: Niedriger für reaktionsschneller, höher für bessere Performance
- `VIEWPORT_REFERENCE_PERCENT`: Aktive Section-Auslösepunkt anpassen (0.6 = 60%)

### Bildabstände ändern
In `styles.css` die `.Bilder` Margin-Werte anpassen:
```css
.Bilder {
    margin-top: 50px;
    margin-bottom: 15%; /* Abstand zwischen Bildern */
}
```
