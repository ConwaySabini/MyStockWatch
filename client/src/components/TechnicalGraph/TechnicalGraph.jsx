import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CandlestickSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
} from "react-financial-charts";

function TechnicalGraph({ stock, width, height }) {
  // Technical Chart Initialization
  let stockData = [];
  let idx = 0;
  let low = stock.data.values[0].close;
  let high = stock.data.values[0].close;

  // get the stock data in order and get the min and max values
  for (let i = stock.data.values.length - 1; i >= 0; i--) {
    low = Math.min(low, stock.data.values[i].close);
    high = Math.max(high, stock.data.values[i].close);
    stockData[idx] = stock.data.values[i];
    idx++;
  }
  // create the dates in the correct format
  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => new Date(d.datetime)
  );
  // css margins for the chart
  const margin = { left: 5, right: 75, top: 24, bottom: 24 };
  // create the scale and other important indicators for the chart 
  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
    stockData
  );
  // round to 2 decimal places
  const pricesDisplayFormat = format(".2f");
  // create responsive height
  const gridHeight = height - margin.top - margin.bottom;
  const chartHeight = gridHeight;
  // date format in year month day
  const dateTimeFormat = "%Y %B %d";
  const timeDisplayFormat = timeFormat(dateTimeFormat);
  // create Y axis scale
  const candleChartExtents = (data) => {
    return [high, low];
  };
  // create label
  const yEdgeIndicator = (data) => {
    return data.close;
  };
  // color the candlestick red or green
  const openCloseColor = (data) => {
    return data.close > data.open ? "#ef5350" : "#26a69a";
  };

  return (
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
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
      id="technical-chart"
    >
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        {/* <XAxis showGridLines showTickLabel={false} id="XAxis" /> */}
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        {/* This is the main chart of candlesticks */}
        <CandlestickSeries />
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
          ]}
        />
        <ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
        <XAxis />
        {/* <YAxis ticks={4} tickFormat={pricesDisplayFormat} /> */}
        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
        />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
}

export default TechnicalGraph;
