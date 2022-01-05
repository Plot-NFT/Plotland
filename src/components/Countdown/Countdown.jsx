import * as React from "react";
import ReactCountdown from "react-countdown";

import Counter from "./Counter/Counter";

const Countdown = () => {
  return (
    <ReactCountdown date={new Date(2022, 1, 1)} renderer={Counter}>
      <h2>We have launched!</h2>
    </ReactCountdown>
  );
};

export default Countdown;
