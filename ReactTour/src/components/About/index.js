import React from "react";

import "./style.css";

function About() {
  return (
    <div>
      <div className="main-about">
        About our Tour:
      </div>
      <div className="aboutheader">
        <p>
          <b>Explore the Unexplored</b> tour company will take you to places which you have never heard of.
        </p>
      </div>
      <div className="textarea">
        For more Information or reservation, you can email us with your queries.
        <textarea></textarea>
        <button>Submit</button>
      </div>
    </div>
  )
}

export default About;