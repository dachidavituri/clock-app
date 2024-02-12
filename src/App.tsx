import React from "react";
import "./App.css";
import Quote from "./Components/Quote/Quote";
import { useState, useEffect, useRef } from "react";
import Clock from "./Components/Clock/Clock";
import Information from "./Components/Infomation/Infomation";
function App() {
  interface ApiResponse {
    week_number: number;
    day_of_week: number;
    day_of_year: number;
    timezone: string;
  }
  const [moreOpen, setMoreOpen] = useState(false);
  const [current, setCurrent] = useState({
    hours: 0,
    minutes: "",
  });
  // const reenderCount = useRef(0)
  //   console.log('[parent]', ++reenderCount.current)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrent({ hours: hours, minutes: minutes });
    };
    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, []);

  const latestDataRef = useRef<{
    data: ApiResponse | null;
    error: null | string;
  }>({
    data: null,
    error: null,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        const result = await response.json();
        latestDataRef.current = { data: result, error: null };
      } catch (error) {
        console.log(`error while fething data `, error);
      }
    };
    fetchData();
  }, []);
  const latestData = latestDataRef.current.data;

  return (
    <div
      className={`App ${
        current.hours >= 18 || current.hours <= 6 ? "evening" : ""
      }`}
    >
      {!moreOpen ? <Quote /> : <div className="empty"></div>}
      <Clock
        current={current}
        latestData={latestData}
        setMoreOpen={setMoreOpen}
        moreOpen={moreOpen}
      />
      <Information moreOpen={moreOpen} latestData={latestData} />
    </div>
  );
}
export default App
