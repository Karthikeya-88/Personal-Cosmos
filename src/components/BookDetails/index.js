import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../Header";
import ClockLoader from "react-spinners/ClockLoader";
import "./index.css";

class BookDetails extends Component {
  state = {
    bookDetails: {},
    loading: true,
    error: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    try {
      const response = await fetch(
        `https://pc-backend-mbl7.vercel.app/books/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      const data = await response.json();
      console.log(data);
      this.setState({ bookDetails: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { loading, error, bookDetails } = this.state;

    if (loading)
      return (
        <>
          <Header />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "200px",
            }}
          >
            <ClockLoader />
          </div>
        </>
      );
    if (error) return <p>Error: {error}</p>;
    if (!bookDetails) return <p>Book not found</p>;

    return (
      <div className="books-ultimate-container">
        <Header />

        <div className="book-details-container">
          {bookDetails.book.imageUrl && (
            <img
              src={bookDetails.book.imageUrl}
              alt={bookDetails.book.title}
              className="book-details-img"
            />
          )}
          <div className="book-details-content">
            <h1 className="detail-book-title">
              {bookDetails.book.title || "No Title Available"}
            </h1>
            <div className="details-grid">
              <div className="detail-item">
                <h3>Author</h3>
                <p>{bookDetails.book.author || "N/A"}</p>
              </div>
              <div className="detail-item">
                <h3>Category</h3>
                <p>{bookDetails.book.category || "N/A"}</p>
              </div>
              <div className="detail-item">
                <h3>Published Date</h3>
                <p>{bookDetails.book.published_date || "N/A"}</p>
              </div>
              <div className="detail-item">
                <h3>Page Count</h3>
                <p>{bookDetails.book.pages || "N/A"}</p>
              </div>
              <div className="detail-item">
                <h3>Availability</h3>
                <p>{bookDetails.book.availability || "N/A"}</p>
              </div>
            </div>
            <div className="overview">
              <h3>Overview</h3>
              <p>{bookDetails.book.overview || "No overview available."}</p>
            </div>
            <Link to="/books" style={{ marginTop: "16px" }}>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BookDetails;
