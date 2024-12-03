// Kuvat ja kortit
const kuvat = [
    { kuva: '../images/images_dani/kuva1.png', id: 1 },
    { kuva: '../images/images_dani/kuva2.png', id: 2 },
    { kuva: '../images/images_dani/kuva3.png', id: 3 },
    { kuva: '../images/images_dani/kuva4.png', id: 4 },
    { kuva: '../images/images_dani/kuva5.png', id: 5 },
    { kuva: '../images/images_dani/kuva6.png', id: 6 },
    { kuva: '../images/images_dani/kuva7.png', id: 7 },
    { kuva: '../images/images_dani/kuva8.png', id: 8 },
    { kuva: '../images/images_dani/kuva9.png', id: 9 },
];

// Luo kortit: yhdistä jokainen kuva itsensä kanssa (luo parit)
const kortit = [...kuvat, ...kuvat];


// Sekoita kortit
kortit.sort(() => Math.random() - 0.5);

// Pelialueen haku
const pelialue = document.getElementById('pelialue');

// Lisää kuvat pelialuelle
kortit.forEach((kortti) => {
    const kuvaElementti = document.createElement('img');
    kuvaElementti.src = kortti.kuva; //Asetetaan kuvan lähde
    kuvaElementti.alt = `Kortti ${kortti.id}`;
    kuvaElementti.classList.add('kortti'); 

    
    pelialue.appendChild(kuvaElementti);
});