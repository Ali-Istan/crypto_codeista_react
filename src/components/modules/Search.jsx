import React, { useEffect, useState } from "react";
import { searchCion } from "../../services/cryptoAPI";
import { ScaleLoader } from "react-spinners";
import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (!text) {
      setCoins([]);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCion(text));
        const data = await res.json();
        setIsLoading(false);
        setCoins(data.coins);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        } else {
          console.log(error);
        }
      }
    };
    setIsLoading(true);
    search();

    return () => {
      controller.abort();
    };
  }, [text]);
  return (
    <div className={styles.searchBox}>
      {}
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || IsLoading) && (
        <div className={styles.search}>
          {IsLoading && <ScaleLoader color="white" />}
          <ul>
            {coins?.map((item) => (
              <li key={item.id}>
                <img src={item.thumb} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
