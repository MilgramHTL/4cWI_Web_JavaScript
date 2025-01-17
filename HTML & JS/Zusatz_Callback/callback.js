/*Ein Callback ist eine Funktion, die an eine andere Funktion übergeben 
und dort aufgerufen wird. Es ist ein zentrales Konzept in JavaScript, 
insbesondere bei der Arbeit mit asynchronem Code.*/

function begruessen(name, callback) {
    console.log("Hallo, " + name + "!");
    callback();
  }
  
  function verabschieden() {
    console.log("Tschüss!");
  }
  
  begruessen("Alice", verabschieden);

  function ladeDaten(callback) {
    console.log("Daten werden geladen...");
    setTimeout(() => {
      console.log("Daten wurden geladen.");
      callback(); // Rufe das Callback auf, nachdem die Daten geladen wurden.
    }, 2000);
  }
  
  function zeigeDaten() {
    console.log("Daten werden angezeigt.");
  }
  
  ladeDaten(zeigeDaten);


  /*
  document.getElementById("button").addEventListener("click", function () {
    console.log("Button wurde geklickt!");
  });
  ladeDaten(function () {
    verarbeiteDaten(function () {
      speichereDaten(function () {
        console.log("Alle Vorgänge abgeschlossen!");
      });
    });
  });
  ladeDaten()
  .then(verarbeiteDaten)
  .then(speichereDaten)
  .then(() => console.log("Alle Vorgänge abgeschlossen!"))
  .catch((error) => console.error("Fehler:", error));*/
    