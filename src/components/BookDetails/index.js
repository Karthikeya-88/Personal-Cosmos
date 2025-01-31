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
          <h1 className="detail-book-title">
            {bookDetails.book.title || "No Title Available"}
          </h1>
          {bookDetails.book.imageUrl && (
            <img
              src={bookDetails.book.imageUrl}
              alt={bookDetails.book.title}
              className="book-details-img"
            />
          )}
          <p className="popup-items">
            Author: <span className="span-item">{bookDetails.book.author}</span>
          </p>
          <p className="popup-items">
            Category:{" "}
            <span className="span-item">{bookDetails.book.category}</span>
          </p>
          <p className="popup-items">
            Published Date:{" "}
            <span className="span-item">{bookDetails.book.published_date}</span>
          </p>
          <p className="popup-items">
            Page Count:{" "}
            <span className="span-item">{bookDetails.book.pages}</span>
          </p>
          <p className="popup-items">
            Availability:{" "}
            <span className="span-item">{bookDetails.book.availability}</span>
          </p>
          <p className="popup-items">
            Overview:{" "}
            <span className="span-item">{bookDetails.book.overview}</span>
          </p>
          <Link to="/books" style={{ marginTop: "16px" }}>
            Go Back
          </Link>
        </div>
      </div>
    );
  }
}

export default BookDetails;
