import { useNavigate } from "react-router-dom";
import LOGO from "../img/LOGO.png";
import JAVA from "../img/java.png";
import JAVASCRIPT from "../img/Javascript.png";
import CPP from "../img/c-.png";
import CS from "../img/c-sharp.png";
import PHP from "../img/php.png";
import PYTHON from "../img/python.png";
import HTML from "../img/html-5.png";
import CSS from "../img/css-3.png";
import RUBY from "../img/ruby.png";
import REACT from "../img/react.png";
import SQL from "../img/sql-server.png";
import "../css/Landing.css";

function LandingPage() {
  const navigate = useNavigate();
  const carrousel = () => {
    return (
      <figure className="carousel__container">
        <img className="carousel__img" src={JAVA} alt="Java" />
        <img className="carousel__img" src={JAVASCRIPT} alt="JavaS" />
        <img className="carousel__img" src={CPP} alt="C++" />
        <img className="carousel__img" src={CS} alt="C#" />
        <img className="carousel__img" src={PHP} alt="PHP" />
        <img className="carousel__img" src={PYTHON} alt="Python" />
        <img className="carousel__img" src={HTML} alt="HTML" />
        <img className="carousel__img" src={CSS} alt="CSS" />
        <img className="carousel__img" src={RUBY} alt="Ruby" />
        <img className="carousel__img" src={REACT} alt="React" />
        <img className="carousel__img" src={SQL} alt="SQL" />
      </figure>
    );
  };

  return (
    <section className="landing">
      <nav className="landing__nav">
        <figure>
          <img className="landing__logo" src={LOGO} alt="Logo Academic Link" />
          <figcaption>Academic Link</figcaption>
        </figure>
        <button
          className="profile_button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Enter
        </button>
      </nav>
      <section className="landing__content">
        <h1 className="landing__h1">Academic Link Family</h1>
        <p className="landing__p">
          {">"} Embark on a journey of academic excellence with Academic Link
          your gateway to a world of transformative online learning experiences.
          At Academic Link, we don't just offer courses; we provide educational
          adventures. Immerse yourself in a dynamic learning environment and
          connect with passionate instructors ready to guide you through your
          academic journey.
        </p>
        <p className="landing__p-m">
          {">"} Are you ready to explore and expand your horizons? Our course
          catalog spans a wide array of subjects, from the sciences to the
          humanities and beyond. Whatever your interest or skill level, you'll
          find courses designed to challenge and nurture your intellectual
          growth.
        </p>
      </section>
      <section className="landing__carousel">
        {carrousel()}
        {carrousel()}
        {carrousel()}
      </section>
    </section>
  );
}

export default LandingPage;
