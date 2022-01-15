import React from "react";
import useExchangeRate from "./useExchangeRate";

function ExchangeRate() {
  const { usdExchangeRate, timeStamp } = useExchangeRate();

  return (
    <div className="exchange-rate">
      <div>
        <p>
          1 <span>EUR</span>
        </p>
        <p>=</p>
        <p>
          {usdExchangeRate} <span>USD</span>
        </p>
      </div>
      <p className="time-stamp">{timeStamp}</p>
    </div>
  );
}

export default ExchangeRate;
