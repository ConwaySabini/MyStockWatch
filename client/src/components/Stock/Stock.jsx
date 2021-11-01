import './Stock.css';
import { useContext, useState, useRef, createRef, useEffect } from "react";
import { StockContext } from "../../context/StockContext";
import { Line } from "react-chartjs-2";
import TechnicalGraph from '../TechnicalGraph/TechnicalGraph';
import StockButtons from './StockButtons';

// Component to display the individual stock
function Stock({ stock, handleTimeChange, handleStockChange }) {
  // stock context api shared data across components
  const { removeStock, addFavorite, findFavorite, addStockToList, getLists } = useContext(StockContext);
  // State to track which chart to display (simple or technical)
  const [simpleChart, setSimpleChart] = useState(true);
  // State to track which list to add the stock to
  const [list, setList] = useState("");
  // State to track all lists
  const [lists, setLists] = useState(getLists());
  // loading state to have components wait for data to load
  const [loading, setLoading] = useState(false);
  // // Ref for the chart
  // const graphRef = useRef();
  // responsive width
  const [width, setWidth] = useState(0);
  // responsive height
  const [height, setHeight] = useState(0);

  // get the width and height of the chart
  const getSize = () => {
    const div = document.querySelector('#StockChart');
    const newWidth = div.clientWidth;
    setWidth(newWidth);
    const newHeight = div.clientHeight;
    setHeight(newHeight);
  };

  // update the size on render
  useEffect(() => {
    getSize();
  }, []);

  // update the size on resize
  useEffect(() => {
    window.addEventListener("resize", getSize);
  }, []);

  //TODO implement
  // function to add a stock to a list
  const addToList = (list) => {
    setLoading(true);


    setLoading(false);
  }

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
  const ChartData = (canvas) => {
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
    setLoading(true);
    handleTimeChange(time, stock);
    handleStockChange(time);
    setLoading(false);
  }

  // When the user adds a favorite to their list update the list
  const handleFavorite = () => {
    setLoading(true);
    const favorite = findFavorite(stock.symbol);
    if (favorite === undefined) {
      addFavorite(stock.symbol, stock.data, stock.percentChange, stock.timeline);
    }
    setLoading(false);
  }

  // function to set the chart to simple or technical
  const handleChart = (flag) => {
    setSimpleChart(flag);
  }

  if (stock.percentChange >= 0) {
    // Return the graph
    if (simpleChart) {
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          <Line data={ChartData} options={options} />
          <StockButtons
            handleTime={handleTime}
            handleFavorite={handleFavorite}
            handleChart={handleChart}
            loading={loading}
            setList={setList}
            removeStock={removeStock}
            lists={lists}
            addToList={addToList}
            stock={stock} />
        </div >
      );
    } else {
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          <TechnicalGraph stock={stock} width={width} height={height} />
          <StockButtons
            handleTime={handleTime}
            handleFavorite={handleFavorite}
            handleChart={handleChart}
            loading={loading}
            setList={setList}
            removeStock={removeStock}
            lists={lists}
            addToList={addToList}
            stock={stock} />
        </div >
      );
    }
  } else {
    // Return the graph
    if (simpleChart) {
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          <Line data={redData} options={options} />
          <StockButtons
            handleTime={handleTime}
            handleFavorite={handleFavorite}
            handleChart={handleChart}
            loading={loading}
            setList={setList}
            removeStock={removeStock}
            lists={lists}
            addToList={addToList}
            stock={stock} />
        </div >
      );
    } else {
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          <TechnicalGraph stock={stock} width={width} height={height} />
          <StockButtons
            handleTime={handleTime}
            handleFavorite={handleFavorite}
            handleChart={handleChart}
            loading={loading}
            setList={setList}
            removeStock={removeStock}
            lists={lists}
            addToList={addToList}
            stock={stock} />
        </div >
      );
    }

  }
}

export default Stock;
