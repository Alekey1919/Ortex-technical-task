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
          `${date.getHours() < 10 ? "0" : "" + date.getHours()}:${
            date.getMinutes() < 10 ? "0" : "" + date.getMinutes()
          }:${date.getSeconds() < 10 ? "0" : "" + date.getSeconds()}`
        );
      }
    };
  }, []);

  return { usdExchangeRate, timeStamp };
};

export default useExchangeRate;
