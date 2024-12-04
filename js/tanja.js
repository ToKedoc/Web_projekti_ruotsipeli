const images = [
    '../images/img1.png','../images/img2.jpg','./img3.png','./img4.webp',
    './img5.png','./img6.jpg','./img7.png','./img8.jpg','./img9.png','./img10.webp'
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

let currentIndex = 0;