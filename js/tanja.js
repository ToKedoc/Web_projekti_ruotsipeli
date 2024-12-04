const images = [
    '../images_tanja/img1.png','../images/img2.jpg','../images/images_tanja/img3.png','../images/images_tanja/img4.webp',
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

let currentIndex = 0;