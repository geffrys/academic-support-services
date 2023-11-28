import React from "react";
import LOGO from "../img/LOGO.png";
import JAVA from '../img/java.png'
import JAVASCRIPT from '../img/Javascript.png'

import "../css/Landing.css";
import {useNavigate} from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
  return (
    <section className="landing">
      <nav className="landing__nav">
        <figure>
          <img className="landing__logo" src={LOGO} alt="Logo Academic Link" />
          <figcaption>Academic Link</figcaption>
        </figure>
        <button className="profile_button" onClick={()=>{
            navigate("/login");
        }}>Log in</button>
      </nav>
      <section className="landing_container">
        <h1 className="landing_h1">Academic Link Family</h1>
        <p className="landing_p">
        {">"} Embark on a journey of academic excellence with Academic Link – your
          gateway to a world of transformative online learning experiences. At
          Academic Link, we don't just offer courses; we provide educational
          adventures. Immerse yourself in a dynamic learning environment and
          connect with passionate instructors ready to guide you through your
          academic journey.
        </p>
        <p className="landing_p">
          {">"} Are you ready to explore and expand your horizons? Our course catalog
          spans a wide array of subjects, from the sciences to the humanities
          and beyond. Whatever your interest or skill level, you'll find courses
          designed to challenge and nurture your intellectual growth.
        </p>
      </section>
      <section className="landing_carrousel">
      <div className="carousel-container">
        <figure>
          <img src={JAVA} alt="Java" />
          <img src={JAVASCRIPT} alt="JavaScript" />
        </figure>
      </div>
    </section>
    </section>
  );
}

export default LandingPage;
