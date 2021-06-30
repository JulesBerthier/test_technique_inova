import "./styles.css";

var inputValue;
var listePays;
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const listePaysElem = document.getElementById("liste-pays");
const cartePaysElem = document.getElementById("carte-pays");

searchButton.addEventListener("click", () => {
  inputValue = searchInput.value;
  fetch("https://restcountries.eu/rest/v2/name/" + inputValue)
    .then((response) => response.json())
    .then((data) => {
      while (listePaysElem.firstChild) {
        listePaysElem.firstChild.remove();
      }
      listePays = data;
      listePays.forEach((pays) => {
        const listItem = `<div class="card" id="${pays.name}" style="margin-bottom:16px;">
        <div class= "card-body">
            <p class="card-text">${pays.alpha2Code}</p>
            <h5 class="card-title">${pays.name}</h5>
          </div>
        </div>`;
        const ele = document.createElement("div");
        ele.innerHTML = listItem;
        listePaysElem.appendChild(ele.firstChild);
      });

      listePaysElem.childNodes.forEach((div) => {
        document.getElementById(div.id).addEventListener("click", () => {
          while (cartePaysElem.firstChild) {
            cartePaysElem.firstChild.remove();
          }
          const paysName = div.id;
          fetch(
            "https://restcountries.eu/rest/v2/name/" +
              paysName +
              "?fullText=true"
          )
            .then((response) => response.json())
            .then((data) => {
              const pays = data[0];
              var languages = "";
              var currencies = "";
              pays.languages.forEach((language) => {
                languages = languages + " " + language.name;
              });
              pays.currencies.forEach((currencie) => {
                currencies = currencies + " " + currencie.name;
              });
              const detailPays = `<div class="card" style="margin-bottom:16px;">
                <div class="card-image"><img src="${pays.flag}" class="card-img-top"></div>
                  <div class= "card-body">
                    <h5 class="card-title">${pays.nativeName}</h5>
                    <p class="card-text">
                      <ul>
                        <li>Capital : ${pays.capital}</li>
                        <li>Population : ${pays.population}</li>
                        <li>Time Zones : ${pays.timezones}</li>
                        <li>Languages : ${languages}</li>
                        <li>Currencies Names : ${currencies}</li>
                      </ul>
                    </p>
                  </div>
                </div>`;
              const cartePays = document.createElement("div");
              cartePays.innerHTML = detailPays;
              cartePaysElem.appendChild(cartePays.firstChild);
            });
        });
      });
    });
});
