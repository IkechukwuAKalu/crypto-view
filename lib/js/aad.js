(function () {
  let fetchTries = 0;

  init();

  async function fetchAd() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 5000);
    });
  }

  function displayAd(ad) {
    const adContainer = document.getElementsByClassName("ad-container")[0];
    const adImage = document.createElement("img");
    adImage.classList.add("ad-image");
    adImage.src = ad.image;
    adImage.onclick = () => {
      window.open(ad.link, "_blank");
    };
    adContainer.appendChild(adImage);
  }

  async function init() {
    if (fetchTries > 3) return;
    fetchTries++;
    try {
      let ad = await fetchAd();
      if (!ad) {
        ad = {
          image: "../../images/place-ad.png",
          link: "https://ikechukwuakalu.github.io"
        };
      }
      displayAd(ad);
    } catch (err) {
      init();
    }
  }
}())
