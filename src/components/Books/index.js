import { Component } from "react";
import { CiSearch } from "react-icons/ci";
import { GrAscend, GrDescend } from "react-icons/gr";
import PuffLoader from "react-spinners/PuffLoader";
import "./index.css";

import BookData from "../BookData";
import Header from "../Header";

const categoriesList = [
  { id: "FANTASY", displayText: "Fantasy" },
  { id: "FICTION", displayText: "Fiction" },
  { id: "BIOGRAPHY", displayText: "Biography" },
  { id: "ADVENTURE FICTION", displayText: "Adventure Fiction" },
];

class Books extends Component {
  state = {
    booksData: [],
    searchInput: "",
    isLoading: true,
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    try {
      const response = await fetch(`https://pc-backend-mbl7.vercel.app/books/`);

      if (!response.ok) {
        throw new Error(`Failed to fetch books. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data:", data);

      if (!data.books || data.books.length === 0) {
        this.setState({ booksData: [], isLoading: false });
        return;
      }

      const updatedData = data.books.map((each) => ({
        id: each.id,
        title: each.title,
        author: each.author,
        category: each.category,
        imageUrl: each.imageUrl,
        availability: each.availability,
        pages: each.pages,
        publishedDate: each.published_date,
        overview: each.overview,
      }));

      this.setState({ booksData: updatedData, isLoading: false });
    } catch (error) {
      console.error("Error Fetching Books:", error);
      this.setState({ booksData: [], isLoading: false });
    }
  };

  onChangeSearch = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onActiveCategory = (event) => {
    this.setState(
      { activeCatId: event.target.value, isLoading: true },
      this.getBooks
    );
  };

  sortAscending = () => {
    this.setState((prevState) => ({
      booksData: [...prevState.booksData].sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
    }));
  };

  sortDescending = () => {
    this.setState((prevState) => ({
      booksData: [...prevState.booksData].sort((a, b) =>
        b.title.localeCompare(a.title)
      ),
    }));
  };

  renderNoBooks = () => (
    <div>
      <p>Sorry, no books found in this category.</p>
    </div>
  );

  render() {
    const { booksData, searchInput, isLoading } = this.state;

    const filteredBooks = booksData.filter((each) =>
      each.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
      <div className="books-ultimate-container">
        <Header />
        <div className="books-input">
          <div>
            <button
              type="button"
              className="asc-button"
              onClick={this.sortAscending}
            >
              <GrAscend />
            </button>
            <button
              type="button"
              className="asc-button"
              onClick={this.sortDescending}
            >
              <GrDescend />
            </button>
          </div>
          <div
            className="search-bar"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearch}
              style={{ border: "0" }}
            />
            <CiSearch style={{ fontSize: "medium" }} />
          </div>
        </div>

        {isLoading ? (
          <div className="loader-spinner">
            <PuffLoader
              color="#000000"
              loading={true}
              size={160}
              aria-label="Loading Spinner"
            />
          </div>
        ) : filteredBooks.length > 0 ? (
          <ul className="books-unordered-list">
            {filteredBooks.map((each) => (
              <BookData key={each.id} bookDetails={each} />
            ))}
          </ul>
        ) : (
          this.renderNoBooks()
        )}
      </div>
    );
  }
}

export default Books;
