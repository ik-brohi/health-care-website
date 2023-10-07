// Handle image insertion
document.getElementById("image-upload").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("preview-image");
            document.getElementById("image-preview").innerHTML = ""; // Clear previous preview
            document.getElementById("image-preview").appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Handle article submission
document.getElementById("article-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const articleTitle = document.getElementById("article-title").value;
    const articleContent = document.getElementById("article-content").value;
    const imagePreviewSrc = document.querySelector("#image-preview img") ? document.querySelector("#image-preview img").src : "";

    // Create an object to represent the article
    const article = {
        title: articleTitle,
        content: articleContent,
        imageSrc: imagePreviewSrc,
    };

    // Check if the form is in edit mode
    const editIndex = this.getAttribute("data-edit-index");
    if (editIndex !== null) {
        // If in edit mode, update the existing article
        updateArticle(article, editIndex);
        refreshArticleList();
    } else {
        // If not in edit mode, save the article as new
        saveArticle(article);
        refreshArticleList();
    }

    // Clear the form and image preview
    this.reset();
    document.getElementById("image-preview").innerHTML = "";
});

// Updated createArticleCard function to include Edit and Delete buttons
function createArticleCard(article, index) {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article-card");
    articleCard.setAttribute("data-index", index);
    articleCard.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.content}</p>
        <img src="${article.imageSrc}" alt="Article Image">
        <div class="button-container" style="align-items: center;">
            <button class="edit-button" data-index="${index}">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
        </div>
    `;

    return articleCard;
}

// Handle article deletion when the delete button is clicked
document.getElementById("article-container").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const indexToDelete = event.target.getAttribute("data-index");
        deleteArticle(indexToDelete);
        refreshArticleList();
    } else if (event.target.classList.contains("edit-button")) {
        const indexToEdit = event.target.getAttribute("data-index");
        const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const articleToEdit = existingArticles[indexToEdit];

        // Populate the form fields with the article data for editing
        document.getElementById("article-title").value = articleToEdit.title;
        document.getElementById("article-content").value = articleToEdit.content;
        document.getElementById("image-preview").innerHTML = `<img src="${articleToEdit.imageSrc}" alt="Image Preview">`;

        // Update the form data attribute for editing
        document.getElementById("article-form").setAttribute("data-edit-index", indexToEdit);
    }
});

// Function to save an article to local storage
function saveArticle(article) {
    // Retrieve existing articles from local storage
    const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];

    // Add the new article to the existing list
    existingArticles.push(article);

    // Save the updated list of articles back to local storage
    localStorage.setItem("articles", JSON.stringify(existingArticles));
}

// Function to update an article in local storage
function updateArticle(article, index) {
    // Retrieve existing articles from local storage
    const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];

    // Update the article at the specified index
    existingArticles[index] = article;

    // Save the updated list of articles back to local storage
    localStorage.setItem("articles", JSON.stringify(existingArticles));
}

// Function to delete an article from local storage
function deleteArticle(index) {
    // Retrieve existing articles from local storage
    const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];

    // Remove the article at the specified index
    existingArticles.splice(index, 1);

    // Save the updated list of articles back to local storage
    localStorage.setItem("articles", JSON.stringify(existingArticles));
}

// Function to load articles from local storage
function loadArticles() {
    const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];

    existingArticles.forEach(function (article, index) {
        const articleCard = createArticleCard(article, index);
        document.getElementById("article-container").appendChild(articleCard);
    });
}

// Function to refresh the article list in the DOM
function refreshArticleList() {
    const articleContainer = document.getElementById("article-container");
    articleContainer.innerHTML = "";
    loadArticles();
}

// Call the loadArticles function to load existing articles on page load
loadArticles();
