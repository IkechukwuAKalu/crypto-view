(function () {
  const CURRENCIES_BASE_URL = "https://coinmarketcap.com/currencies/";
  const CURRENCIES_FETCH_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const { loaderContainer, loader } = createLoader("prices-tab");

  let coins = [];
  let fetchTries = 0;

  const searchBox = document.getElementById("search_box");
  searchBox.addEventListener("keyup", () => filterCoins(searchBox.value));

  initCoins();
  
  function toggleLoader(show) {
    toggleLoaderView(show, loaderContainer, loader);
  }

  function filterCoins(query = "") {
    const matches = coins.filter((coin) => {
      const regex = new RegExp(query.trim(), "ig");
      return coin.name.match(regex);
    });
    displayCoins(matches);
  }

  async function fetchCoins() {
    return fetch(CURRENCIES_FETCH_URL)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      return formatResponse(jsonResponse);
    })
    .catch(console.error());
  }

  function formatResponse(jsonResponse) {
    return jsonResponse.map((coin_data) => {
      return {
        name: coin_data.name,
        symbol: coin_data.symbol.toUpperCase(),
        price: coin_data.current_price,
        change_24h: coin_data.price_change_24h,
        percent_change_24h: coin_data.price_change_percentage_24h,
        id: coin_data.id,
        image: coin_data.image
      }
    });
  }

  function createRow(coin, count) {
    const row = document.createElement("tr");
    row.onclick = () => {
      window.open(`${CURRENCIES_BASE_URL}${coin.id}`, "_blank");
    };
    // Add table number
    const tableNum = document.createElement("td");
    tableNum.classList.add("table-num");
    tableNum.innerHTML = count;
    tableNum.style.color = "#aaaaaa";
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
    change.innerHTML = `${formatThousands(coin.change_24h)} (${formatThousands(coin.percent_change_24h)}%)`;
    row.appendChild(change);
    return row;
  }

  function displayCoins(validCoins = []) {
    const coinsTable = document.getElementById("coins-table-body");
    // First clear node contents
    while (coinsTable.firstChild) coinsTable.removeChild(coinsTable.firstChild);
    // Go ahead and do stuff
    if (validCoins.length == 0) {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = "No coin found";
      paragraph.style.color = "#cccccc";
      paragraph.style.textAlign = "center";
      paragraph.style.padding = "20px";
      coinsTable.appendChild(paragraph);
      return;
    }
    validCoins.forEach((validCoin, index) => {
      const row = createRow(validCoin, (index + 1));
      coinsTable.appendChild(row);
    });
  }

  async function initCoins() {
    if (fetchTries > 3) return;
    fetchTries++;
    try {
      toggleLoader(true);
      coins = await fetchCoins();
      toggleLoader(false);
      displayCoins(coins);
      initConversionViews(coins);
    } catch (err) {
      console.error(err);
      toggleLoader(false);
      initCoins();
    }
  }
}());
