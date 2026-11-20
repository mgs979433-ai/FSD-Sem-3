const express = require("express");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "books.json");

app.use(express.json());
app.use(express.static(__dirname));

// Create database file if it does not exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Read books
function readBooks() {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save books
function saveBooks(books) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

// GET - Display all books
app.get("/api/books", (req, res) => {
    res.json(readBooks());
});

// GET - Find one book
app.get("/api/books/:id", (req, res) => {
    const books = readBooks();
    const book = books.find(b => b._id === req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// POST - Add new book
app.post("/api/books", (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const books = readBooks();

    const newBook = {
        _id: randomUUID(),
        title,
        author,
        year
    };

    books.push(newBook);
    saveBooks(books);

    res.status(201).json(newBook);
});

// PUT - Update book
app.put("/api/books/:id", (req, res) => {
    const books = readBooks();

    const index = books.findIndex(
        b => b._id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[index] = {
        ...books[index],
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    };

    saveBooks(books);

    res.json(books[index]);
});

// DELETE - Delete book
app.delete("/api/books/:id", (req, res) => {
    const books = readBooks();

    const updatedBooks = books.filter(
        b => b._id !== req.params.id
    );

    if (books.length === updatedBooks.length) {
        return res.status(404).json({ message: "Book not found" });
    }

    saveBooks(updatedBooks);

    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});