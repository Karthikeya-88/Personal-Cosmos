import Header from "../Header";
import { CgProfile } from "react-icons/cg";
import "./index.css";

const About = () => (
  <>
    <Header />
    <>
      <div className="about-container">
        <h2 className="about-header">What is Personal Cosmos?</h2>
        <ul className="about-ul">
          <li className="linked-in-redirect">
            <a
              href="https://portfolio-k4xr.vercel.app/"
              className="redirect-icon"
            >
              <CgProfile />
            </a>
            Karthikeya Doosa is the creator of Personal Cosmos, an innovative
            web platform.
          </li>
          <li className="about-li">
            Gentle introduction to the fantasy and other genres - Spark your
            imagination, one page at a time.
          </li>
          <li className="about-li">
            Curated selection of limited novels for novice readers and Smooth
            reading experience with concise language and engaging plot
          </li>
          <li className="about-li">
            Builds confidence in reading and exploring new genres
          </li>
          <li className="about-li">
            Introduces readers to the various genres in an approachable way
          </li>
          <li className="about-li">
            Inspires creativity and imagination through engaging stories
          </li>
          <li className="about-li">
            Fosters a deeper connection with the magic of reading
          </li>
          <li className="about-li">
            Encourages readers to think outside the box and explore new ideas
          </li>
        </ul>
      </div>
    </>
  </>
);

export default About;
