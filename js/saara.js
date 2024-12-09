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
const sentenceBox = document.getElementById("sentence-box")
const wordBox = document.getElementById("word-box")
const result = document.getElementById("result")

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

    //sanalaatikon sanaa klikkaamalla, se lisätään muodostettavaan lauseeseen 
    //funktion "addWordToSentence avulla"
    wordElement.addEventListener("click", () => addWordToSentence(wordElement))

    //vie sanat paikalleen sanalaatikkoon sivulla
    wordBox.appendChild(wordElement)
}) 

//Funktio, jotka lisää ruotsinkielisen valitun sanan lauseeseen
function addWordToSentence(wordElement) {
    //Hakee käyttäjän valitseman sanan wordElementin textContentista, ja lisää 
    //sanan välilyönni kanssa html:llän sentenceboxiin/lauselaatikkoon
    sentenceBox.textContent += wordElement.textContent + " "
    //Poistaa jo käytetyn/valitun sanan wordboxista/valittujen sanojen laatikosta
    //Jotta sitä ei voida käyttää uudelleen
    wordBox.removeChild(wordElement)
}

//Toimito, joka tarkistaa meneekö lause oikein tarkastus nappulaa painmalla
// ja antaa siitä palautteen
//hakee html-elementin id:llä ja painiketta klikkaamalla käynnistää kuuntelijan
document.getElementById("check").addEventListener("click", () => {
    //muuttuja, joka saa sisällökseen rakennetun lauseen, ilman välilyöntejä 
    //lauseen lopussa tai alussa
    const formedSentence = sentenceBox.textContent.trim()
    //muuttuja, joka saa arvoksi menossa olevan lauseen
    const sentence = sentences[sentenceIndex]

    //tarkistaa on muodostettu lause täysin sama kuin oikea lause
    //antaa kommentin käyttäjälle, jos lause on oikein
    if (formedSentence === sentence) {
        //lisää viestin html-elementtiin, jos lause on oikein ja näyttää käyttäjälle
        result.textContent = "Ordentligt! Fin prestation. Oikein! Hieno suoritus."
        //muuttaa lauseen tekstin vihreäksi
        result.style.color = "green" 
    }
})