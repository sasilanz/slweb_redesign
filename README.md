# Anleitungen für Sander Lückers Architektur Website

Diese Anleitung erklärt, wie du Bilder, Texte und Projekte auf deiner Website ändern kannst.

---

## 1. Neues Bild zu bestehendem Projekt hinzufügen

### Schritt 1: Bild vorbereiten
- Bild als JPG speichern
- Benennung: `[PROJEKT-KÜRZEL]-[NUMMER].jpg`
  - Beispiele: `TOE-11.jpg`, `KRK-20.jpg`, `BMS-10.jpg`
  - Bestehende Kürzel:
    - TOE = Tödistrasse
    - KRK = Krokusstrasse
    - BMS = Birmensdorferstrasse
    - BIJ = Bijenven

### Schritt 2: Bild hochladen
- Bild in den Ordner `img/` legen

### Schritt 3: Bild in index.html einfügen
Öffne `index.html` und suche das entsprechende Projekt (z.B. `<section id="Tödistrasse">`).

Füge folgenden Code an der gewünschten Stelle ein:

```html
<div class="Bilder" data-description="Hier kommt die Bildbeschreibung.<br><br>Photo © Fotografenname">
    <img src="img/TOE-11.jpg" alt="Tödistrasse Bild 11">
</div>
```

**Wichtig:**
- `data-description="..."` = Text, der links erscheint wenn das Bild bei 60% der Bildschirmhöhe ist
- `<br><br>` = Absatz im Text
- `alt="..."` = Alternative Bildbeschreibung (wichtig für Barrierefreiheit)

---

## 2. Bildtext (Beschreibung) anpassen

Suche in `index.html` nach dem entsprechenden Bild:

```html
<div class="Bilder" data-description="ALTER TEXT">
```

Ändere den Text im `data-description` Attribut:

```html
<div class="Bilder" data-description="NEUER TEXT<br><br>Photo © Fotografenname">
```

---

## 3. Bilderreihenfolge ändern

In `index.html`, innerhalb der `<section>` des Projekts:

- Verschiebe den ganzen `<div class="Bilder">...</div>` Block an die gewünschte Position
- Die Reihenfolge im HTML = Reihenfolge auf der Website

**Beispiel:**
Um Bild 3 vor Bild 2 zu setzen, schneide den kompletten `<div class="Bilder">` Block von Bild 3 aus und füge ihn vor Bild 2 ein.

---

## 4. Neues Projekt hinzufügen

Ein neues Projekt benötigt Änderungen an **3 Stellen** in `index.html`:

### Schritt 1: Projekt-Text in linker Spalte hinzufügen

Suche im HTML nach:
```html
<!-- Fixer Text für Projekte -->
```

Füge **nach** dem letzten Projekt-Text-Block ein:

```html
<div id="NeuesProjekt-text" class="project-description" style="display: none;">
    <p>Ort<br>Projekttyp<br>Auftraggeber<br>Jahr<br>Status (laufend/abgeschlossen)</p>
</div>
```

**Ersetze:**
- `NeuesProjekt` mit der ID deines Projekts (z.B. `Langstrasse`)
- Den Text mit den Projekt-Infos

### Schritt 2: Navigation ergänzen (2x)

**A) Desktop-Navigation:**
Suche nach:
```html
<div id="navigation-above" class="navigation">
```

Füge einen neuen Link hinzu:
```html
<a href="#NeuesProjekt">Projektname</a>
```

**B) Mobile-Navigation:**
Suche nach:
```html
<nav class="mobile-menu">
```

Füge dort auch den gleichen Link hinzu:
```html
<a href="#NeuesProjekt">Projektname</a>
```

### Schritt 3: Projekt-Section in rechter Spalte erstellen

Suche nach dem letzten Projekt (z.B. `<section id="Bijenven">`) und füge **davor** (vor der Info-Section!) ein:

```html
<!-- Projekt NeuesProjekt -->
<section id="NeuesProjekt">
    <div class="Bilder" data-description="Erste Bildbeschreibung.<br><br>Photo © Fotografenname">
        <img src="img/NEU-01.jpg" alt="Neues Projekt Bild 1">
    </div>
    
    <div class="Bilder" data-description="Zweite Bildbeschreibung.<br><br>Photo © Fotografenname">
        <img src="img/NEU-02.jpg" alt="Neues Projekt Bild 2">
    </div>
    
    <!-- Weitere Bilder hier hinzufügen -->
</section>
```

**Wichtig:**
- Die `id="NeuesProjekt"` muss überall gleich sein
- Bilder müssen im `img/` Ordner liegen
- Neues 3-Buchstaben-Kürzel für Bildnamen wählen

---

## 5. Projekt-Text ändern

Suche in `index.html` nach:
```html
<div id="Projektname-text" class="project-description">
```

Ändere den Text zwischen `<p>` und `</p>`:

```html
<div id="Tödistrasse-text" class="project-description" style="display: none;">
    <p>Neuer Ort<br>Neuer Typ<br>Direktauftrag<br>2025<br>laufend</p>
</div>
```

---

## 6. Startseiten-Bild ändern

Suche in `index.html` nach:
```html
<section id="home">
```

Ändere die Zeile:
```html
<img src="img/KRK-01.jpg" alt="Startseite - Aktuelles Projekt">
```

Ersetze `img/KRK-01.jpg` mit dem gewünschten Bild.

---

## 7. "Aktuell"-Text anpassen

Suche nach:
```html
<div id="home-text" class="project-description">
```

Ändere den Text:
```html
<div id="home-text" class="project-description" style="display: none;">
    <p>Aktuell<br>Neuer Text<br>weitere Zeile<br>Monat Jahr<br><br>Foto © Fotografenname</p>
</div>
```

---

## 8. Die 5 Fokus-Zeilen ändern

Suche in `index.html` nach:
```html
<div class="intro-text">
```

Ändere die 5 Zeilen:
```html
<div class="intro-text">
    Erste Zeile<br>
    Zweite Zeile<br>
    Dritte Zeile<br>
    Vierte Zeile<br>
    Fünfte Zeile
</div>
```

---
Hostpoint - Besonderes
Achtung bei neuen Bildern: Immer einen neuen Namen verwenden, sonst wird der Cache nicht aktualisiert

---

## Tipps

- **Backup:** Mache immer eine Kopie von `index.html` bevor du Änderungen machst
- **Testen:** Öffne `index.html` im Browser um deine Änderungen zu prüfen
- **Speichern:** Vergiss nicht zu speichern bevor du die Datei hochlädst
- **Reihenfolge:** Projekte erscheinen in der Reihenfolge wie sie im HTML stehen

---

## Kontakt für technische Fragen

Bei Problemen oder Fragen: Astrid kontaktieren
