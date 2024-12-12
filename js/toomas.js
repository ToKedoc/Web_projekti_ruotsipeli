// Luodaan muuttujat eli sana joita ristikossa kysytään. Lisätään sanojen sijainti ristikossa
// y= rivi x= sarake suunta
const crossword = [
  { word: "MOLN", x: 9, y: 0 },
  { word: "MAPP", x: 8, y: 1 },
  { word: "HACKER", x: 6, y: 2 },
  { word: "GRAFIKKORT", x: 9, y: 3 },
  { word: "BRANDVÄGG", x: 8, y: 4 },
  { word: "TANGENTBOARD", x: 10, y: 5 },
  { word: "HÅRDDISK", x: 5, y: 6 },
  { word: "SERVER", x: 7, y: 7 },
  { word: "PROGRAMMER", x: 2, y: 8 },
  { word: "NÄTVERK", x: 8, y: 9 },
];

let startTime; // Tämä muuttuja tallentaa ajastimen käynnistysajan
let endTime;   // Tämä tallentaa ajastimen lopetusajan
let timerInterval; // Ajastimen intervalli-ID tätä käytetään koodissa ajastimen hallintaan

// Valitaan HTML elementtejä
const table = document.getElementById("crossword"); //table elementti joka sisältää ristikon
const checkButton = document.getElementById("checkButton"); // Tarkastuspainike ristikolle
const wordContainer = document.getElementById("word-container"); // Syöttökenttä johon kirjoitetaan ristikon keskelle paljastunut sana.
const wordInput = document.getElementById("wordInput");  // Input elementti word-containeriin
const checkWordButton = document.getElementById("checkWordButton"); //Tarkastus nappula keskelle paljastuneelle sanalle.
const wordResult = document.getElementById("wordResult"); // Elementti joka ilmoittaa tarkastuksen lopputuloksen


const maxX = Math.max(...crossword.map(({ word, x }) => x + word.length)); //  Luodaan muuttujat taulukon luomista varten. Tämä katsoo mistä sana alkaa ja mikä on sen pituus
const maxY = Math.max(...crossword.map(({ y }) => y)) + 1;                //   Tämä tarkastaa taulukon rivien määrän, käymällä läpi taulukon jokaisen sanan, ja laskee vain aloitus rivien määrän

// Luo taulukko HTML:n table elementtiin, jonka jokaisessa solussa on syöttökenttä.
for (let y = 0; y < maxY; y++) {    //Tehtään taulukko käyttämällä for silmukkaa. 
  const row = document.createElement("tr");
  for (let x = 0; x < maxX; x++) {              //Määritetään sarkkeiden lukumäärä
      const cell = document.createElement("td"); 
      const input = document.createElement("input");
      input.maxLength = 1; //Tämä asettaa taulukon merkkimääräksi max 1 merkin
      input.dataset.x = x; // Näillä tallennetaan taulukon syötekentään niiden sijainnit taulukossa
      input.dataset.y = y;
     
      // Etsitään kaikki sanat, jotka sisältävät tämän solun
      const relevantWords = crossword.filter(   // Tämä käyttää metodia jolla suodatetaan taulukosta kaikki sanat jotka täsmäävät tietyn solun sijaintiin.
        ({ word, x: startX, y: startY }) =>     // Tämä ottaa sanan ja sen aloituksen sarakkeesta(x) ja rivistä(y)
            y === startY && x >= startX && x < startX + word.length // Tällä tarkastetaan, että taulukon solu on samalla rivillä kuin sana. 
                                                                    // Tarkastetaan että solun sarake numero(x) on sanan aloitussarakkeen kohdalla.
                                                                    // Ja tarkastetaan että solun sarakenumero(x) on sopiva sanan pituuteen

    );
    if (relevantWords.length === 0) { // Jos taulukko relevantWords on tyhjä poistetaan taulukon syöttökenttä
      input.disabled = true;        
      cell.classList.add("empty"); // Jos relevantWords on tyhjä lisätään HTMl solulle CSS luokka empty, eli muutetaan sen ulkoasua
  } else {
      
      const correctLetter = relevantWords[0].word[x - relevantWords[0].x].toUpperCase(); // Lasketaan mikä kirjain kuuluu relevatWordstin mihinkin soluun
      input.dataset.correct = correctLetter; // Lisätään dataset-attribuutti nimeltä correct, joka tallentaa solun oikean kirjaimen, myöhempää tarkastusta varten
      input.addEventListener("keydown", (event) => handleKeyDown(event, input)); // Lisätään syöttökentälle EventListener joka aktivoituu aina kun pelaaja painaa jotain näppäimistön painiketta syöttökentässä
      input.addEventListener("input", () => handleInput(input)); // Lisätään toinen tapahtumakuuntelija, joka aktivoituu kun pelaaja kirjoittaa, handle input käsittelee pelaajan syötteen
  }
  cell.appendChild(input); // Lisätään syöttökenttä HTML:n soluun
  row.appendChild(cell); // Ja lisätään solu riviin
}
table.appendChild(row); // Lopuksi lisätään rivi taulukkoon
}


function handleKeyDown(event, input) { // Tehdään functio handleKeyDown, joka käsittelee
  const { x, y } = input.dataset; // Haetaan arvot data-x ja data-y atribuuteista, objektista input.dataset,
  const currentX = parseInt(x);  //currentX ja currentY käytetään määrittämään syöttökentän sijainti taulukossa, jotta tiedetään missä kentässä pelaaja on milloinkin
  const currentY = parseInt(y);  // koska x ja y on alunperin merkkijonoja dataset:issä, muutetaan ne kokonaisluvuiksi käyttämällä functiota parseInt

  if (event.key === "Enter") { // Jos pelaaja painaa "ENTER" painiketta, suoritetaan koodi
      event.preventDefault(); // Tämä estää ENTERIN oletus toiminnot
      const nextWord = crossword.find(({ y: startY }) => startY > currentY); // Käydään taulukon crossword sanat. Etsitään esimmäinen sana jonka y-koordinaatti(startY) on suurempi kuin nykyinen y-koordinaatti 
                                                                            //  Tällä tavalla löydetään seuraavalla rivillä oleva sana
      if (nextWord) {                                                       // Jos löydetään seuraava sana jatketaan koodin suorittamista
          const nextInput = document.querySelector(                         //  Etsitään HTML-syöttökenttä jonka koordinaatit vastaa sanan aloituspaikkaa
              `input[data-x="${nextWord.x}"][data-y="${nextWord.y}"]`       //  Etsitään input-elementti, jolla on atribuutti data-X tai data-y jonka arvo on nextWord.x tai nextWord.y
          );                                                                // Yhdistämällä [data-x="${nextWord.x}"] ja [data-y="${nextWord.y}"] etsitään syöttökenttää joka täyttää molemmat ehdot
          
          if (nextInput) nextInput.focus();                                 // Jos syöttökenttä nextInput löytyy, käytetään NextInput.focus(), joka siirtää kohdistuksen kyseiseen kenttään.
      }
  } else if (event.key === "Backspace") {                                   // Tämä ehto tarkastetaan jos mikään edellä olevat ehdot eivät ollee tosia. Tämä tarkastaa onko painettu näppäin "BACKSPACE"
      if (input.value) {                                                    // Luetaan syöttökentän sisältö, jos ehto on tosi siirrytään lohkon sisälle
          input.value = "";                                                 // Tyhjennetään syöttökenttä muuttamalla sen arvoksi tyhjä merkkijono ""
          event.preventDefault();                                           // Estetään BACKSPACE:n oletustoiminto, jotta ei tapahdu kauheuksia
     
        } else {                                                          // Jos syöttökenttä on tyhjä tarkastetaan tämä ehto
          event.preventDefault();                                         // Estetään BACKSPACEN oletustoiminto
          const prevInput = getPreviousInput(currentX, currentY);         // Tällä fuctiolla etsitään edellinen syöttökentä. Hyödynnetään nykyisen kentän currentX ja currentY koordinaatteja
          if (prevInput) prevInput.focus();                               // Jos edellinen syöttökenttä löytyy, suoritaan lohkon sisältö, ja siirrytään edelliseen kenttään focus()-metodilla
      }
  }
}

function handleInput(input) {                                             // Tehdään functio handleInput joka aktivoituu kun pelaaja syöttää jotain ristikkoon
  if (!startTime) {                                                       // Jos ristikon syöttökenttä aktivoidaan, ja ajastin ei ole käynnissä, aletaan suorittaa silmukkaa
    startTimer();                                                         // Kutsutaan functiota startTimer. Ajastin käynnistetään
  }

  const { x, y } = input.dataset;                                         // Haetaan arvot data-x ja data-y atribuuteista, objektista input.dataset,
  const currentX = parseInt(x);                                           //currentX ja currentY käytetään määrittämään syöttökentän sijainti taulukossa, jotta tiedetään missä kentässä pelaaja on milloinkin
  const currentY = parseInt(y);                                           // koska x ja y on alunperin merkkijonoja dataset:issä, muutetaan ne kokonaisluvuiksi käyttämällä functiota parseInt

  const nextInput = getNextInput(currentX, currentY);                     // Selvitetään missä Input-kentässä pelaaja on ,jotta tiedetään koska mihin kenttään voidaan seuraavaksi siirtyä.
  if (nextInput) nextInput.focus();                                       // Siirretään pelaaja seuraavaan kenttään.
}

function getNextInput(x, y) {                                             // Tehdään functio getNextInput joka etsii seuraavan syöttökentän koordinaattien x ja y perusteella
  const nextX = x + 1;                                                    // Lasketaan mikä on seuraavan syöttökentän sarakenumero, lisäämällä nykyiseen x + 1
  const nextInput = document.querySelector(                               // Haetaan HTML:stä syöttökenttä joka on seuraavassa  samalla rivillä (y)
      `input[data-x="${nextX}"][data-y="${y}"]:not([disabled])`           // Varmistetaan että kenttä ei ole pois käytöstä
  );
  if (nextInput) {                                                        // Tarkastetaan löytyykö kenttä samalta riviltä
      return nextInput;                                                   // Jos kenttä löytyy siirrytään siihen
  } else {                                                                // Jos kenttää ei löydy siirrytään etsimään seuraavalta riviltä
      const nextWord = crossword.find(({ y: startY }) => startY > y);     // Tämä etsii ristikosta ensimmäisen sanan, jonka aloitus rivi on suurempi kuin nykyinen rivi (y)
      if (nextWord) {                                                     // Tämä tarkastaa löytyykö seuraava sana
          return document.querySelector(                                  // Jos seuraava sana löytyy siirrytään sen ensimmäiseen syöttökenttään
              `input[data-x="${nextWord.x}"][data-y="${nextWord.y}"]`     // Sen aloitus koordinaattien perusteella
          );
      }
  }
  return null;                                                            // Jos seuraavaa kenttää ei löydy, palautetaan null, eli ei tehdä mitään        
}

function getPreviousInput(x, y) {                                         // Tehdään functio joka etsii edellisen syöttökentän annettujen koordinaattien x ja y perusteella
  const prevX = x - 1;                                                    // Lasketaan mikä on edellisen syöttökentän sarakkeen numero vähentämällä nykyisestä x - 1
  const prevInput = document.querySelector(                               // Haetaan HTML taulukosta syöttökenttä joka sijaitsee samalla rivillä (y)
      `input[data-x="${prevX}"][data-y="${y}"]:not([disabled])`           // Varmistetaan että edellinen kenttä ei ole pois käytöstä
  );
  if (prevInput) {                                                        // Jos kenttä löytyy siirrytään kenttään
      return prevInput;
  } else {                                                                // Jos kenttää ei löydy samalta riviltä, siirrytään etsimään edellisen rivin viimeistä sanaa 
      
    const previousWords = crossword.filter(({ y: startY }) => startY < y); // Etsitään ristikosta sanat jonka aloitusrivi on pienempi kuin nykyinen rivi (y)
      
    if (previousWords.length > 0) {                                      
          const prevWord = previousWords[previousWords.length - 1];      // Näistä sanoista valitaan viimeinen eli edellisen rivin viimeinen sana, vähentämällä previousWords.length - 1
          const lastX = prevWord.x + prevWord.word.length - 1;           // Lasketaan viimeisestä sanasta viimeinen kirjain
          return document.querySelector(                                 // Haetaan edellisen sanan viimeinen syöttökenttä, 
              `input[data-x="${lastX}"][data-y="${prevWord.y}"]`         // ja siirrytään siihen 
          );
      }
  }
  return null;                                                            // Jos edellistä kenttää ei löydy, palautetaan null, eli ei tehdä mitään
}

function checkCrosswordCompletion() {                                     // Tehdään functio, joka tarkastaa onko ristikon kaikki syöttökentät oikein
  let correct = true;                                                     // Luodaan muuttuja, joka tarkastaa onko ristikko täytetty oikein. Muuttuja olettaa aluksi että kaikki on oikein
                             
  document.querySelectorAll("#crossword input:not([disabled])").forEach((input) => { // Käydään kaikki syöttökentät läpi ja valitaan kaikki, jotka eivät ole käytössä
      const userValue = input.value.trim().toUpperCase();                            // Haetaan pelaajan syöttämät arvot ja muutetaan ne isoiksi kirjaimiksi
      const correctValue = input.dataset.correct;                                    // Haetaan kentän oikea arvo, joka on tallennettu data-attribuuttiin "data-correct"

      input.classList.remove("correct", "incorrect", "empty");                       // Poistetaan kentästä mahdolliset aiemmat luokat

      if (!userValue) {                                                              
        input.classList.add("empty");                                                 // Jos kenttä on tyhjä, lisätään kenttään luokka "empty"
        correct = false;                                                              // Merkitään että ristikko on kesken
      } else if (userValue !== correctValue) {                                        // Jos kentässä on syöte
        input.classList.add("incorrect");                                             // Tarkastetaan onko se oikein, jos arvo ei ole oikea, merkitään luokka "incorrect"
        correct = false;
      } else {                                                                         
        input.classList.add("correct");                                               // Jos pelaajan syöte on oikein, merkitään luokka "correct"
      }
      
  });
  
  if (correct) {                                                                      // Jos ristikko on oikein
    wordContainer.classList.remove("hidden");                                         // Poistetaan luokka "hidden" keskisanan syöttökentästä
    wordContainer.classList.add("visible");                                           // Muutetaan syöttökenttä näkyväksi

    wordResult.textContent = "Mikä sana muodostuu ristikon keskelle?";                 // Lisätään pelaajalle ohjeteksti
    wordResult.classList.add("correct");                                              // Lisätään luokka "correct", jolla voidaan muokata ulkoasua jos vastaus oin oikein
    wordResult.classList.remove("incorrect");                                         // Poistetaan luokka "incorrect", jos pelaaja on aikaisemmin vastannut väärin
} else {
    wordContainer.classList.remove("visible");                                        // Jos kaikki sanat eivät ole oikein
    wordContainer.classList.add("hidden");                                            // , poistetaan syöttökenttä näkyvistä 

    wordResult.textContent = "Väärin! Yritä uudestaan!.";                             // Lisätään pelaajalle ohjeteksti
    wordResult.classList.add("incorrect");                                            // Lisätään luokka "incorretct" joka muuttaa tekstin ulkoasua
    wordResult.classList.remove("correct");                                           // Poistetaan luokka "correct" jos syöttö on ollut aikaisemmin oikein, mutta se on muutettu
}

}

function startTimer() {                                                               // Luodaan functio ajastimen aloitus ajan tallentamiseen
  startTime = Date.now();                                                             // Tämä tallentaa ajastimen aloitusajan milli sekuntteina
  timerInterval = setInterval(updateTimerDisplay, 1000);                              // Tämä asettaa ajastimen päivittämään näyttöä sekunnin välein, kutsumalla updateTimerDisplay- functiota
}

function updateTimerDisplay() {                                                       // Luodaan functio tallettamaan ajastimen tämän hetkistä aikaa
  
  const now = Date.now();                                                             // Tallennetaan tämän hetkinen aikaleima millisekunteina
  const timeElapsed = Math.floor((now - startTime) / 1000);                           // Tällä lasketaaan kulunut aika sekunneissa vähentämällä aloitusaika nykyhetkestä ja jakamalla se 1000
  const minutes = Math.floor(timeElapsed / 60);                                       // Tämä laskee kuluneiden minuuttien määrän jakamalla sekunnit 60:llä
  const seconds = timeElapsed % 60;                                                   // Lasketaan jäljellä olevat sekunnit jakojäännöksenä 60:llä

  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds                // Muutetaan aika merkkijonoksi "mm:ss", jossa numerot asetetaan nolliksi tarvittaessa
      .toString()
      .padStart(2, '0')}`;
 
      document.getElementById('timeElapsed').textContent = timeString;                // Päivitetään HTML elementti joka näyttää pelaajalle ajan
}

function stopTimer() {                                                                // Luodaan functio ajastimen lopetusajan tallentamista varten
  endTime = Date.now();                                                               // Tallennetaan ajastimen lopetusaika
  clearInterval(timerInterval);                                                       // Pysäytetään ajastimen päivitys

  const totalTime = Math.floor((endTime - startTime) / 1000);                         // Lasketaan kokonais aika vähentämällä aloitusaika lopetusajasta
  const score = calculateScore(totalTime);                                            // Tämä laskee käyttäjän pisteet käytetyn ajan perusteella, kutsumalla "calculateScore"- functiota

  wordResult.textContent += `\nSuoritusaika: ${formatTime(
      totalTime
  )}\nPisteet: ${score}`;                                                             // Näytetään pelaajalle pisteet ja suoritus aika
}

function calculateScore(timeInSeconds) {                                              // Luodaan funktio pisteiden laskua varten, jossa aika vaikuttaa pisteisiin.

  const maxScore = 10;                                                                // Maksimipisteet 10
  const minScore = 0;                                                                 // Minimipisteet   0
  const fiveMinutes = 5 * 60;                                                         // Tmä muuttaa 5 minuuttia sekunneiksi
  const fifteenMinutes = 15 * 60;                                                     // Tämä muuttaa 15 minuuttia sekunneiksi

  if (timeInSeconds <= fiveMinutes) {                                                 // Jos aikaa on kuluunu vähemmän kuin 5 minuuttia, pelaaja saa täydet pisteet.
      return maxScore;
  
    } else if (timeInSeconds >= fifteenMinutes) {                                     // Jos aikaa on kulunut yli 15 minuuttia, pelaaja saa 0 pistettä.
      return minScore;
  
    } else {                                                                          // Muuten pisteet lasketaan suhteessa kuluneeseen aikaan.
      const remainingTimeFraction = (fifteenMinutes - timeInSeconds) / (fifteenMinutes - fiveMinutes); // Lasketaan suhteellinen jäljellä oleva aika 5 ja 15min väliltä
      return Math.round(remainingTimeFraction * maxScore);                            // Kerrotaan jäljellä olevan ajan suhde maksimipisteillä, ja pyöristetään lähimpään kokonaislukuun
  }
}

function formatTime(timeInSeconds) {                                                  // Luodaan functio ajan muotoilemiseen muodossa "mm:ss"
  
  const minutes = Math.floor(timeInSeconds / 60);                                     // Lasketaan kuluneet minutit jakamalla kokonais aika 60:llä
  const seconds = timeInSeconds % 60;                                                 // Lasketaan jäljellä olevat sekunnit käyttämällä jakojäännöstä. Tällä saadaan selville sekunnit jotka jäävät yli täysistä minuteista

  return `${minutes.toString().padStart(2, '0')}:${seconds                            // Muutetaan minuttien ja sekunttien arvot merkkijonoiksi
      .toString()
      .padStart(2, '0')}`;                                                            // Lisätään ajastimeen nollia, jos merkkijonossa on alle 2 merkkiä
}

checkButton.addEventListener("click", () => {                                         // Lisätään tapahtumakuuntelija "checkButton" painikkeelle
  checkCrosswordCompletion();                                                         // Tällä kutsutaan functiota checkCrosswordCompletion, joka tarkastaa ristikon
});

checkWordButton.addEventListener("click", () => {                                     // Lisätään tapahtumakuuntelija "checkWordButton" painikkeelle
  const enteredWord = wordInput.value.toUpperCase().trim();                           // Tämä funktio suoritetaan, kun pelaaja painaa keskisanan tarkastuspainiketta
  if (enteredWord === "OPERATIVET") {                                                // Jos pelaaja on syöttänyt sanan "OPERATIVET"
      wordResult.textContent = "Oikein! Läpäisit pelin!";
      wordResult.classList.remove("incorrect");                                      // Poistetaan virheen luokka, jos se on aiemmin lisätty
      wordResult.classList.add("correct");                                           // Lisätään luokka "correct"
      stopTimer();                                                                   // Pysäytetään ajastin
  } else {
      wordResult.textContent = "Väärin! Yritä uudelleen.";
      wordResult.classList.remove("correct");                                        // Poistetaan onnistumisen luokka, jos se on aiemmin lisätty
      wordResult.classList.add("incorrect");                                         // Lisätään virheen "incorrect" luokka
  }
});

// Funktio, joka täyttää ristikon automaattisesti
function fillCrossword() {
  crossword.forEach(({ word, x: startX, y: startY }) => {
      for (let i = 0; i < word.length; i++) {
          const x = startX + i;
          const y = startY;
          const input = document.querySelector(
              `#crossword input[data-x="${x}"][data-y="${y}"]`
          );
          if (input && !input.disabled) {
              input.value = word[i].toUpperCase();
          }
      }
  });
}

// Kutsu funktiota testauksen aikana
fillCrossword();

