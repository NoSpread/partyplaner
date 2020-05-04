# partyplaner
🐱‍🐉

Projekt ist betriebsbereit!<br>
-> /HTML/partyplaner.html<br>
Demo-Video: https://www.youtube.com/watch?v=ub82Xb1C8os

Bisher wird das Einlesen der Spieleinformationen nur von Datei unterstützt -> testdaten.json<br>


TODO<br>
- Verwendung der Konfiguration<br>
- grafische Oberfläche zur Eingabe der Daten<br>


Darstellung: Kevin<br>
Befindlichkeit: Florian<br>
Statistik: Lukas<br>
Import_Export: Moritz<br>
Konfiguration: Julian<br>
Steuerung: Peter<br>

Daten<br>

Player-> {<br>
name, <br>
job,<br>
short,<br>
happiness, //double<br>
xPos, //int<br>
yPos, //int<br>
distances[]<br>
}<br>
<br>
distances -> {<br>
player,<br>
distance<br>
}<br>
<br>
Table -> {<br>
xPos,<br>
yPos,<br>
width,  //x-Achse<br>
height    //y-Achse<br>
}<br>
<br>
Room -> {<br>
width, //x-Achse<br>
height   //y-Achse<br>
}<br>
Game -> {<br>
Player,<br>
Table,<br>
Room<br>
