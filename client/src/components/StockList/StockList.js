import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import Stock from "./../Stock/Stock";

const StockList = () => {
  const { stocks } = useContext(StockContext);

  return (
    <div>
      {stocks.length ? (
        <div className="list">
          {stocks.map(stock => {
            return <Stock stock={stock} key={stock.id} />;
          })}
        </div>
      ) : (
        <div className="no-stocks">No Stocks</div>
      )}
    </div>
  );
};

export default StockList;
