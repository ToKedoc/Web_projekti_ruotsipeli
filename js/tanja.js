
const images = [
    '../images/images_tanja/img1.png','../images/images_tanja/img2.jpg','../images/images_tanja/img3.png','../images/images_tanja/img4.webp',
    '../images/images_tanja/img5.png','../images/images_tanja/img6.jpg','../images/images_tanja/img7.png','../images/images_tanja/img8.jpg','../images/images_tanja/img9.png','../images/images_tanja/img10.webp'
];

// kaikki pelissä käytettävät kuvat ovat https://pixabay.com/ 2024 
// ja poistettu niiden taustat https://www.remove.bg/fi/ sivustoa käyttäen.

const options = [ // valinta vaihtoehdot jokaisa kuvaa kohden
    ['artificiell intelligens',' databehandling','molntjänst'],
    ['programmera','router','sökmotor'],
    ['molntjänst','datasäkerhet','datormus'],
    ['bärbar dator','router','artificiell intelligens'],
    ['molntjänst','headset','datormus'],
    ['sökmotor','programmera','bärbar dator'],
    ['molntjänst','datormus','headset'],
    ['artificiell intelligens','programmera','datasäkerhet'],
    ['headset','router','bärbar dator '],
    ['databehandling','bärbar dator','artificiell intelligens'],
];

const words = [ // oikeat vastaukset jokaiselle kuvalle
    'Tekoäly','Hakukone','Hiiri','Kannettava tietokone',
    'Kuulokkeet','Ohjelmoida','Pilvipalvelu','Tietoturva',
    'Reititin','Tietojenkäsittely',
];

const correctAnswers = 
    [0,2,2,0,1,1,0,2,1,0];

// muuttujat pelin tilan seuraamiseen
let currentIndex = 0; //Aloitta ensimmäisestä kysymyksestä, seuraa mikä kysymys näytetään tällä hetkellä
let pisteet = 0; // Alustaa pisteet
let answeredIncorrectly = false; // seuraa onko pelaaja vastannut oikein



// funktio joka päivittää pisteiden määrän käyttöliittymään
function updateScoreDisplay() {
    const scoreElement = document.querySelector('#score');
    scoreElement.textContent = `Pisteet: ${pisteet}/${images.length}`;
}

// Funktio joka isää pisteen vain jos vastaus on ensimmäisellä yrittämällä oikein
function addPoints(){
    if (!answeredIncorrectly) {
        pisteet ++;
        sessionStorage.setItem('Namnge bilden', pisteet.toString());
        updateScoreDisplay();

    }
}

// Funktio asettaa seuraavan kysymyksen
function setQuestion() {
    const imageElement = document.querySelector('#picture');
    const wordElement = document.querySelector('.word');
    const buttons = document.querySelectorAll('.buttons button');

    // Asettaa kuvan ja sanan 
    imageElement.src = images[currentIndex];
    wordElement.textContent = words[currentIndex];

    // Asettaa vaihtoehdot
    buttons.forEach((button, index) => {
        button.textContent = options[currentIndex][index];
    });
}


// Tarkistetaan, vastaako käyttäjän valinta oikeaa vastausta (määritelty correctAnswers-listassa).

function checkAnswer(index) {

    const resultMessage = document.querySelector('.message');

    if (index === correctAnswers[currentIndex]) {
        resultMessage.textContent = 'Ordentligt! Mycket bra!'; 
        resultMessage.style.color = 'green';
//  lisätään piste jos oikein ja siirrytään seuraavaan kysymykseen
        addPoints();     
      
        currentIndex++;

        answeredIncorrectly = false;

        if (currentIndex < images.length) {
            
            setTimeout (() => {

                resultMessage.textContent = ''; // tyhjentää viestin
                setQuestion();  // lataa seuraavan kysymyksen

            }, 2000); // viesti näkyy 2 sek.


        } else {
            resultMessage.textContent = `Mycket Bra! Spelet slut! Dina poäng: ${pisteet}/${images.length}`;
            resultMessage.style.color = 'black';
        

            sessionStorage.setItem('Gamefinished', 'true');
        }

    } else {
        
        resultMessage.textContent = 'Fel! Försök igen!';
        resultMessage.style.color = 'red';

        answeredIncorrectly = true; // merkitään väärä vastaus

        setTimeout(() => {
            resultMessage.textContent= ''; //Asettaa tyhjän viestin ajan kuluttua
        }, 2000);
    }
}

// ladataan pisteet 
function loadPoints () {
    const savedPoints = sessionStorage.getItem('Namnge bilden');
    if (savedPoints) {
        pisteet = parseInt(savedPoints); // pisteet muutetaan numeroiksi
        updateScoreDisplay();
    }
}

// Nollataan pisteen kun peli aloitettaan alusta 
function resetPoints() {
    pisteet = 0;
    sessionStorage.setItem('Namnge bilden', pisteet.toString());
    updateScoreDisplay();
}



document.addEventListener('DOMContentLoaded', () => {
   const isGameFinished = sessionStorage.getItem('GameFinished');

   if (isGameFinished === 'true') {
        resetPoints();
        sessionStorage.setItem('GameFinished' , 'false')
   }
   
   
   
    setQuestion(); // Asetetaan ensimmäinen kysymys
});



// koodit on tuotettu aiempien kurssien materiaaleja hyödyntäen,
// (verkkosivun toteutus, web-ohjelmointi ja web-projekti) 
// www.w3schools.com sivustoja käyttäen, sekä tekoälyn kanssa keskustelleen erilaisista toteutusvaihtoehdoista (www.chatgpt.com).
