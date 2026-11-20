const API_URL = "/api/books";

const bookForm = document.getElementById("bookForm");
const bookId = document.getElementById("bookId");
const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const booksContainer = document.getElementById("booksContainer");
const formTitle = document.getElementById("formTitle");
const cancelBtn = document.getElementById("cancelBtn");

// GET ALL BOOKS

async function getBooks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }

        const books = await response.json();

        displayBooks(books);

    } catch (error) {
        console.error(error);

        booksContainer.innerHTML =
            '<p class="no-books">❌ Unable to load books.</p>';
    }
}

// DISPLAY BOOKS

function displayBooks(books) {
    booksContainer.innerHTML = "";

    if (books.length === 0) {
        booksContainer.innerHTML =
            '<p class="no-books">📚 No books available.</p>';
        return;
    }

    books.forEach(book => {
        const card = document.createElement("div");

        card.className = "book-card";

        const heading = document.createElement("h3");
        heading.textContent = "📖 " + book.title;

        const authorText = document.createElement("p");
        authorText.textContent = "Author: " + book.author;

        const yearText = document.createElement("p");
        yearText.textContent = "Year: " + book.year;

        const actions = document.createElement("div");
        actions.className = "book-actions";

        const editButton = document.createElement("button");
        editButton.className = "btn edit-btn";
        editButton.textContent = "✏️ Edit";
        editButton.onclick = () => editBook(book._id);

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn delete-btn";
        deleteButton.textContent = "🗑️ Delete";
        deleteButton.onclick = () => deleteBook(book._id);

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        card.appendChild(heading);
        card.appendChild(authorText);
        card.appendChild(yearText);
        card.appendChild(actions);

        booksContainer.appendChild(card);
    });
}

// ADD AND UPDATE BOOK

bookForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const bookData = {
        title: title.value,
        author: author.value,
        year: year.value
    };

    try {
        let response;

        if (bookId.value) {
            response = await fetch(`${API_URL}/${bookId.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookData)
            });
        } else {
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookData)
            });
        }

        if (!response.ok) {
            throw new Error("Operation failed");
        }

        alert(bookId.value ?
            "✅ Book updated successfully!" :
            "✅ Book added successfully!");

        resetForm();
        getBooks();

    } catch (error) {
        console.error(error);
        alert("❌ Something went wrong!");
    }
});

// EDIT BOOK

async function editBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Book not found");
        }

        const book = await response.json();

        bookId.value = book._id;
        title.value = book.title;
        author.value = book.author;
        year.value = book.year;

        formTitle.innerHTML = "✏️ Update Book";

        cancelBtn.style.display = "inline-block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);
        alert("❌ Unable to get book details!");
    }
}

// DELETE BOOK

async function deleteBook(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete book");
        }

        alert("🗑️ Book deleted successfully!");

        getBooks();

    } catch (error) {
        console.error(error);
        alert("❌ Unable to delete book!");
    }
}

// CANCEL EDIT

function cancelEdit() {
    resetForm();
}

// RESET FORM

function resetForm() {
    bookForm.reset();

    bookId.value = "";

    formTitle.innerHTML = "➕ Add New Book";

    cancelBtn.style.display = "none";
}

// LOAD BOOKS

document.addEventListener("DOMContentLoaded", function() {
    getBooks();
});