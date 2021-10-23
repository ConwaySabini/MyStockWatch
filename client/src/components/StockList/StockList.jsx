import React, { useContext, useState } from "react";
import { StockContext } from "../../context/StockContext";
import Stock from "./../Stock/Stock";

const StockList = ({ handleTimeChange, filterSymbols }) => {
  const { stocks } = useContext(StockContext);
  const [filteredStocks, setFilteredStocks] = useState([]);

  if (filterSymbols.length === 0) {
    return (
      <div>
        {stocks.length ? (
          <div className="list">
            {stocks.map(stock => {
              return <Stock stock={stock} key={stock.id} handleTimeChange={handleTimeChange} />;
            })}
          </div>
        ) : (
          <div className="no-stocks">No Stocks</div>
        )}
      </div>
    );
  } else {
    let filterStocks = [];
    for (const symbol of filterSymbols) {
      for (let stock of stocks) {
        if (stock.symbol === symbol) {
          filterStocks.push(stock);
        }
      }
    }
    return (
      <div>
        {filterStocks.length ? (
          <div className="list">
            {filterStocks.map(stock => {
              return <Stock stock={stock} key={stock.id} handleTimeChange={handleTimeChange} />;
            })}
          </div>
        ) : (
          <div className="no-stocks">No Stocks</div>
        )}
      </div>
    );
  }

};

export default StockList;
