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
const sentencebox = document.getElementById("sentence-box")
const wordbox = document.getElementById("word-box")

//Näytetään suomenkielinen lause sivulla
finnBox.textContent = finnSentences[sentenceIndex]

//haetaan kierroksessa oleva lause ja sen sisältämät sanat
//haetaan lause
const sentence = sentences[sentenceIndex]
//jaetaan lause sanoiksi taulukkoon
const words = sentence.split(" ")
//luodaan taulukko kopio ja sijoitetaan siihen sanat satunnaisessa järjestyksessä
const mixWords = [...words].sort(() => Math.random() - 0.5)

//lisätään sanat word-boxiin satunnaisessa järjestyksessä
//käy läpi jokaisen alkion muuttujan mixWords-taulukosta ja tallentaa muuttujaan "word"
mixWords.forEach(word => {
    //jokaisella kierroksella luodaan div elementti
    const wordElement = document.createElement("div")
    //lisää div elementille luokan, css tyylien luomiseksi
    wordElement.className = "word"
    //asettaa kierroksessa olevan word muuttujan arvon elementin arvoksi
    wordElement.textContent = word
    //vie sanat paikalleen sanalaatikkoon sivulla
    wordbox.appendChild(wordElement)
})