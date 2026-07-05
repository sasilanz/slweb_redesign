# Sander Lückers Architektur – Webseite

Statische One-Page-Seite (kein Framework, kein Build-Step): `index.html`, `styles.css`, `script.js`, Bilder in `img/`. Hosting bei Hoststar via SFTP (Details bei Astrid, nicht hier ablegen).

## WICHTIGSTE REGEL

**Bestehende Funktionalität, Layout und Texte werden NIE verändert.** Jede Änderung ist rein additiv (neue Section, neue Bilder, neue Nav-Links). Das gilt insbesondere für von Sander selbst verfasste/hochgeladene Inhalte (z.B. der "Aktuelles"-Text) — die bleiben unangetastet, auch wenn eine Anpassung inhaltlich naheliegend erscheint.

## Wie die Seite technisch funktioniert (wichtig vor jeder Änderung zu verstehen)

- Jedes "Projekt" ist eine `<section id="Name">` in der rechten Spalte (`.right-column`) plus ein zugehöriger Text-Stub `<div id="Name-text" class="project-description" style="display: none;">` in der linken Spalte (`.text-section`).
- **Neues Projekt/Sektion hinzufügen** = eine bestehende `<section>` kopieren, neue `id` vergeben, Bilder + zugehörigen Text-Stub anpassen. Das ist im HTML selbst so kommentiert.
- **Desktop-Navigation** (`#navigation-above` / `#navigation-below`) wird von `script.js` bei jedem Scroll automatisch aus `document.querySelectorAll('section')` neu gebaut. Die Reihenfolge im Nav entspricht 1:1 der DOM-Reihenfolge der `<section>`-Tags im HTML. Die im HTML hart codierten Links in `#navigation-above` sind nur ein Platzhalter vor dem ersten JS-Rendering — trotzdem beim Hinzufügen einer Section konsistent mitpflegen.
- **Mobile-Menü** (`<nav class="mobile-menu">`, Hamburger-Button) ist dagegen eine **statische Linkliste im HTML** — wird von JS **nie** neu aufgebaut, nur per `.open`-Klasse ein-/ausgeblendet. Neue Sections müssen hier **manuell** als `<a href="#Name">Name</a>` ergänzt werden, sonst fehlen sie im mobilen Menü.
- `Name-text` in der linken Spalte erscheint automatisch beim Scrollen, sobald die zugehörige Section aktiv ist (gleiche JS-Logik für Mobile und Desktop, keine Sonderfälle nötig) — ausser bei `Aktuelles-text`, das eine eigene Sonderbehandlung hat (nicht anfassen).
- Mobile: `.project-description` ist schmal (27% Breite, `overflow: hidden`) → Text im `-text`-Stub muss kurz bleiben (wie bei bestehenden Projekten: ~5 kurze Zeilen mit `<br>`).
- `body.home-active` / `body.info-active` CSS-Klassen sind toter Code, werden nirgends gesetzt — ignorieren.
- Bilder-Naming-Konvention: `KÜRZEL-NN.jpg` (z.B. `TOE-11.jpg`, `KRK-01.jpg`).

## Aktuelle Aufgabe: Sektion "Publikationen"

Ziel: Der Zeitschriftenbericht "Umarmung der Generationen" (umbauen+renovieren 4·2026, Text: Silvia Steidinger, Fotos: Willem Pab, über das Tödistrasse-Projekt) soll als neue Sektion "Publikationen" auf der Webseite erscheinen — als eigenständiges "Projekt" im bestehenden Pattern.

- **Position:** Ganz am Schluss der Navigation — DOM-Reihenfolge: nach `Bijenven`-Section, vor `Info`-Section.
- **Inhalt:** Die 6 PDF-Seiten (Datei liegt im Projektordner: `UR_4_26_FB_Report_Sander_Lueckers_S.26-36.pdf`) werden als Bilder exportiert (`PUB-01.jpg` … `PUB-06.jpg`) und wie normale Projektbilder eingebunden — **ohne** einzelne `data-description` pro Bild (Artikel-Layout spricht für sich, Zugehörigkeit ergibt sich durch die Section-Gruppierung).
- **Text-Stub** `Publikationen-text`: kurzer Hinweis im Stil der anderen Projekte (Ort, Publikation, Ausgabe, Autor:in, Fotograf), z.B.:
  ```
  Pfäffikon<br>Publikation<br>umbauen+renovieren 4·2026<br>Text: Silvia Steidinger<br>Fotos: Willem Pab
  ```
- **Aktuelles-Text bleibt exakt unverändert** — auch wenn er inhaltlich auf denselben Artikel verweist (Kiosk/Verlag-Bestellung). Das ist Sanders eigener Text.
- **Scope:** Nur dieser eine Artikel jetzt. Falls später weitere Presseberichte dazukommen, wird das nach demselben Pattern (neue Section) gelöst — keine Extra-Struktur dafür vorbauen.
- **Nicht vergessen:** Link in Desktop-Nav-Platzhalter (`#navigation-above` im HTML), Link im mobilen Hamburger-Menü (`.mobile-menu`), neue `<section id="Publikationen">` an der richtigen Stelle im DOM.
