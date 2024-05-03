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
    console.log("collect data error");
    throw new Error("Failed to fetch data from the API");
  }

  const data = await apiCall.json();

  if (!data.results) {
    console.log("collect data error");
    throw new Error("No results found in the API response");
  }

  renderContents(data.results.slice(3));

  return data.results;
}

(async () => {
  const titleCorrecter = (title, num) => {
    if (title.length >= num) return title.slice(0, num).concat(".".repeat(3));
    else title;
  };

  const data = await collectData();

  if (data.length > 0) {
    console.log(data);
    mainContent.src = data[0]?.image_url;
    mainH2.innerHTML = titleCorrecter(data[0]?.title, 40);

    mainParagraph.innerHTML = data[0]?.description;

    subContentImg.forEach((el, i) => {
      if (data[i + 1]) {
        if (!data[i + 1]?.image_url)
          el.src =
            "https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg";
        else el.src = data[i + 1]?.image_url;

        subContentH2[i].innerHTML =
          data[i + 1]?.title || "Title Not Present in The API";
        subContentSpan[i].innerHTML = data[i + 1]?.creator || "BBC News";
        subContentBtn[i].innerHTML =
          data[i + 1]?.category?.at(0)?.toUpperCase() ||
          data[i + 1]?.keywords?.at(0)?.toUpperCase() ||
          data[i + 1]?.pubDate.split(" ").at(0) ||
          "Trending";
      } else {
        alert("Not enough articles to populate all elements.");
      }
    });
  } else {
    alert("No articles found in the API response.");
    throw new Error("No Results Found");
  }
})();

const treandingItems = document.querySelectorAll(".treanding-grid-contents");
const treandingImg = document.querySelectorAll(".treanding-grid-contents img");
const treandingH2 = document.querySelectorAll(".treanding-grid-contents h2");
const treandingSpan = document.querySelectorAll(
  ".treanding-grid-contents span"
);

async function renderContents(data) {
  console.log(data);
  treandingItems.forEach((element, i) => {
    treandingImg.src = data;
  });
}
