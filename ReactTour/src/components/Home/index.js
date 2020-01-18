import React from "react";

import main_image from "../../assets/Explore.jpg"
import explore1_image from "../../assets/unexplored_image_1.jpg";
import explore2_image from "../../assets/unexplored_image_2.jpg";

function Home() {
  return (
    <div className="home_container">
      <p>
        We backpackers love discovering new places and experiences… but admit it, you love it even more when you’re the first out of your friends to experience a new place, right?! The thrilling sensation of reaching an unknown, undiscovered destination
        is addictive so explore the unexplored tour company would take you to places which would blow your mind!
      </p>
      <img src={main_image} className="image" />;
      <h2>1. Vale do Javari, Brazil</h2>
      <p>
        Vale do Javari is a region in Brazil named after Rio Javari, which forms the border with Peru. According to the Fundação Nacional do Índio, Vale do Javari is home to fourteen tribes of uncontacted indigenous people, meaning the region has the
        greatest concentration of isolated groups with its 2,000 inhabitants.
      </p>
      <img src={explore1_image} className="image" />
      <h2>2. Gangkhar Puensum, Bhutan</h2>
      <p>
        Although it is difficult to establish whether a mountain has been summited, Gangkhar Puensum is among one of the peaks we are yet to conquer. Gangkhar Puensum is a 7,570-metre mountain in Bhutan, an independent South Asian country. The name translates
        to ‘White Peak of the Three Spiritual Brothers’ and the history of attempted climbs is not long.
      </p>
      <img src={explore2_image} className="image" />
    </div>
  )
}

export default Home;