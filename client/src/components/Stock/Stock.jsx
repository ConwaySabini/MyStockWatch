import './Stock.css';
import { useState } from "react";
import { Line } from "react-chartjs-2";
import useDimensions from "react-cool-dimensions";
import TechnicalGraph from '../TechnicalGraph/TechnicalGraph';
import StockButtons from './StockButtons';

// Component to display the individual stock
function Stock({ stock, handleTimeChange, handleStockChange, user,
    handleStockModal, handleTechnicalChange }) {
    // State to track which chart to display (simple or technical)
    const [simpleChart, setSimpleChart] = useState(true);
    // loading state to have components wait for data to load
    const [loading, setLoading] = useState(false);
    // Observe the size of the Stock Card for responsive design
    const { observe, width, height } = useDimensions({
        // breakpoints to change the size of the graph
        breakpoints: { XS: 0, SM: 320, MD: 480, LG: 640 },
        // Will only update the state on breakpoint changed, default is false
        updateOnBreakpointChange: true,
        onResize: ({ observe, unobserve, width, height, entry }) => {
            // Triggered whenever the size of the target is changed...
            unobserve(); // To stop observing the current target element
            observe(); // To re-start observing the current target element
        },
    });

    // dates of the stock for the graph
    const labels = [];
    // prices of the stock for the graph
    const prices = [];

    let militaryTime = false;
    let timeline = "";
    switch (stock.timeline) {
        case '1min': timeline = "30 minutes";
            militaryTime = true;
            break;
        case '5min': timeline = "2.5 hours";
            militaryTime = true;
            break;
        case '15min': timeline = "7.5 hours";
            militaryTime = true;
            break;
        case '30min': timeline = "15 hours";
            militaryTime = true;
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
        default: break;
    }

    // 30 dates and prices for the graph
    let index = stock.data.values.length - 1;

    // Loop through each date and price for the stock and add it to the arrays
    for (let i = 0; i < stock.data.values.length; i++) {
        labels[index] = stock.data.values[i].datetime;
        prices[index] = stock.data.values[i].close;
        index--;
    }

    if (militaryTime) {
        let timeIndex = 0;
        for (let label of labels) {
            labels[timeIndex] = label.slice(11);
            timeIndex++;
        }
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

    // Calculate the Simple Moving Average over a period of time
    const calculateSMA = () => {

    }

    // Calculate the Exponential Moving Average over a period of time
    const calculateEMA = () => {

    }

    // Calculate the Bollinger Bands over a period of time
    const calculateBBANDS = () => {

    }

    // Calculate the MACD over a period of time
    const calculateMACD = () => {

    }

    // Calculate the Stochastic Oscillator over a period of time
    const calculateSTOCH = () => {

    }

    // Calculate the Relative Strength Index over a period of time
    const calculateRSI = () => {

    }

    // When the user changes the timeframe of the stock, update the graph
    const handleTime = (time) => {
        setLoading(true);
        handleTimeChange(time, stock);
        handleStockChange();
        setLoading(false);
    }

    const handleUpdate = (time) => {
        setLoading(true);
        handleTimeChange(time, stock);
        handleStockChange();
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
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
                    <Line data={ChartData} options={options} />
                    <StockButtons
                        handleTime={handleTime}
                        handleChart={handleChart}
                        handleUpdate={handleUpdate}
                        loading={loading}
                        setLoading={setLoading}
                        stock={stock}
                        user={user}
                        handleStockModal={handleStockModal}
                        calculateSMA={calculateSMA}
                        calculateEMA={calculateEMA}
                        calculateBBANDS={calculateBBANDS}
                        calculateMACD={calculateMACD}
                        calculateSTOCH={calculateSTOCH}
                        calculateRSI={calculateRSI}
                        handleTechnicalChange={handleTechnicalChange}
                    />
                </div >
            );
        } else {
            return (
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
                    <TechnicalGraph stock={stock} width={width} height={height} />
                    <StockButtons
                        handleTime={handleTime}
                        handleChart={handleChart}
                        handleUpdate={handleUpdate}
                        loading={loading}
                        setLoading={setLoading}
                        stock={stock}
                        user={user}
                        handleStockModal={handleStockModal}
                        calculateSMA={calculateSMA}
                        calculateEMA={calculateEMA}
                        calculateBBANDS={calculateBBANDS}
                        calculateMACD={calculateMACD}
                        calculateSTOCH={calculateSTOCH}
                        calculateRSI={calculateRSI}
                        handleTechnicalChange={handleTechnicalChange}
                    />
                </div >
            );
        }
    } else {
        // Return the graph
        if (simpleChart) {
            return (
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
                    <Line data={redData} options={options} />
                    <StockButtons
                        handleTime={handleTime}
                        handleChart={handleChart}
                        handleUpdate={handleUpdate}
                        loading={loading}
                        setLoading={setLoading}
                        stock={stock}
                        user={user}
                        handleStockModal={handleStockModal}
                        calculateSMA={calculateSMA}
                        calculateEMA={calculateEMA}
                        calculateBBANDS={calculateBBANDS}
                        calculateMACD={calculateMACD}
                        calculateSTOCH={calculateSTOCH}
                        calculateRSI={calculateRSI}
                        handleTechnicalChange={handleTechnicalChange}
                    />
                </div >
            );
        } else {
            return (
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {timeline}</h3>
                    <TechnicalGraph stock={stock} width={width} height={height} />
                    <StockButtons
                        handleTime={handleTime}
                        handleChart={handleChart}
                        hanelUpdate={handleUpdate}
                        loading={loading}
                        setLoading={setLoading}
                        stock={stock}
                        user={user}
                        handleStockModal={handleStockModal}
                        calculateSMA={calculateSMA}
                        calculateEMA={calculateEMA}
                        calculateBBANDS={calculateBBANDS}
                        calculateMACD={calculateMACD}
                        calculateSTOCH={calculateSTOCH}
                        calculateRSI={calculateRSI}
                        handleTechnicalChange={handleTechnicalChange}
                    />
                </div >
            );
        }
    }
}

export default Stock;
