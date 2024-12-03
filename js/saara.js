// Lista lauseista suomeksi
const finnSentences = [
    "Minua kiinnostaa kehittää tulevaisuudessa tekoälyä",
    "Aloitin juuri uuden kurssin, sillä opiskellaan kyberturvallisuutta",
    "Pythonin ohjelmointi on minusta helppoa ja hauskaa",
    "Käytän tietoteknisiä taitoja työssäni",
    "Tarvitsen työssäni tietokonetta päivittäin"
]

// Lista Lauseista
const sentences = [
    "Jag är intresserad av att utveckla artificiell intelligens i framtiden",
    "Jag har precis börjat på en ny kurs, eftersom vi studerar cybersäkerhet",
    "Python-programmering är enkelt och roligt för mig",
    "Jag använder IT-kunskaper i mitt arbete",
    "Jag behöver en dator på jobbet varje dag"
] 

//lasketaan missä lauseessa mennään
let sentenceIndex = 0

//haetaan HTML-dokumentista elementti id:llä
const finnBox = document.getElementById("finn-box")
//Näytetään suomenkielinen lause sivulla
finnBox.textContent = finnSentences[sentenceIndex]