import "./Clock.css";
import sun from "../../assets/desktop/icon-sun.svg";
import moon from "../../assets/desktop/icon-moon.svg";
import arrowDown from "../../assets/desktop/icon-arrow-down.svg";
import React from "react";
import {useRef} from 'react'
interface ClockProps{
    current: {
        hours: number;
        minutes: string
    }
    latestData: {
        timezone: string
    } | null
    moreOpen: boolean
    setMoreOpen: (moreOpen: boolean) => void;

}
function Clock({current, latestData, moreOpen, setMoreOpen}: ClockProps) {
    const imgSrc = current.hours >= 18 || current.hours <= 6 ? moon : sun;
    const reenderCount = useRef(0)
    console.log('child', ++reenderCount.current)
  return (
    <div className="info-section">
      <div className="container">
        <div>
        <div className="greet-section">
       
          <img src={imgSrc} />
          <p className="greet">
            {current.hours >= 18 || current.hours <= 6
              ? "good evening"
              : "good morning"}
          </p>
        </div>
        <div className="time-section">
          <h1 className="time">
            {current.hours === 0 ? '00' : current.hours}:{current.minutes}
          </h1>
          <p className="bst">BST</p>
        </div>
        <div>
          {latestData && (
            <p className="city">IN {latestData?.timezone.slice(5)}</p>
          )}
        </div>
        </div>
        
       


        <button onClick={() => setMoreOpen(!moreOpen)}>
          {moreOpen ? "less" : "more"}
          <div className="circle">
            {moreOpen ? (
              <img
                src={arrowDown}
                alt="Rotated Image"
                style={{ transform: "rotate(180deg)" }}
              />
            ) : (
              <img src={arrowDown} alt="Original Image" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default React.memo(Clock, (prev, next) => {
  return (
    prev.current.hours === next.current.hours &&
    prev.current.minutes === next.current.minutes &&
    prev.latestData?.timezone === next.latestData?.timezone && 
    prev.moreOpen === next.moreOpen
  );
});

