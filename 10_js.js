function getEl(id) {
  return document.getElementById(id);
}

function showOnlyOnePanel(panelToShowId) {
  const filterForm = getEl("filterContent");
  const newForm = getEl("newContent");

  if (panelToShowId === "filterContent") {

    const isVisible = filterForm.style.display !== "none";
    filterForm.style.display = isVisible ? "none" : "block";

    newForm.style.display = "none";
  } else if (panelToShowId === "newContent") {

    const isVisible = newForm.style.display !== "none";
    newForm.style.display = isVisible ? "none" : "flex";

    filterForm.style.display = "none";
  }
}

function applySingleFilter(articleClass, shouldShow) {
  const articles = document.querySelectorAll("article." + articleClass);
  for (const a of articles) {
    a.style.display = shouldShow ? "" : "none";
  }
}

function getSelectedType() {
  const opinion = getEl("opinionRadio");
  const recipe = getEl("recipeRadio");
  const life = getEl("lifeRadio");

  if (opinion && opinion.checked) return { cls: "opinion", label: "Opinion" };
  if (recipe && recipe.checked) return { cls: "recipe", label: "Recipe" };
  if (life && life.checked) return { cls: "update", label: "Update" }; // matches your CSS class
  return null;
}

function getNextArticleNumber() {
  const all = document.querySelectorAll("#articleList article");
  return all.length + 1;
}

function showFilter() {
  showOnlyOnePanel("filterContent");
}

function showAddNew() {
  showOnlyOnePanel("newContent");
}

function filterArticles() {
  const opinionChecked = getEl("opinionCheckbox").checked;
  const recipeChecked = getEl("recipeCheckbox").checked;
  const updateChecked = getEl("updateCheckbox").checked;

  applySingleFilter("opinion", opinionChecked);
  applySingleFilter("recipe", recipeChecked);
  applySingleFilter("update", updateChecked);
}

function addNewArticle() {
  const titleInput = getEl("inputHeader");
  const textInput = getEl("inputArticle");

  const title = (titleInput.value || "").trim();
  const text = (textInput.value || "").trim();
  const type = getSelectedType();

  if (!title) {
    alert("Please enter a title.");
    return;
  }
  if (!type) {
    alert("Please choose an article type.");
    return;
  }
  if (!text) {
    alert("Please enter article text.");
    return;
  }

s
  const article = document.createElement("article");
  article.className = type.cls;
  article.id = "a" + getNextArticleNumber();

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = type.label;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const link = document.createElement("a");
  link.href = "moreDetails.html";
  link.textContent = "Read more...";
  pLink.appendChild(link);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

 
  getEl("articleList").appendChild(article);


  titleInput.value = "";
  textInput.value = "";
  getEl("opinionRadio").checked = false;
  getEl("recipeRadio").checked = false;
  getEl("lifeRadio").checked = false;

  getEl("newContent").style.display = "none";

  filterArticles();
}


document.addEventListener("DOMContentLoaded", () => {
  getEl("filterContent").style.display = "none";
  getEl("newContent").style.display = "none";

  filterArticles();
});
