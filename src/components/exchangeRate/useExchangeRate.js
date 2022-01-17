import { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";

const useExchangeRate = () => {
  const [usdExchangeRate, setUsdExchangeRate] = useState();
  const [timeStamp, setTimeStamp] = useState();

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
        setUsdExchangeRate(price);

        let date = new Date(dt);
        setTimeStamp(
          `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
          ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`
        );
      }
    };
  }, []);

  return { usdExchangeRate, timeStamp };
};

export default useExchangeRate;
