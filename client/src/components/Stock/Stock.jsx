import './Stock.css';
import { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { Line } from "react-chartjs-2";

// Component to display the individual stock
function Stock({ stock, handleTimeChange, handleStockChange }) {
  // stock context api shared data across components
  const { removeStock, addFavorite, findFavorite } = useContext(StockContext);

  // dates of the stock for the graph
  const labels = [];
  // prices of the stock for the graph
  const prices = [];

  let timeline = "";
  switch (stock.timeline) {
    default: break;
    case '1min': timeline = "30 minutes";
      break;
    case '5min': timeline = "2.5 hours";
      break;
    case '15min': timeline = "7.5 hours";
      break;
    case '30min': timeline = "15 hours";
      break;
    case '1h': timeline = "30 hours";
      break;
    case '2h': timeline = "1 week";
      break;
    case '1day': timeline = "1 month";
      break;
    case '1week': timeline = "30 weeks";
      break;
    case '1month': timeline = "2.5 years";
      break;

  }


  // 30 dates and prices for the graph
  let index = 29;

  // Loop through each date and price for the stock and add it to the arrays
  for (let i = 0; i < stock.data.values.length; i++) {
    labels[index] = stock.data.values[i].datetime;
    prices[index] = stock.data.values[i].close;
    index--;
  }

  // options for the graph
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

  // data for the graph
  const data = (canvas) => {
    // Create gradients to make the graph pretty
    const ctx = canvas.getContext("2d");
    const gradientStroke = ctx.createLinearGradient(700, 0, 300, 0);
    gradientStroke.addColorStop(1, "rgba(72, 95, 199, 0.6)");
    gradientStroke.addColorStop(0, "rgba(0, 209, 178, 0.6)");
    const gradientFill = ctx.createLinearGradient(700, 0, 300, 0);
    gradientFill.addColorStop(1, "rgba(72, 95, 199, 0.6)");
    gradientFill.addColorStop(0, "rgba(0, 209, 178, 0.6)");

    // return the data for the graph
    return {
      labels: labels,
      datasets: [
        {
          label: stock.symbol,
          data: prices,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          borderWidth: 4,
        },
      ],
    };
  };

  // data for the red graph
  const redData = (canvas) => {
    // Create gradients to make the graph pretty
    const ctx = canvas.getContext("2d");
    const gradientStroke = ctx.createLinearGradient(700, 0, 300, 0);
    gradientStroke.addColorStop(1, "rgba(141, 23, 174, 0.6)");
    gradientStroke.addColorStop(0, "rgba(200, 39, 72, 0.6)");
    const gradientFill = ctx.createLinearGradient(700, 0, 300, 0);
    gradientFill.addColorStop(1, "rgba(141, 23, 174, 0.6)");
    gradientFill.addColorStop(0, "rgba(200, 39, 72, 0.6)");

    // return the data for the graph
    return {
      labels: labels,
      datasets: [
        {
          label: stock.symbol,
          data: prices,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          borderWidth: 4,
        },
      ],
    };
  };

  // When the user changes the timeframe of the stock, update the graph
  const handleTime = (time) => {
    handleTimeChange(time, stock);
    handleStockChange(time);
  }

  // When the user adds a favorite to their list update the list
  const handleFavorite = () => {
    const favorite = findFavorite(stock.symbol);
    if (favorite === undefined) {
      addFavorite(stock.symbol, stock.data, stock.percentChange, stock.timeline);
    }
  }

  if (stock.percentChange >= 0) {
    // Return the graph
    return (
      <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4">
        <h3 id="stock-heading">{timeline}</h3>
        <Line data={data} options={options} />
        <span className="favorite" class="button is-warning modal-button ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</span>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1min')}>30Min</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('5min')}>2.5H</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('15min')}>7.5H</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('30min')}>15H</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1h')}>~1D</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('2h')}>~1W</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1day')}>1M</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1week')}>6M+</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1month')}>2.5Y</button>
        <button className="delete-stock" class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div >
    );
  } else {
    // Return the graph
    return (
      <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4">
        <h3 id="stock-heading">{timeline}</h3>
        <Line data={redData} options={options} />
        <span className="favorite" class="button is-warning modal-button ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</span>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1min')}>30Min</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('5min')}>2.5H</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('15min')}>7.5H</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('30min')}>15H</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1h')}>~1D</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('2h')}>~1W</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1day')}>1M</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1week')}>6M+</button>
        <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1month')}>2.5Y</button>
        <button className="delete-stock" class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div >
    );
  }
}

export default Stock;
