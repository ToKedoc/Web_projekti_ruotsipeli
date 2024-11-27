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

// Pelialueen haku
const pelialue = document.getElementById('pelialue');

// Lisää kuvat pelialuelle
kuvat.forEach((kortti) => {
    const kuvaElementti = document.createElement('img');
    kuvaElementti.src = kortti.kuva; //Asetetaan kuvan lähde
    kuvaElementti.alt = `Kortti ${kortti.id}`; // Alt-teksti
    kuvaElementti.classList.add('kortti'); // Lisätään mahdollinen css-luokka

    // Lisää kuvat pelialueelle
    pelialue.appendChild(kuvaElementti);
});