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

//muuttuja lauseen laskentaan, lasketaan missä lauseessa mennään
let sentenceIndex = 0
//muuttuja pisteiden laskulle, lasketaan saatavien pisteiden määrä
let score = 0

//haetaan HTML-dokumentista elementti id:llä
const finnBox = document.getElementById("finn-box")
const sentenceBox = document.getElementById("sentence-box")
const wordBox = document.getElementById("word-box")
const result = document.getElementById("result")

//Näytetään suomenkielinen lause sivulla
finnBox.textContent = finnSentences[sentenceIndex]

//funktio joka alustaa pelin käyntiin, tyhjentää laatikot uudelle kierrokselle/lauseelle
//hakee kierroksessa olevan lauseen ja sen sisältämät sanat, lisää sanat worBoxiin satunnaisessa järjestyksessä
function initGame() {
    // Päivittää suomenkielisen kierroksessa olevan lauseen finnBox-elementissä
    finnBox.textContent = finnSentences[sentenceIndex];
    //tyhjentää laatikot
    //tyhjentää elementin wordBox, jotta uusi sanajoukko voidaan lisätä
    wordBox.innerHTML = ""
    //tyhjentää senteceBox elementin käyttäjän muodostamasta lauseesta
    sentenceBox.textContent =""
    //tyhjentää result elementin edellisestä kommentti tekstistä
    result.textContent = ""


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
}

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

        //jos lause menee oikein pistelaskuri päivittyy
        score += 2
        //haetaan html dokumentistä elementti id:llä ja asetetaan sille 
        //päivitetty muuttujan arvo
        document.getElementById("score").textContent = score

    } else {
        //lisää viestin html-elementtiin, jos lause on väärin ja näyttää käyttäjälle
        result.textContent= "Fel! Väärin"
        result.style.color = "red"
    }

    //Siirtyminen seuraavaan lauseeseen
    //lisää yhden muuttujaan sentenceIndex ja liikuttaa lauselaskuria lauseesta seuraavaan
    sentenceIndex++;
    //tarkistaa onko lauseita vielä jäljellä sentences-taulukossa ja jatkuuko näin ollen peli
    //seuraavaan lauseeseen vai päättyykö
    if (sentenceIndex < sentences.length) {
        //asettaa aikaviiveen seuraavalle toiminnolle, jonka aikana käyttäjä, saa kommenti peliltä
        //peli siirtyy joko seuraavaan lauseeseen tai päättyy
        setTimeout(initGame, 3000)
    } else {
        //viesti html-elementtiin, näyttää käyttäjälle, että peli on päättynyt
        result.textContent = "Du har slutfört alla meningar, game over! Olet suorittanut kaikki lauseet, peli loppu!"
        result.style.color = "green"
    }
})

    //käynnistetään peli kutsumalla funktiota initGame
    initGame()

