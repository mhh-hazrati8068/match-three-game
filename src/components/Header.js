import { useState, useEffect, useRef } from "react";
import Button from "./Button";

const Header = ({ score, seconds }) => {
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
  }, 60000);

  // The state for our timer
  const Ref = useRef(null);

  const [timerDisplay, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
    if (seconds === "00:00") {
      return alert("time is up refresh");
    }
  };

  const clearTimer = (e) => {
    setTimer("01:00");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <div className="wrapper">
      <div className={`score-board ${loaded ? "loaded" : ""}`}>
        <h2>Score: {score}</h2>
      </div>
      <div className={`timer ${loaded ? "loaded" : ""}`}>
        <h2> Time: {timerDisplay} </h2>
      </div>
      <div>
        <Button />
      </div>
    </div>
  );
};

export default Header;
