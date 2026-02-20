function filterArticles() {
  let showOpinion = document.getElementById("opinionCheckbox").checked;
  let showRecipe = document.getElementById("recipeCheckbox").checked;
  let showUpdate = document.getElementById("updateCheckbox").checked;

  let list = document.getElementById("articleList");
  let allArticles = list.getElementsByTagName("article");

  for (let idx = 0; idx < allArticles.length; idx++) {
    let current = allArticles[idx];

    if (current.classList.contains("opinion")) {
      current.style.display = showOpinion ? "" : "none";
    } else if (current.classList.contains("recipe")) {
      current.style.display = showRecipe ? "" : "none";
    } else if (current.classList.contains("update")) {
      current.style.display = showUpdate ? "" : "none";
    }
  }
}

function showAddNew() {
  let filterBox = document.getElementById("filterContent");
  let addBox = document.getElementById("newContent");

  filterBox.style.display = "none";

  if (addBox.style.display === "none") {
    addBox.style.display = "flex";
  } else {
    addBox.style.display = "none";
  }
}

function showFilter() {
  let filterBox = document.getElementById("filterContent");
  let addBox = document.getElementById("newContent");

  addBox.style.display = "none";

  if (filterBox.style.display === "none") {
    filterBox.style.display = "block";
  } else {
    filterBox.style.display = "none";
  }
}

function addNewArticle() {
  let titleText = document.getElementById("inputHeader").value.trim();
  let bodyText = document.getElementById("inputArticle").value.trim();

  let opinionRadio = document.getElementById("opinionRadio");
  let recipeRadio = document.getElementById("recipeRadio");
  let lifeRadio = document.getElementById("lifeRadio");

  let articleType = "";
  let markerText = "";

  if (opinionRadio.checked) {
    articleType = "opinion";
    markerText = "Opinion";
  } else if (recipeRadio.checked) {
    articleType = "recipe";
    markerText = "Recipe";
  } else if (lifeRadio.checked) {
    articleType = "update";
    markerText = "Update";
  }

  if (titleText === "") {
    alert("Please enter a title.");
    return;
  }
  if (articleType === "") {
    alert("Please select an article type.");
    return;
  }
  if (bodyText === "") {
    alert("Please enter article text.");
    return;
  }

  let list = document.getElementById("articleList");

  let newArticle = document.createElement("article");
  newArticle.className = articleType;

  let marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = markerText;

  let heading = document.createElement("h2");
  heading.textContent = titleText;

  let paragraph = document.createElement("p");
  paragraph.textContent = bodyText;

  let linkP = document.createElement("p");
  let readMore = document.createElement("a");
  readMore.href = "moreDetails.html";
  readMore.textContent = "Read more...";
  linkP.appendChild(readMore);

  newArticle.appendChild(marker);
  newArticle.appendChild(heading);
  newArticle.appendChild(paragraph);
  newArticle.appendChild(linkP);

  list.appendChild(newArticle);

  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  opinionRadio.checked = false;
  recipeRadio.checked = false;
  lifeRadio.checked = false;

  document.getElementById("newContent").style.display = "none";

  filterArticles();
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("filterContent").style.display = "none";
  document.getElementById("newContent").style.display = "none";

  filterArticles();
});
