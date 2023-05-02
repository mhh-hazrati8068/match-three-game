import React from "react";
import { useState } from "react";

const Button = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
  }, 60000);

  return (
    <div >
      <button className={`gameover ${loaded ? "loaded" : ""}`} onClick={refreshPage}>Replay</button>
    </div>
  );
};

export default Button;
