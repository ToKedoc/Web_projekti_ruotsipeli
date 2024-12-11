// Kuvien lähteet
const sourceimages = [
    "../images/images_dani/image1.png",
    "../images/images_dani/image2.png",
    "../images/images_dani/image3.png",
    "../images/images_dani/image4.png",
    "../images/images_dani/image5.png",
    "../images/images_dani/image6.png",
    "../images/images_dani/image7.png",
    "../images/images_dani/image8.png",
    "../images/images_dani/image9.png",
];

// Oletuskuva, joka näkyy, kun kortti on käännetty nurinpäin
const defaultkuvat = "../images/images_dani/backside.png";

// Satunnaistetaan kuvat ja luodaan parit
const randomkuvat = [...sourceimages, ...sourceimages].sort(() =>
    Math.random() > 0.5 ? 1 : -1
);

// Etsitään peli-alue HTML:stä
const peliContainer = document.querySelector("#pelialue");

// Luodaan kortit
let counter = 0;
for (let randomkuva of randomkuvat) {
    peliContainer.innerHTML += `
    <div class="kortti">
        <img class="kuva-kortit" data-idx="${counter}" src="${defaultkuvat}" alt="Memory card">
    </div>
    `;
    counter++;
}

// Pelaajan tila ja asetukset
const imageCards = document.querySelectorAll('.kuva-kortit');
let firstImageName = ''; // Ensimmäisen valitun kortin nimi
let firstImageIdx = '';  // Ensimmäisen valitun kortin indeksi
const matchedImage = []; // Lista osuneista korteista
let canClick = true;     // Klikkauslukko, kun kortteja tarkistetaan
let attemptsLeft = 25;   // Yrityksiä jäljellä

// Näytetään yritysten määrä
const attemptsContainer = document.querySelector("#attempts"); // <div id="attempts"></div>
attemptsContainer.textContent = `Företag som lämnat  (Yrityksiä jäljellä): ${attemptsLeft}`;

const foundPairsContainer = document.querySelector("#found-pairs");
let foundPairs = 0; // Alustetaan löydetyt kortit

//Funktio päivittämään löydettyjen parien lukua
function updateFoundPairs() {
    foundPairs++;
    foundPairsContainer.textContent = `Par hittade  (Löydetyt parit): ${foundPairs}`;
    // Tallennetaan löytyneiden parien määrä logalStorageen
    localStorage.setItem('memoryGameScore', foundPairs);
}

// Lisätään tapahtumakuuntelijat kortteihin
for (let imageCard of imageCards) {
    imageCard.addEventListener('click', () => {
        if (!canClick) return; // Estetään klikkaus, jos kortteja tarkistetaan

        const idx = imageCard.dataset.idx; // Kortin indeksi
        const imageName = randomkuvat[idx]; // Kortin todellinen kuva
        // Näytetään kortti

        imageCard.src = imageName;

        if (!firstImageName) {
            // Tallennetaan ensimmäisen kortin tiedot
            firstImageName = imageName;
            firstImageIdx = idx;
        } else {
            // Tarkistetaan, onko pari
            if (
                firstImageName === imageName && // Kuvien pitää olla samat
                firstImageIdx !== idx &&       // Korttien pitää olla eri
                !matchedImage.includes(imageName) // Korttia ei saa olla jo löydetty
            ) {
                matchedImage.push(imageName); // Lisätään pari löydettyihin
                updateFoundPairs();          // Päivitetään köydetyt kortit
                checkGameEnd();              // Tarkistetaan, onko peli päättynyt
            } else {
                // Korttipari ei osunut
                attemptsLeft--; // Vähennetään yrityksiä
                attemptsContainer.textContent = `Företag som lämnat  (Yrityksiä jäljellä): ${attemptsLeft}`;
                if (attemptsLeft === 0) {
                    setTimeout(() => {
                        alert("Dina ansträngningar tog slut! Låt oss börja från början  (Yrityksesi loppuivat! Aloitetaan alusta.)");
                        location.reload(); // Käynnistetään peli uudelleen
                    }, 500);
                }
            }
            // Nollataan ensimmäisen kortin tiedot
            firstImageName = '';
            firstImageIdx = '';
            canClick = false; // Estetään klikkaaminen tarkistuksen aikana
            clearImages();    // Palautetaan kortit, jos pari ei osunut
        }
    });
}
// Funktio, joka palauttaa kortit oletuskuvaan, jos pari ei osunut
function clearImages() {
    setTimeout(() => {
        for (let imageCard of imageCards) {
            const idx = imageCard.dataset.idx;
            const imageName = randomkuvat[idx];

            // Palautetaan vain kortit, jotka eivät ole osuneet
            if (!matchedImage.includes(imageName)) {
                imageCard.src = defaultkuvat;
            }
        }
        canClick = true; // Sallitaan klikkaaminen
    }, 800);
}

// Funktio joka tarkistaa onko peli päättynyt
function checkGameEnd() {
    if (matchedImage.length === sourceimages.length) {
        setTimeout(() => {
            alert("Grattis! Du vann spelet! (Onneksi olkoon! Sinä voitit pelin!)");
        }, 500);
    }
    
}