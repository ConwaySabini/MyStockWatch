import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import Stock from "./../Stock/Stock";

// Component to display a list of stocks
const StockList = ({ handleTimeChange, filterSymbols, handleStockChange }) => {
  const { stocks } = useContext(StockContext);

  // If there are no stocks to filter display all stocks
  if (filterSymbols.length === 0) {
    return (
      <div>
        {stocks.length ? (
          <div className="list">
            {stocks.map(stock => {
              return <Stock stock={stock} key={stock.id} handleTimeChange={handleTimeChange} handleStockChange={handleStockChange} />;
            })}
          </div>
        ) : (
          <div className="no-stocks">No Stocks</div>
        )}
      </div>
    );
    // Display only filtered stocks
  } else {
    let filterStocks = [];
    // Get each filtered stock and add it to the array
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
              return <Stock stock={stock} key={stock.id} handleTimeChange={handleTimeChange} handleStockChange={handleStockChange} />;
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
