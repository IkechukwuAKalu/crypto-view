const initConversionViews = (coins) => {
  displayViews("conv-from-coin");
  displayViews("conv-to-coin");

  document.getElementById("conv-from-val").addEventListener("keyup", () => convert());

  const toggleDiv = document.getElementById("toggle-currencies");
  toggleDiv.onclick = () => toggleCurrencies();

  function displayViews(selectIdName) {
    const convertSelect = document.getElementById(selectIdName);
    convertSelect.onchange = () => convert();
    // First clear node contents
    while (convertSelect.firstChild) convertSelect.removeChild(convertSelect.firstChild);
    // Go ahead and do stuff
    if (coins.length == 0) {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = "No coin found";
      paragraph.style.color = "#cccccc";
      paragraph.style.textAlign = "center";
      paragraph.style.padding = "20px";
      convertSelect.appendChild(paragraph);
      return;
    }
    coins.forEach((coin, index) => {
      const row = createRow(coin, (index + 1));
      convertSelect.appendChild(row);
    });
  }

  function createRow(coin, count) {
    const option = document.createElement("option");
    // Add new option item
    option.value = coin.id;
    option.innerHTML = coin.name;
    option.style.color = "#aaaaaa";

    return option;
  }

  function convert_from_a_to_b(coinAId, coinBId) {
    const coinA = coins.find(coin => coin.id == coinAId);
    const coinB = coins.find(coin => coin.id == coinBId);

    return coinA.price / coinB.price;
  }

  function convert() {
    const inputFrom = document.getElementById("conv-from-val");
    const inputTo = document.getElementById("conv-to-val");

    const coinAId = document.getElementById("conv-from-coin").value;
    const coinBId = document.getElementById("conv-to-coin").value;

    const amount = inputFrom.value;
    const input_b_value = (convert_from_a_to_b(coinAId, coinBId) * amount).toFixed(6);

    inputTo.value = input_b_value;
  }

  function toggleCurrencies() {
    let fromCoinSelect = document.getElementById("conv-from-coin");
    let toCoinSelect = document.getElementById("conv-to-coin");

    const tempCoinSelect = fromCoinSelect.value;

    fromCoinSelect.value = toCoinSelect.value;
    toCoinSelect.value = tempCoinSelect;

    convert();
  }
};