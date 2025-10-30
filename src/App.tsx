import React, { useState } from "react";
import "./App.css";

interface Book {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  cover_i?: number;
  isbn?: string[];
}

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  if (!book) return null;

  const getCoverUrl = (book: Book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    } else if (book.isbn && book.isbn.length > 0) {
      return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`;
    } else {
      return "https://via.placeholder.com/300x400?text=No+Cover";
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img
          src={getCoverUrl(book)}
          alt={book.title}
          className="cover"
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x400?text=No+Cover")
          }
        />

        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}
        </p>
        <p>
          <strong>First Published:</strong> {book.first_publish_year || "N/A"}
        </p>
        <p>
          <strong>Publisher:</strong> {book.publisher?.[0] || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const getCoverUrl = (book: Book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    } else if (book.isbn && book.isbn.length > 0) {
      return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
    } else {
      return "https://via.placeholder.com/150x200?text=No+Cover";
    }
  };

  const searchBooks = async (title: string) => {
    if (!title.trim()) return;

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }

      const data: { docs: Record<string, unknown>[] } = await res.json();

      // ✅ Map and safely transform the data
      const formattedBooks: Book[] = data.docs.slice(0, 15).map((b) => {
        const bookData = b as {
          key?: string;
          title?: string;
          title_suggest?: string;
          author_name?: string[];
          first_publish_year?: number;
          publisher?: string[];
          cover_i?: number;
          isbn?: string[];
        };

        return {
          key: bookData.key ?? Math.random().toString(),
          title: bookData.title ?? bookData.title_suggest ?? "Untitled",
          author_name: bookData.author_name ?? ["Unknown"],
          first_publish_year: bookData.first_publish_year,
          publisher: bookData.publisher,
          cover_i: bookData.cover_i,
          isbn: bookData.isbn,
        };
      });

      console.log("📚 Formatted Books:", formattedBooks);
      setBooks(formattedBooks);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks(query);
  };

  return (
    <div className="container">
      <h1>📚 Book Finder</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="book-grid">
        {books.map((book) => (
          <div
            key={book.key}
            className="book-card"
            onClick={() => setSelectedBook(book)}
          >
            <img
              src={getCoverUrl(book)}
              alt={book.title}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/150x200?text=No+Cover")
              }
            />
            <h3>{book.title ?? "Untitled"}</h3>
            <p>{book.author_name?.join(", ") || "Unknown"}</p>
          </div>
        ))}
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
