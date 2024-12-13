
function loadPoints () {
    const savedPoints = sessionStorage.getItem('Namnge bilden');
    if (savedPoints) {
        pisteet = parseInt(savedPoints);
        updateScoreDisplay();
    }
}


function resetPoints() {
    pisteet = 0;
    sessionStorage.setItem('Namnge bilden', pisteet.toString());
    updateScoreDisplay();
}




const images = [
    '../images/images_tanja/img1.png','../images/images_tanja/img2.jpg','../images/images_tanja/img3.png','../images/images_tanja/img4.webp',
    '../images/images_tanja/img5.png','../images/images_tanja/img6.jpg','../images/images_tanja/img7.png','../images/images_tanja/img8.jpg','../images/images_tanja/img9.png','../images/images_tanja/img10.webp'
];

const options = [
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

const words = [
    'Tekoäly','Hakukone','Hiiri','Kannettava tietokone',
    'Kuulokkeet','Ohjelmoida','Pilvipalvelu','Tietoturva',
    'Reititin','Tietojenkäsittely',
];

const correctAnswers = 
    [0,2,2,0,1,1,0,2,1,0];


let currentIndex = 0; //Aloitta ensimmäisestä kysymyksestä, seuraa mikä kysymys näytetään tällä hetkellä
let pisteet = 0; // Alustaa pisteet
let answeredIncorrectly = false; // seuraa onko pelaaja vastannut oikein

function updateScoreDisplay() {
    const scoreElement = document.querySelector('#score');
    scoreElement.textContent = 'Pisteet:' + pisteet;
}

// Lisää pisteet vain jos vastaus on ensimmäisellä yrittämällä oikein
function addPoints(){
    if (!answeredIncorrectly) {
        pisteet ++;
        sessionStorage.setItem('Namnge bilden', pisteet.toString());
        updateScoreDisplay();

    }
}

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
        resultMessage.textContent = 'Ordentligt!'; 
        resultMessage.style.color = 'green';

        addPoints();
      
        
        currentIndex++;

        answeredIncorrectly = false;

        if (currentIndex < images.length) {
            
            setTimeout (() => {

                resultMessage.textContent = ''; // tyhjentää viestin
                setQuestion();

            }, 2000); // viesti näkyy 2 sek.


        } else {
            resultMessage.textContent = 'Spelet slut!';
            resultMessage.style.color = 'black';


            // odottaa hetken ja lataa pelin alusta 

            setTimeout(() => {

                currentIndex = 0;
                resetPoints();
                resultMessage.textContent = '';
                setQuestion();

            }, 3000); // viive
        
        }

    } else {
        
        resultMessage.textContent = 'Fel! Försök igen!';
        resultMessage.style.color = 'red';

        answeredIncorrectly = true;

        setTimeout(() => {
            resultMessage.textContent= ''; //Asettaa tyhjän viestin ajan kuluttua
        }, 2000);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadPoints(); // Lataa pisteet
    setQuestion(); // Aloitta pelin
});



