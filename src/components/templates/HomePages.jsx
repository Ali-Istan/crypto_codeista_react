import React, { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoAPI";
import Pagination from "../modules/pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";
import Layout from "../../layout/Layout";

function HomePages() {
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinList(page, currency));
      const data = await res.json();
      setCoins(data);
      setIsLoading(false);
    };
    getData();
  }, [page, currency]);

  return (
    <Layout>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} isLoading={isLoading} setChart={setChart} />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </Layout>
  );
}

export default HomePages;
