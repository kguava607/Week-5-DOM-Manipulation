// 10_js.js

// Hide both panels when the page loads (requirement: menus appear when buttons are clicked)
window.onload = function () {
  document.getElementById("filterContent").style.display = "none";
  document.getElementById("newContent").style.display = "none";

  // Apply filtering based on the default checkbox states on load
  filterArticles();
};

// Toggle filter menu
function showFilter() {
  var filterForm = document.getElementById("filterContent");
  var newForm = document.getElementById("newContent");

  // Hide add form if open
  newForm.style.display = "none";

  // Toggle filter form
  if (filterForm.style.display === "none") {
    filterForm.style.display = "block";
  } else {
    filterForm.style.display = "none";
  }
}

// Toggle add-new form
function showAddNew() {
  var filterForm = document.getElementById("filterContent");
  var newForm = document.getElementById("newContent");

  // Hide filter form if open
  filterForm.style.display = "none";

  // Toggle new form
  if (newForm.style.display === "none") {
    // Your CSS uses flex layout for this form
    newForm.style.display = "flex";
  } else {
    newForm.style.display = "none";
  }
}

// Filter articles based on checkboxes
function filterArticles() {
  var showOpinion = document.getElementById("opinionCheckbox").checked;
  var showRecipe = document.getElementById("recipeCheckbox").checked;
  var showUpdate = document.getElementById("updateCheckbox").checked;

  // opinion
  var opinionArticles = document.querySelectorAll("article.opinion");
  for (var i = 0; i < opinionArticles.length; i++) {
    opinionArticles[i].style.display = showOpinion ? "" : "none";
  }

  // recipe
  var recipeArticles = document.querySelectorAll("article.recipe");
  for (var j = 0; j < recipeArticles.length; j++) {
    recipeArticles[j].style.display = showRecipe ? "" : "none";
  }

  // update
  var updateArticles = document.querySelectorAll("article.update");
  for (var k = 0; k < updateArticles.length; k++) {
    updateArticles[k].style.display = showUpdate ? "" : "none";
  }
}

// Add a new article to the list with correct styles
function addNewArticle() {
  var titleValue = document.getElementById("inputHeader").value.trim();
  var textValue = document.getElementById("inputArticle").value.trim();

  // Determine type from radios
  var typeClass = "";
  var typeLabel = "";

  if (document.getElementById("opinionRadio").checked) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } else if (document.getElementById("recipeRadio").checked) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } else if (document.getElementById("lifeRadio").checked) {
    typeClass = "update";
    typeLabel = "Update";
  }

  // Basic validation (simple + slide-friendly)
  if (titleValue === "") {
    alert("Please enter a title.");
    return;
  }
  if (typeClass === "") {
    alert("Please choose an article type.");
    return;
  }
  if (textValue === "") {
    alert("Please enter article text.");
    return;
  }

  // Create article node
  var newArticle = document.createElement("article");
  newArticle.classList.add(typeClass);

  // Marker (styled by your CSS)
  var marker = document.createElement("span");
  marker.classList.add("marker");
  marker.innerText = typeLabel;

  // Title
  var h2 = document.createElement("h2");
  h2.innerText = titleValue;

  // Text
  var pText = document.createElement("p");
  pText.innerText = textValue;

  // Read more link (matches your existing articles)
  var pLink = document.createElement("p");
  var a = document.createElement("a");
  a.href = "moreDetails.html";
  a.innerText = "Read more...";
  pLink.appendChild(a);

  // Build structure
  newArticle.appendChild(marker);
  newArticle.appendChild(h2);
  newArticle.appendChild(pText);
  newArticle.appendChild(pLink);

  // Add to list
  document.getElementById("articleList").appendChild(newArticle);

  // Clear inputs
  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  document.getElementById("opinionRadio").checked = false;
  document.getElementById("recipeRadio").checked = false;
  document.getElementById("lifeRadio").checked = false;

  // Hide the add form after adding (common expectation in your sample flow)
  document.getElementById("newContent").style.display = "none";

  // Make sure the new article follows the current filter checkbox states
  filterArticles();
}
