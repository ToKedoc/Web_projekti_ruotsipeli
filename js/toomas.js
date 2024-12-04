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
                                                                    // Tarkastetaan solun sarake numero(x) on sanan aloitussarakkeen kohdalla.
                                                                    // Ja tarkastetaan että solun sarakenumero(x) on sopiva sanan pituuteen

    );
    
