(function () {
  let fetchTries = 0;
  const { loaderContainer, loader } = createLoader("prices-tab");

  initCoins();
  
  function toggleLoader(show) {
    toggleLoaderView(show, loaderContainer, loader);
  }

  async function fetchCoins() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = Array.isArray(coinsPrices) ? coinsPrices : [];
        resolve(data);
      }, 3000);
    });
  }

  function createRow(coin, count) {
    const row = document.createElement("tr");
    row.onclick = () => {
      window.open("#", "_blank");
    };
    // Add table number
    const tableNum = document.createElement("td");
    tableNum.classList.add("table-num");
    tableNum.innerHTML = count;
    row.appendChild(tableNum);
    // Add the coin logo and name
    const nameCol = document.createElement("td");
    // Add the coin logo
    const logo = document.createElement("img");
    logo.classList.add("coin-logo");
    logo.src = coin.image;
    nameCol.appendChild(logo);
    // Add the coin name
    const name = document.createElement("span");
    name.innerHTML = coin.name;
    nameCol.appendChild(name);
    row.appendChild(nameCol);
    // Add coin price
    const price = document.createElement("td");
    price.innerHTML = `$${formatThousands(coin.price)}`;
    row.appendChild(price);
    // Add coin change
    const change = document.createElement("td");
    change.innerHTML = `${formatThousands(coin.change)}%`;
    row.appendChild(change);
    return row;
  }

  function displayCoins(coins = []) {
    const coinsTable = document.getElementsByClassName("coins-table")[0];
    coins.forEach((coin, index) => {
      const row = createRow(coin, (index + 1));
      coinsTable.appendChild(row);
    });
  }

  async function initCoins() {
    if (fetchTries > 3) return;
    fetchTries++;
    try {
      toggleLoader(true);
      const coins = await fetchCoins();
      toggleLoader(false);
      displayCoins(coins);
    } catch (err) {
      toggleLoader(false);
      initCoins();
    }
  }
}())
