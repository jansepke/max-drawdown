import Head from "next/head";
import React from "react";
import App from "../App";
import { calculateTableData } from "../services/Calculator";
import { getIndexData } from "../services/Data";

export default ({ index, tableData }) => {
  const parsedTableData = tableData.map(item => ({
    ...item,
    startDate: new Date(item.startDate),
    endDate: new Date(item.endDate),
    doneDate: item.doneDate ? new Date(item.doneDate) : null
  }));

  return (
    <>
      <Head>
        <title>Historic Stock Market Crashes</title>
        <meta
          name="description"
          content="Analyze historic stock market crashes for different popular indices (MSCI World, ACWI). Filter crashes with adjustable maximum drawdown. Support buy and hold strategy."
        />
      </Head>
      <App index={index} initialTableData={parsedTableData} />
    </>
  );
};

export const getServerSideProps = async ({
  query: { index = "msci-world" }
}) => {
  const indexData = await getIndexData(index);
  const tableData = calculateTableData(indexData, 30).map(item => ({
    ...item,
    startDate: item.startDate.toString(),
    endDate: item.endDate.toString(),
    doneDate: item.doneDate?.toString() || null
  }));

  return {
    props: { index, tableData }
  };
};
