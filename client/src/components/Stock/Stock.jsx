import './Stock.css';
import { useContext, useState } from "react";
import { StockContext } from "../../context/StockContext";
import { Line } from "react-chartjs-2";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize
} from "react-financial-charts";

//TODO make chart work with month and longer time periods 
//TODO hint: datetime include military time after date with shorter time periods while longer time periods do not include this

// Component to display the individual stock
function Stock({ stock, handleTimeChange, handleStockChange }) {
  // stock context api shared data across components
  const { removeStock, addFavorite, findFavorite } = useContext(StockContext);
  // State to track which chart to display (simple or technical)
  const [simpleChart, setSimpleChart] = useState(true);

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

  // function to set the chart to simple or technical
  const handleChart = (flag) => {
    setSimpleChart(flag);
  }






  // Technical Chart Initialization

  let stockData = [];
  let idx = 0;
  for (let i = 29; i >= 0; i--) {
    stockData[idx] = stock.data.values[i];
    idx++;
  }

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => new Date(d.datetime)
  );
  //TODO make the height and width and margin responsive
  const height = 700;
  const width = 900;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d, c) => {
      d.ema12 = c;
    })
    .accessor((d) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d, c) => {
      d.ema26 = c;
    })
    .accessor((d) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(stockData)));
  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
    stockData
  );
  const pricesDisplayFormat = format(".2f");
  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  //TODO elderRayHeight responsive
  const elderRayHeight = 100;
  const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;
  const yExtents = (data) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const barChartExtents = (data) => {
    return data.volume;
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };

  const volumeColor = (data) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data) => {
    return data.volume;
  };

  const openCloseColor = (data) => {
    return data.close > data.open ? "#ef5350" : "#26a69a";
  };

  if (stock.percentChange >= 0) {
    // Return the graph
    if (simpleChart) {
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          <Line data={ChartData} options={options} />
          <button className="favorite" class="button is-warning ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(false)}>Technical Graph</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(true)}>Simple Graph</button>
          <button className="delete-stock" class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <br />
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1min')}>30Min</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('5min')}>2.5H</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('15min')}>7.5H</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('30min')}>15H</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1h')}>~1D</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('2h')}>~1W</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1day')}>1M</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1week')}>6M+</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1month')}>2.5Y</button>
        </div >
      );
    } else {
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          {/* <Line data={ChartData} options={options} /> */}
          <ChartCanvas
            height={height}
            ratio={3}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
          >
            {/* Chart for the volume in the background of the chart */}
            {/* <Chart
            id={2}
            height={barChartHeight}
            origin={barChartOrigin}
            yExtents={barChartExtents}
          >
            <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
          </Chart> */}
            <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
              <XAxis showGridLines showTickLabel={false} />
              <YAxis showGridLines tickFormat={pricesDisplayFormat} />
              {/* This is the main chart of candlesticks */}
              <CandlestickSeries />
              {/* <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} /> */}
              {/* <CurrentCoordinate
              yAccessor={ema26.accessor()}
              fillStyle={ema26.stroke()}
            />
            <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
            <CurrentCoordinate
              yAccessor={ema12.accessor()}
              fillStyle={ema12.stroke()}
            /> */}
              <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}
              />
              <EdgeIndicator
                itemType="last"
                rectWidth={margin.right}
                fill={openCloseColor}
                lineStroke={openCloseColor}
                displayFormat={pricesDisplayFormat}
                yAccessor={yEdgeIndicator}
              />
              <MovingAverageTooltip
                origin={[8, 24]}
                options={[
                  {
                    yAccessor: ema26.accessor(),
                    type: "EMA",
                    stroke: ema26.stroke(),
                    windowSize: ema26.options().windowSize
                  },
                  {
                    yAccessor: ema12.accessor(),
                    type: "EMA",
                    stroke: ema12.stroke(),
                    windowSize: ema12.options().windowSize
                  }
                ]}
              />

              <ZoomButtons />
              <OHLCTooltip origin={[8, 16]} />
            </Chart>
            {/* Elder Ray chart below */}
            <Chart
              id={4}
              height={elderRayHeight}
              yExtents={[0, elder.accessor()]}
              origin={elderRayOrigin}
              padding={{ top: 8, bottom: 8 }}
            >
              <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
              <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

              <MouseCoordinateX displayFormat={timeDisplayFormat} />
              <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}
              />

              <ElderRaySeries yAccessor={elder.accessor()} />

              <SingleValueTooltip
                yAccessor={elder.accessor()}
                yLabel="Elder Ray"
                yDisplayFormat={(d) =>
                  `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                    d.bearPower
                  )}`
                }
                origin={[8, 16]}
              />
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
          <button className="favorite" class="button is-warning ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(false)}>Technical Graph</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(true)}>Simple Graph</button>
          <button className="delete-stock" class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <br />
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1min')}>30Min</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('5min')}>2.5H</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('15min')}>7.5H</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('30min')}>15H</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1h')}>~1D</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('2h')}>~1W</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1day')}>1M</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1week')}>6M+</button>
          <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1month')}>2.5Y</button>
        </div >
      );
    }
  } else {
    // Return the graph
    if (simpleChart) {
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          <Line data={redData} options={options} />
          <button className="favorite" class="button is-warning ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(false)}>Technical Graph</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(true)}>Simple Graph</button>
          <button className="delete-stock" class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <br />
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
      return (
        <div className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4">
          <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
          <ChartCanvas
            height={height}
            ratio={3}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
          >
            {/* Chart for the volume in the background of the chart */}
            {/* <Chart
            id={2}
            height={barChartHeight}
            origin={barChartOrigin}
            yExtents={barChartExtents}
          >
            <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
          </Chart> */}
            <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
              <XAxis showGridLines showTickLabel={false} />
              <YAxis showGridLines tickFormat={pricesDisplayFormat} />
              {/* This is the main chart of candlesticks */}
              <CandlestickSeries />
              {/* <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} /> */}
              {/* <CurrentCoordinate
              yAccessor={ema26.accessor()}
              fillStyle={ema26.stroke()}
            />
            <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
            <CurrentCoordinate
              yAccessor={ema12.accessor()}
              fillStyle={ema12.stroke()}
            /> */}
              <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}
              />
              <EdgeIndicator
                itemType="last"
                rectWidth={margin.right}
                fill={openCloseColor}
                lineStroke={openCloseColor}
                displayFormat={pricesDisplayFormat}
                yAccessor={yEdgeIndicator}
              />
              <MovingAverageTooltip
                origin={[8, 24]}
                options={[
                  {
                    yAccessor: ema26.accessor(),
                    type: "EMA",
                    stroke: ema26.stroke(),
                    windowSize: ema26.options().windowSize
                  },
                  {
                    yAccessor: ema12.accessor(),
                    type: "EMA",
                    stroke: ema12.stroke(),
                    windowSize: ema12.options().windowSize
                  }
                ]}
              />

              <ZoomButtons />
              <OHLCTooltip origin={[8, 16]} />
            </Chart>
            {/* Elder Ray chart below */}
            <Chart
              id={4}
              height={elderRayHeight}
              yExtents={[0, elder.accessor()]}
              origin={elderRayOrigin}
              padding={{ top: 8, bottom: 8 }}
            >
              <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
              <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

              <MouseCoordinateX displayFormat={timeDisplayFormat} />
              <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}
              />

              <ElderRaySeries yAccessor={elder.accessor()} />

              <SingleValueTooltip
                yAccessor={elder.accessor()}
                yLabel="Elder Ray"
                yDisplayFormat={(d) =>
                  `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                    d.bearPower
                  )}`
                }
                origin={[8, 16]}
              />
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
          <button className="favorite" class="button is-warning ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(false)}>Technical Graph</button>
          <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(true)}>Simple Graph</button>
          <button className="delete-stock" class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <br />
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
}

export default Stock;
