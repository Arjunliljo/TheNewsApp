const mainContent = document.querySelector(".grid__mainContent img");
const subContentImg = document.querySelectorAll(".sub-contents img");
const subContentH2 = document.querySelectorAll(".sub-contents H2");
const subContentSpan = document.querySelectorAll(".sub-contents span");

const API_KEY = import.meta.env.VITE_API_KEY;

async function collectData() {
  const apiCall = await fetch(
    `https://newsdata.io/api/1/news?apikey=pub_432053a9495df311d59ad804f974228339696&q=pegasus&language=en`
  );

  const data = await apiCall.json();

  return data.results;
}

(async () => {
  try {
    const data = await collectData();
    console.log(data);

    if (data.length > 0) {
      mainContent.src = data[0].image_url;

      subContentImg.forEach((el, i) => {
        if (data[i + 1]) {
          if (data[i + 1].image_url) {
            el.src = data[i + 1].image_url;
          } else {
            i++;
            el.src = data[i + 1].image_url;
          }
          subContentH2[i].innerHTML = data[i + 1].title;
          subContentSpan[i].innerHTML = data[i + 1].creator[0];
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
