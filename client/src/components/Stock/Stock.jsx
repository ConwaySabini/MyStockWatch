import './Stock.css';
import { useContext, useEffect, useState } from "react";
import { StockContext } from "../../context/StockContext";
import { Line } from "react-chartjs-2";

function Stock({ stock, handleTimeChange }) {
  const { removeStock, addFavorite, findFavorite } = useContext(StockContext);

  //TODO set timeline to change when button is clicked

  const labels = [];
  const prices = [];
  let index = 29;

  for (let i = 0; i < stock.data.values.length; i++) {
    labels[index] = stock.data.values[i].datetime;
    prices[index] = stock.data.values[i].close;
    index--;
  }

  console.log("stock", stock);

  const options = {
    responsive: true,
    title: {
      display: true,
      // position: "top",
      text: stock.symbol,
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: stock.symbol,
        data: prices,
        fill: true,
        backgroundColor: 'rgba(72, 95, 199)',
        borderColor: 'rgba(0, 209, 178, 0.6)',
      },
    ],
  };

  const handleTime = (time) => {
    handleTimeChange(time, stock);
  }

  const handleFavorite = () => {
    const favorite = findFavorite(stock.symbol);
    if (favorite === undefined) {
      addFavorite(stock.symbol, stock.data, stock.percentChange, stock.timeline);
    }
  }


  return (
    <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4">
      <Line data={data} options={options} />
      <span className="favorite" class="button is-warning modal-button ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</span>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1min')}>30Min</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('5min')}>2.5H</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('15min')}>7.5H</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('30min')}>15H</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1h')}>~1D</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('2h')}>~1W</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1day')}>1M</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1week')}>6M+</button>
      <button class="button is-link ml-4 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1month')}>2.5Y</button>
      <button className="delete-stock" class="button is-danger ml-4 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </div >
  );
}

export default Stock;
