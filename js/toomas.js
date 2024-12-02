// Luodaan vakiomuuttuja eli ristkon sanat, lisätään niiden paikat, ristikon luonnin jälkeen.
const crossword = [
    { word: "MOLN", x: 9, y: 0 },
    { word: "MAPP", x: 8, y: 1 },
    { word: "HACKER", x: 6, y: 2 },
    { word: "GRAFIKKORT", x: 9, y: 3 },
    { word: "BRANDVÄGG", x: 8, y: 4 },
    { word: "TANGENTBOARD", x: 10, y: 5 },
    { word: "HÅRDDISK", x: 5, y: 6 },
    { word: "SERVER", x: 7, y: 7 },
    { word: "PROGRAMMER", x: 2, y: 8 },
    { word: "NÄTVERK", x: 8, y: 9 },
  ];
  
  const table = document.getElementById("crossword");
  const wordContainer = document.getElementById("word-container");
  const wordInput = document.getElementById("wordInput");
  const checkWordButton = document.getElementById("checkWordButton");
  const wordResult = document.getElementById("wordResult");
  const checkButton = document.getElementById("checkButton");
  
  const maxX = Math.max(...crossword.map((word) => word.x + word.word.length));
  const maxY = Math.max(...crossword.map((word) => word.y)) + 1;
  
  const rows = maxY;
  const cols = maxX;
  
  // Luodaan ristikko, joka muokkautuu vakiomuuttujien mukaan, eli sanojen pituuksien mukaan
  for (let y = 0; y < rows; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.maxLength = 1;
      input.dataset.x = x;
      input.dataset.y = y;