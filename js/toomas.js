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
