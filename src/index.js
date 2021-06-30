import "./styles.css";

var inputValue;

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", () => {
  inputValue = searchInput.value;
  console.log(inputValue);
});
