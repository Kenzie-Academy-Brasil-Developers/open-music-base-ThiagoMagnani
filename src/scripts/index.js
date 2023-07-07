/* Desenvolva sua lógica aqui ... */

function createCard(product) {
  const card = document.createElement("li");
  const img = document.createElement("img");
  const name = document.createElement("p");
  const year = document.createElement("span");
  const title = document.createElement("h2");
  const span = document.createElement("span");
  const pSpan = document.createElement("p");
  const buttonCard = document.createElement("button");
  const contentCard = document.createElement("div");

  buttonCard.className = "buttonCard dark-mode";
  img.className = "imgList";
  card.className = "cards dark-mode";
  contentCard.className = "contentCard";
  name.className = "name";
  title.className = "titleMusic";
  pSpan.className = "priceMusic";
  span.className = "priceButton";

  img.src = product.img;
  title.textContent = product.title;
  year.textContent = product.year;
  name.textContent = product.band;
  pSpan.textContent = 'R$ ' + product.price;
  buttonCard.textContent = 'Comprar';

  name.append(year);
  span.append(pSpan, buttonCard);
  contentCard.append(name, title, span);
  card.append(img,contentCard);

  return card;
}

function renderButtons(categorie) {
  for (i = 0; i < categorie.length; i++) {
    const ul = document.querySelector(".listCategories");
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.className = "buttonsCat dark-mode";
    button.textContent = categorie[i];

    li.append(button);
    ul.append(li);
  }
}
renderButtons(categories);

function renderListCards(product) {

  const ul = document.querySelector(".listCards");

  ul.innerHTML = "";

  product.forEach((element) => {
    const returnCards = createCard(element);
    ul.append(returnCards);
  });

}
renderListCards(products);

function rangeValue(value) {

  document.querySelector(".rangeBar").addEventListener('input', () =>{
    document.querySelector('.rangeValue').innerHTML = value;
    const results = products.filter((element) =>{
      return element.price <= parseInt(value);
    })
    renderListCards(results);
  })
}

function addEvents(categorie){

  const buttons = document.querySelectorAll('.buttonsCat');
  buttons.forEach((button) => {
    button.addEventListener("click", (e) =>{
      const value = categorie.indexOf(e.target.textContent);
      renderCards(products, value);
    });
  });
}
addEvents(categories);

function darkMode(){
  const button = document.querySelector(".buttonDarkMode");
  const body = document.body;
  const card = document.querySelectorAll(".cards");
  const buttonsCat = document.querySelectorAll(".buttonsCat");
  const buttonCard = document.querySelectorAll(".buttonCard");
  const h1 = document.querySelector("h1");
  const theme = "dark-mode";
  const themeButtonText = ["<img src='./src/assets/img/moon.png'>", "<img src='./src/assets/img/sun.png'>"];
  let darkMode;

  function themePreferenceAnalysis(){
    darkMode = JSON.parse(localStorage.getItem(theme));
    
    if(darkMode){
      body.classList.add(theme);
      button.classList.add(theme);
      h1.classList.add(theme);
      card.forEach(a => {
        a.classList.remove(theme);
      });
      buttonCard.forEach(a => {
        a.classList.remove(theme);
      });
      buttonsCat.forEach(a => {
        a.classList.remove(theme);
      });
      themeChangeButtonText(button);
      addEvents(categories);
    } else{
      body.classList.remove(theme);
      button.classList.remove(theme);
      h1.classList.remove(theme);
      card.forEach(a => {
        a.classList.add(theme);
      });
      buttonCard.forEach(a => {
        a.classList.add(theme);
      });
      buttonsCat.forEach(a => {
        a.classList.add(theme);
      });
      themeChangeButtonText(button);
      addEvents(categories);
    }
  }
  themePreferenceAnalysis();
  
  function themeChangeButtonText(button){
    darkMode
    ? (button.innerHTML = themeButtonText[1])
    : (button.innerHTML = themeButtonText[0]);
    
    buttonsCat.forEach(button => {
      button.classList.toggle(theme);
    });
    buttonCard.forEach(button =>{
      button.classList.toggle(theme);
    });
    card.forEach(button =>{
      button.classList.toggle(theme);
    });
  }
  
  button.addEventListener("click", () =>{
    darkMode = !darkMode;
    body.classList.toggle(theme);
    h1.classList.toggle(theme);
    button.classList.toggle(theme);
    localStorage.setItem(theme, darkMode);
    themeChangeButtonText(button);
  });
}
darkMode();

function renderCards(product, value) {
  const list = document.querySelector(".listCards");
  list.innerHTML = "";

  for (i = 0; i < product.length; i++) {
    if(value === 0){
      const cards = createCard(product[i]);
      list.append(cards);
    } else{
      const result = product.filter(product => product.category == value);
      const cards = createCard(result[i]);
      list.append(cards);
    }
  }
}