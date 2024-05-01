const mainContent = document.querySelector(".grid__mainContent img");
const mainH2 = document.querySelector(".grid__mainContent h2");
const mainParagraph = document.querySelector(".grid__mainContent p");

const subContentImg = document.querySelectorAll(".sub-contents img");
const subContentH2 = document.querySelectorAll(".sub-contents H2");
const subContentSpan = document.querySelectorAll(".sub-contents span");
const subContentBtn = document.querySelectorAll(".sub-contents button");

const API_KEY = import.meta.env.VITE_API_KEY;

async function collectData() {
  const apiCall = await fetch(
    `https://newsdata.io/api/1/news?apikey=pub_432053a9495df311d59ad804f974228339696&q=pegasus&language=en`
  );

  const data = await apiCall.json();

  return data.results;
}

(async () => {
  const titleCorrecter = (title, num) => {
    if (title.length >= num) return title.slice(0, num).concat(".".repeat(3));
    else title;
  };

  try {
    const data = await collectData();
    console.log(data);

    if (data.length > 0) {
      mainContent.src = data[0].image_url;
      mainH2.innerHTML = titleCorrecter(data[0].title, 40);
      mainParagraph.innerHTML = titleCorrecter(data[0]?.description, 180);

      subContentImg.forEach((el, i) => {
        if (data[i + 1]) {
          if (!data[i + 1].image_url)
            el.src =
              "https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png";
          else el.src = data[i + 1].image_url;

          subContentH2[i].innerHTML = data[i + 1].title;
          subContentSpan[i].innerHTML = data[i + 1].creator[0];
          subContentBtn[i].innerHTML = data[i + 1].pubDate.split(" ")[0];
        } else {
          alert("Not enough articles to populate all elements.");
          console.log(data[i]);
        }
      });
    } else {
      alert("No articles found in the API response.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
})();
