import { useState, useRef, useEffect } from "react";
import mystyle from "./StopWatch.module.css";

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  let startTimeRef = useRef(0);
  let intervalIdRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]);

  function startTimer() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stopTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setElapsedTime(0);
  }

  function formatTimer() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    if (hours < 10) {
      hours = "0" + hours;
    }
     if (minutes < 10) {
       minutes = "0" + minutes;
    }
     if (seconds < 10) {
       seconds = "0" + seconds;
    }
     if (milliseconds < 10) {
       milliseconds = "0" + milliseconds;
     }

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className={mystyle.stop_watch_wrapper}>
      <div className={mystyle.stopwatch}>
        <div>
          <h2>{formatTimer()}</h2>
        </div>
        <nav>
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={resetTimer}>Reset</button>
        </nav>
      </div>
    </div>
  );
}
