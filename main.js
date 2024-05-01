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
    `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=pegasus&language=en`
  );

  if (!apiCall.ok) {
    throw new Error("Failed to fetch data from the API");
  }

  const data = await apiCall.json();

  if (!data.results) {
    throw new Error("No results found in the API response");
  }

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
      console.log(data[0].description);
      mainParagraph.innerHTML = data[0].description;

      subContentImg.forEach((el, i) => {
        if (data[i + 1]) {
          if (!data[i + 1].image_url)
            el.src =
              "https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png";
          else el.src = data[i + 1].image_url;

          subContentH2[i].innerHTML = data[i + 1].title;
          subContentSpan[i].innerHTML = data[i + 1].creator[0]
            ? data[i + 1].creator[0]
            : "BBC News";
          subContentBtn[i].innerHTML = data[i + 1].pubDate.split(" ")[0];
        } else {
          alert("Not enough articles to populate all elements.");
        }
      });
    } else {
      alert("No articles found in the API response.");
      throw new Error("No Results Found");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
})();
