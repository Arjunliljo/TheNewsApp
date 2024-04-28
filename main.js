// first section
const mainContent = document.querySelector(".grid__mainContent img");
const subContentImg = document.querySelectorAll(".sub-contents img");
const subContentH2 = document.querySelectorAll(".sub-contents H2");
const subContentSpan = document.querySelectorAll(".sub-contents span");

const API_KEY = import.meta.env.VITE_API_KEY;

async function collectData() {
  try {
    const apiCall = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`
    );

    if (!apiCall.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await apiCall.json();
    return data.articles;
  } catch (error) {
    alert("Error fetching data:", error.message);
    return [];
  }
}

(async () => {
  try {
    const data = await collectData();
    console.log(data);

    if (data.length > 0) {
      mainContent.src = data[0].urlToImage;

      subContentImg.forEach((el, i) => {
        if (data[i + 1]) {
          el.src = data[i + 1].urlToImage;
          subContentH2[i].innerHTML = data[i + 1].title;
          subContentSpan[i].innerHTML = data[i + 1].author;
        } else {
          alert("Not enough articles to populate all elements.");
        }
      });
    } else {
      alert("No articles found in the API response.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
})();
