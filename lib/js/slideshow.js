(function () {
  let initTries = 0;
  let slideIndex = 0;

  const { loaderContainer, loader } = createLoader("slides-root");

  init();

  function toggleLoader(show) {
    toggleLoaderView(show, loaderContainer, loader);
  }

  async function fetchNews() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          [
            {
              title: "$2 Billion Lost in Mt. Gox Bitcoin Hack Can Be Recovered, Lawyer Claims",
              image: "https://static.coindesk.com/wp-content/uploads/2014/04/Mt.-Gox-bitcoin-Mark-Karpeles1-860x430.png",
              source: "coindesk.com",
              url: "https://www.coindesk.com/2-billion-lost-in-mt-gox-bitcoin-hack-can-be-recovered-lawyer-claims"
            },
            {
              title: "Cybercriminals Selling Hacked Fiat Money for Bitcoin at 10% of Its Value",
              image: "https://static.coindesk.com/wp-content/uploads/2017/04/Hacker-860x430.jpg",
              source: "coindesk.com",
              url: "https://www.coindesk.com/cybercriminals-selling-hacked-fiat-money-for-bitcoin-at-10-of-its-value"
            },
            {
              title: "Russian Banks Want to Eliminate Cryptocurrency Anonymity",
              image: "https://cimg.co/w/articles-attachments/0/5d7/b1a75e632f.jpg",
              source: "cryptonews.com",
              url: "https://cryptonews.com/news/russian-banks-want-to-eliminate-cryptocurrency-anonymity-4641.htm"
            }
          ]
        );
      }, 2000);
    });
  }

  function createSlide(newsItem) {
    const slide = document.createElement("div");
    slide.onclick = () => {
      window.open(newsItem.url, "_blank");
    };
    // Add news image
    slide.classList.add("mySlides", "fade");
    const image = document.createElement("img");
    image.classList.add("slide-image");
    image.src = newsItem.image;
    slide.appendChild(image);
    // Add news source
    const source = document.createElement("p");
    source.classList.add("news-source");
    source.innerHTML = `- ${newsItem.source}`;
    // Add news title
    const title = document.createElement("div");
    title.classList.add("text");
    title.innerHTML = newsItem.title;
    title.appendChild(source);
    slide.appendChild(title);
    return slide;
  }

  function displayNews(news = []) {
    const slidesContainer = document.getElementsByClassName("slideshow-container")[0];
    news.forEach((newsItem) => {
      const slide = createSlide(newsItem);
      slidesContainer.appendChild(slide);
    });
  }

  function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000);
  }

  async function init() {
    if (initTries > 3) return;
    initTries++;
    try {
      toggleLoader(true);
      const news = await fetchNews();
      toggleLoader(false);
      displayNews(news);
      showSlides();
    } catch (err) {
      toggleLoader(false);
      init();
    }
  }
}())