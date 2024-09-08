import ChartUp from "../../assets/chart-up.svg";
import ChartDown from "../../assets//chart-down.svg";

import React from "react";
import { ScaleLoader } from "react-spinners";
import styles from "./TableCoin.module.css";
import { marketChart } from "../../services/cryptoAPI";

function TableCoin({ coins, isLoading, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <ScaleLoader color="white" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} setChart={setChart} key={coin.id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ coin, setChart }) => {
  const showHandler = () => {
    try {
      const getChart = async () => {
        const response = await fetch(marketChart(coin.id));
        const data = await response.json();
        setChart({ ...data, coin });
      };
      getChart();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={coin.image} />
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>

      <td>{coin.name}</td>
      <td>{coin.current_price.toLocaleString()}</td>
      <td
        className={
          coin.price_change_percentage_24h > 0 ? styles.success : styles.error
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{coin.total_volume}</td>
      <td>{coin.market_cap}</td>
      <td>
        <img src={coin.price_change_percentage_24h > 0 ? ChartUp : ChartDown} />
      </td>
    </tr>
  );
};
