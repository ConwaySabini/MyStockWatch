import './TechnicalGraph.css';
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
  for (let i = stock.data.values.length - 1; i >= 0; i--) {
    if (stock.data.values[idx].close < low) {
      low = stock.data.values[idx].close;
    }
    if (stock.data.values[idx].close > high) {
      high = stock.data.values[idx].close;
    }
    stockData[idx] = stock.data.values[i];
    idx++;
  }
  //TODO debug
  console.log(low, high);

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => new Date(d.datetime)
  );
  const margin = { left: 5, right: 75, top: 24, bottom: 24 };

  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
    stockData
  );

  const pricesDisplayFormat = format(".2f");

  const gridHeight = height - margin.top - margin.bottom;

  const chartHeight = gridHeight;
  const dateTimeFormat = "%Y %B %d";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  //TODO debug
  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };

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
    >
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis showGridLines showTickLabel={false} />
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
        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
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
