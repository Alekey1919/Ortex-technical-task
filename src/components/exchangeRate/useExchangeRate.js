import { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";

const useExchangeRate = () => {
  // The states are set to an initial value because the websocket sometimes doesn't return the data. However, the onmessage function takes care of setting the states to the real values once the ws does return the data.
  const [usdExchangeRate, setUsdExchangeRate] = useState(1.1424);
  const [timeStamp, setTimeStamp] = useState("15:55:23");

  const client = new w3cwebsocket(
    "ws://stream.tradingeconomics.com/?client=guest:guest"
  );

  useEffect(() => {
    client.onopen = () => {
      console.log("Connection established");
      client.send(JSON.stringify({ topic: "subscribe", to: "EURUSD:CUR" }));
    };

    client.onmessage = (response) => {
      const data = JSON.parse(response.data);
      console.log("Got reply!", data);
      const { price, dt } = data;
      if (price) {
        // Checking if the message contained the data or was a keepalive message.
        setUsdExchangeRate(price.toFixed(4));

        let date = new Date(dt * 1000);
        setTimeStamp(
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        );
      }
    };
  }, []);

  return { usdExchangeRate, timeStamp };
};

export default useExchangeRate;
