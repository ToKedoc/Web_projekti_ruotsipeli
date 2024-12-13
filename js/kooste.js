//hakee peli3 muuttujan arvoksi sessionstorageen tallennetun pistemäärän ja muuttaa sen numeroksi
let peli3 = Number(sessionStorage.getItem("ordtill"))
let peli4 = Number(sessionStorage.getItem("korsord"))
let peli2 = Number(localStorage.getItem("memoryGameScore"))
let peli1 = Number(sessionStorage.getItem("Namnge bilden"))
//hakee elementin paikan id:llä html:stä ja lisää pistemäärä koostesivun taulukkoon  
document.getElementById("otm").textContent = peli3 
document.getElementById("korsord").textContent = peli4
document.getElementById("score").textContent = peli2
document.getElementById("points").textContent= peli1
//tähän kukin voisi lisätä samalla tyylillä oman pelinsä pisteiden haun ja viennin htmllään
//let peli1 = Number.....
//let peli2 = Number...

let yhteispisteet = peli3 + peli4// + peli1 + peli2 + peli4  näin jatkaisi esim. niin saadaan kaikki yhteispisteet päivittymään 

//hakee elementin paikan id:llä html:stä ja lisää yhteispiste määrän yhteispisteiden kohdalle koostesivun taulukossa
document.getElementById("all").textContent = yhteispisteet

