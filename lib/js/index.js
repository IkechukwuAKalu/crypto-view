const pricesTab = document.getElementsByClassName("tab-btn")[0];
const conversionTab = document.getElementsByClassName("tab-btn")[1];
const pricesTabContent = document.getElementsByClassName("tab-content")[0];
const conversionTabContent = document.getElementsByClassName("tab-content")[1];

// Add click listeners for the tabs
pricesTab.addEventListener("click", () => toggleTabs(true));
conversionTab.addEventListener("click", () => toggleTabs(false));

init();

function toggleTabs(showPrices) {
  if (showPrices) {
    conversionTab.classList.remove("tab-active");
    conversionTabContent.classList.remove("tab-content-visible");
    pricesTab.classList.add("tab-active");
    pricesTabContent.classList.add("tab-content-visible");
  } else {
    pricesTab.classList.remove("tab-active");
    pricesTabContent.classList.remove("tab-content-visible");
    conversionTab.classList.add("tab-active");
    conversionTabContent.classList.add("tab-content-visible");
  }
}

function formatThousands(num) {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function createLoader(rootClass) {
  const root = document.getElementsByClassName(rootClass)[0];
  const loaderContainer = document.createElement("div");
  const loader = document.createElement("div");
  loaderContainer.appendChild(loader);
  root.appendChild(loaderContainer);
  return { loaderContainer, loader };
}

function toggleLoaderView(show, loaderContainer, loader) {
  if (show) {
    loaderContainer.classList.add("loader-container");
    loader.classList.add("loader");
  } else {
    loaderContainer.classList.remove("loader-container");
    loader.classList.remove("loader");
  }
}

function init() {
  toggleTabs(true);
}
