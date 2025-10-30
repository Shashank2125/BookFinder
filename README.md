# 📚 Book Finder App

A simple and elegant **Book Finder** web application built using **React + TypeScript + Vite**. It uses the [Open Library API](https://openlibrary.org/developers/api) to search for books and display their covers, authors, and publication details.

---

## Features

- **Search Books:** Search for books by title using Open Library API.
- **Book Covers:** Displays book covers dynamically (fallback placeholder if unavailable).
- **Book Details Modal:** Click on any book to view detailed information (author, publisher, year, etc.).
- **Responsive UI:** Clean layout that adapts well across desktop and mobile screens.
- **Built with Vite:** Fast and lightweight bundler for modern web projects.

---

## Tech Stack

- **Frontend:** React (TypeScript)
- **Styling:** CSS3
- **Build Tool:** Vite
- **API:** Open Library Search API

---

## 📦 Installation & Setup

### 1️ Clone the Repository

```bash
git clone https://github.com/your-username/book-finder.git
cd book-finder
```

### 2️ Install Dependencies

```bash
npm install
```

### 3️ Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### 4️Build for Production

```bash
npm run build
```

### 5️Preview Production Build

```bash
npm run preview
```

---

## Deployment on Vercel

To deploy quickly:

```bash
npm install -g vercel
vercel
```

Then follow the prompts — your project will be deployed instantly.

---

## API Reference

**Endpoint:**

```
https://openlibrary.org/search.json?title={bookTitle}
```

**Example:**

```
https://openlibrary.org/search.json?title=harry+potter
```

---

## 🧑‍💻 Author

**Shashank Shekhar Singh**
Frontend Developer | React | TypeScript | Vite
💼 GitHub: [@Shashank2125](https://github.com/Shashank2125)

---

## License

This project is open-source and available under the **MIT License**.
