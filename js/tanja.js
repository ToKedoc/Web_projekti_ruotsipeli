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
    'Reititin','Tietojenkäsittely'
];

const correctAnswers = 
    [0,2,2,0,1,1,0,2,1,0];

let currentIndex = 0; //Aloitta ensimmäisestä kysymyksestä, seuraa mikä kysymys näytetään tällä hetkellä

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
    if (index === correctAnswers[currentIndex]) {
        alert('Ordentligt! :)');
    } else {
        alert('Fel! :(');
    }

    currentIndex++;
    if (currentIndex < images.length) {
        setQuestion();
    } else {
        alert('Spelet slut!');
    }
}

// Käynnistä peli
document.addEventListener('DOMContentLoaded', () => {
    setQuestion();
});


