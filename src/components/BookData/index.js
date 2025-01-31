import React, { Component, createRef } from "react";
import { withRouter, Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./index.css";

class BookData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateY: 0,
      opacity: 1,
    };
    this.cardRef = createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    const cardOffsetTop = this.cardRef.current.offsetTop;
    const cardHeight = this.cardRef.current.offsetHeight;
    const windowHeight = window.innerHeight;

    if (scrollTop + windowHeight > cardOffsetTop + cardHeight / 2) {
      this.setState({ translateY: 0, opacity: 1 });
    } else if (scrollTop + windowHeight < cardOffsetTop + cardHeight / 2) {
      this.setState({ translateY: 100, opacity: 0.4 });
    }
  };

  handleMoreDetails = () => {
    const { history, bookDetails } = this.props;
    history.push(`/books/${bookDetails.id}`);
  };

  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { addCartItem } = value;
          const { title, author, imageUrl } = this.props.bookDetails;

          const onAddToCart = () => {
            addCartItem({ ...this.props.bookDetails });
          };

          return (
            <li
              className="books-list"
              ref={this.cardRef}
              style={{
                transform: `translateY(${this.state.translateY}px)`,
                opacity: this.state.opacity,
              }}
            >
              <h1 className="book-title">{title}</h1>
              <p className="book-author">
                <span
                  style={{ color: "#EE161F", textShadow: "0.8px 0px #FFC603" }}
                >
                  Author -{" "}
                </span>
                {author}
              </p>
              <div className="image-popup">
                <img src={imageUrl} alt={title} className="book-image" />
                <button
                  type="button"
                  className="trigger-button"
                  onClick={this.handleMoreDetails}
                >
                  More Details
                </button>
              </div>
              <button
                type="button"
                className="order-button"
                onClick={onAddToCart}
              >
                <Link to="/cart" className="order-button-link">
                  Order Novel
                </Link>
              </button>
            </li>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default withRouter(BookData);
