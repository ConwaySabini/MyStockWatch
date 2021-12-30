import './Stock.css';
import { useState, useContext, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { StockContext } from "../../context/StockContext";
import useDimensions from "react-cool-dimensions";
import TechnicalGraph from '../TechnicalGraph/TechnicalGraph';
import StockButtons from './StockButtons';
const axios = require('axios').default;

// Component to display the individual stock
function Stock({ stock, user,
    handleStockModal }) {
    // context api to modify data across components
    const { findTAData, addTAData, stocks, editStock, findFavorite,
        editFavorite, } = useContext(StockContext);

    // State to track which chart to display (simple or technical)
    const [simpleChart, setSimpleChart] = useState(true);
    // loading state to have components wait for data to load
    const [loading, setLoading] = useState(false);
    // set the technical analysis to be displayed
    const [ta, setTA] = useState('');
    // when the technical analysis is changed of a stock this state is changed to reflect that change
    const [technicalChange, setTechnicalChange] = useState(false);
    // flag for updating the stocks on the database
    const [updateStocks, setUpdateStocks] = useState(false);
    // when the timeline is changed of a stock this state is changed to reflect that change
    const [stockChange, setStockChange] = useState(false);
    // timeframe of the stock to graph
    const [timeline, setTimeline] = useState('1day');

    // state to display SMA
    const [sma, setSMA] = useState(false);
    // state to display EMA
    const [ema, setEMA] = useState(false);
    // state to display RSI
    const [rsi, setRSI] = useState(false);
    // state to display MACD
    const [macd, setMACD] = useState(false);
    // state to display Bollinger Bands
    const [bb, setBB] = useState(false);
    // state to display Stochastic Oscillator
    const [stoch, setStoch] = useState(false);

    // server url to update favorites
    const UPDATE_FAVORITES = process.env.REACT_APP_UPDATE_FAVORITES;
    // server url to update lists
    const UPDATE_LISTS = process.env.REACT_APP_UPDATE_LISTS;
    // server url to update stocks
    const UPDATE_STOCKS = process.env.REACT_APP_UPDATE_STOCKS;

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

    // Axios options for getting stock data from 12 Data API
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_RAPIDAPI_TIME_URL,
        params: { interval: `${timeline}`, symbol: stock.symbol, format: 'json', outputsize: '30' },
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
    };

    // Moving Average Convergence Divergence Extended(MACDEXT) 
    // gives greater control over MACD input parameters. MACDEXT has an unstable period ~ 100.
    const MACD = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/macdext',
        params: {
            interval: stock.timeline,
            symbol: stock.symbol,
            slow_period: '26',
            fast_ma_type: 'SMA',
            outputsize: '30',
            fast_period: '12',
            slow_ma_type: 'SMA',
            signal_period: '9',
            format: 'json',
            series_type: 'close',
            signal_ma_type: 'SMA'
        },
        headers: {
            'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
            'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
        }
    };

    // Simple Moving Average(SMA) is an arithmetic moving average calculated by adding 
    // the latest closing prices and then dividing them by the number of time periods.
    const SMA = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/sma',
        params: {
            symbol: stock.symbol,
            interval: stock.timeline,
            series_type: 'close',
            format: 'json',
            outputsize: '30',
            time_period: '9'
        },
        headers: {
            'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
            'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
        }
    };

    // Exponential Moving Average(EMA) places greater importance on recent data points than the normal Moving Average(MA).
    const EMA = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/ema',
        params: {
            interval: stock.timeline,
            symbol: stock.symbol,
            time_period: '9',
            outputsize: '30',
            format: 'json',
            series_type: 'close'
        },
        headers: {
            'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
            'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
        }
    };

    // Bollinger Bands®(BBANDS) are volatility bands located above and below a moving average. 
    // The volatility size parameter depends on standard deviation.
    const BBANDS = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/bbands',
        params: {
            interval: stock.timeline,
            symbol: stock.symbol,
            format: 'json',
            outputsize: '30',
            time_period: '20',
            ma_type: 'SMA',
            series_type: 'close',
            sd: '2'
        },
        headers: {
            'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
            'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
        }
    };

    // Relative Strength Index(RSI) is a momentum indicator, 
    // which calculates the magnitude of a price change to assess 
    // the overbought and oversold conditions in the price of an asset.
    const RSI = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/rsi',
        params: {
            symbol: stock.symbol,
            interval: stock.timeline,
            outputsize: '30',
            series_type: 'close',
            time_period: '14',
            format: 'json'
        },
        headers: {
            'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
            'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
        }
    };

    // Stochastic Oscillator(STOCH) is used to decide if the price trend is strong.
    const STOCH = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/stoch',
        params: {
            interval: stock.timeline,
            symbol: stock.symbol,
            outputsize: '30',
            slow_d_period: '3',
            format: 'json',
            fast_k_period: '14',
            slow_dma_type: 'SMA',
            slow_kma_type: 'SMA',
            slow_k_period: '1'
        },
        headers: {
            'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
            'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
        }
    };

    useEffect(() => {
        if (user !== undefined) {
            // update the stock data for the user
            const updateStockData = async () => {
                setLoading(true);
                try {
                    // update the stock data 
                    await axios.put(UPDATE_STOCKS, { userId: user, stocks: stocks });
                    setLoading(false);
                    // handle error
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }
            updateStockData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateStocks]);

    // ref to not call function on first render
    const firstRender = useRef(true);

    useEffect(() => {
        // When the user changes the timeline for a stock the new data is fetched and displayed to the graph
        const changeStockData = async () => {
            setLoading(true);
            try {
                // fetch the data 
                const response = await axios.request(options);
                // handle error
                if (response.data.status === "error") {
                    setLoading(false);
                    console.log(response.data.message);
                } else {
                    // get the stock and calculate the percent change over the time period
                    const percentChange = calculatePercentChange(response.data);
                    // edit the stock being modified
                    editStock(stock.symbol, response.data, percentChange,
                        timeline, stock.id, UPDATE_STOCKS, UPDATE_LISTS, user);
                    // get favorite corresponding to the stock being modified if available
                    const currentFavorite = findFavorite(stock.symbol);
                    if (currentFavorite !== undefined) {
                        // edit the favorite in the sidebar to match the stock being modified
                        editFavorite(stock.symbol, response.data, percentChange,
                            timeline, currentFavorite.id, UPDATE_FAVORITES, user);
                    }
                    // cleanup function
                    setUpdateStocks(!updateStocks);
                    setLoading(false);
                }
                // handle error
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        changeStockData();
        // if (firstRender.current) {
        //     firstRender.current = false;
        //     return;
        // } else {
        //     changeStockData();
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stockChange]);

    useEffect(() => {
        // Fetches the technical data
        const addTechnicalAnalysis = async () => {
            setLoading(true);
            try {
                // fetch the data
                let dataOptions = {};
                if (ta !== '') {
                    switch (ta) {
                        case 'SMA':
                            dataOptions = SMA;
                            break;
                        case 'EMA':
                            dataOptions = EMA;
                            break;
                        case 'BBANDS':
                            dataOptions = BBANDS;
                            break;
                        case 'RSI':
                            dataOptions = RSI;
                            break;
                        case 'STOCH':
                            dataOptions = STOCH;
                            break;
                        case 'MACD':
                            dataOptions = MACD;
                            break;
                        default:
                            break;
                    }
                    const response = await axios.request(dataOptions);
                    // debug
                    console.log("TA DATA: ", response.data);
                    // handle error
                    if (response.data.status === "error") {
                        setTA('');
                        console.log(response.data.message);
                        setLoading(false);
                    } else {
                        // TODO make sure this data replaces old data is rendered in the stock
                        addTAData(stock.symbol, stock.timeline, ta, response.data);
                        // cleanup
                        setTA('');
                        setLoading(false);
                    }
                }
                // handle error
            } catch (error) {
                console.error(error);
                setTA('');
                setLoading(false);
            }
        }
        addTechnicalAnalysis();

        // if (firstRender.current) {
        //     firstRender.current = false;
        //     return;
        // } else {

        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technicalChange]);

    // When user wants technical data set the variables
    const handleTechnicalChange = (type) => {
        setTA(type);
        setTechnicalChange(!technicalChange);
    }

    // When user changes timeline change state to reflect change
    const handleStockChange = (time) => {
        setStockChange(!stockChange);
    }

    // Calculates the percent change of the stock over the time period and return  
    // it rounded to the nearest hundreth place
    const calculatePercentChange = (response) => {
        let priceSize = response.values.length;
        let endPrice = response.values[0].close;
        let startPrice = response.values[priceSize - 1].close;
        let difference = endPrice - startPrice;
        let percentChange = (difference / startPrice) * 100;
        let percentChangeRounded = percentChange.toFixed(2);
        percentChange = parseFloat(percentChangeRounded);
        return percentChange;
    }

    // Simple moving average indicator
    const smaValues = [];
    // dates of the stock for the graph
    const labels = [];
    // prices of the stock for the graph
    const prices = [];

    // Calculate the Simple Moving Average over a period of time
    const calculateSMA = () => {
        const foundTAData = findTAData(stock.symbol, "SMA");
        console.log("foundTAData: ", foundTAData);
        if (foundTAData) {
            // TODO display data to chart
            // TODO make sure that latest data is being fetched from the context api
            // TODO when user updates time on stock, either remove the technical data, or update it
            // 30 dates and prices for the graph
            let taIndex = foundTAData.data.values.length - 1;
            // Loop through each date and price for the stock and add it to the arrays
            for (let i = 0; i < foundTAData.data.values.length; i++) {
                smaValues[taIndex] = foundTAData.data.values[i].sma;
                taIndex--;
            }
            setSMA(true);
        }
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

    // function to handle the technical change
    const handleTADisplay = (type) => {
        setLoading(true);
        switch (type) {
            case "EMA":
                handleTechnicalChange(type);
                handleUpdate(stock.timeline);
                calculateEMA();
                break;
            case "SMA":
                handleTechnicalChange(type);
                handleUpdate(stock.timeline);
                calculateSMA();
                break;
            case "RSI":
                handleTechnicalChange(type);
                handleUpdate(stock.timeline);
                calculateRSI();
                break;
            case "BBANDS":
                handleTechnicalChange(type);
                handleUpdate(stock.timeline);
                calculateBBANDS();
                break;
            case "STOCH":
                handleTechnicalChange(type);
                handleUpdate(stock.timeline);
                calculateSTOCH();
                break;
            case "MACD":
                handleTechnicalChange(type);
                handleUpdate(stock.timeline);
                calculateMACD();
                break;
            default:
                break;
        }
        setLoading(false);
    }

    // When the user changes the timeframe of the stock, update the graph
    const handleTime = (time) => {
        setLoading(true);
        setTimeline(time);
        handleStockChange();
        setLoading(false);
    }

    const handleUpdate = (time) => {
        setLoading(true);
        setTimeline(time);
        handleStockChange();
        setLoading(false);
    }

    // function to set the chart to simple or technical
    const handleChart = (flag) => {
        setSimpleChart(flag);
    }

    let militaryTime = false;
    let mainTimeline = "";
    switch (stock.timeline) {
        case '1min': mainTimeline = "30 minutes";
            militaryTime = true;
            break;
        case '5min': mainTimeline = "2.5 hours";
            militaryTime = true;
            break;
        case '15min': mainTimeline = "7.5 hours";
            militaryTime = true;
            break;
        case '30min': mainTimeline = "15 hours";
            militaryTime = true;
            break;
        case '1h': mainTimeline = "30 hours";
            break;
        case '2h': mainTimeline = "1 week";
            break;
        case '1day': mainTimeline = "1 month";
            break;
        case '1week': mainTimeline = "30 weeks";
            break;
        case '1month': mainTimeline = "2.5 years";
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
    const graphOptions = {
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

        const gradientStrokeSMA = ctx.createLinearGradient(700, 0, 300, 0);
        gradientStrokeSMA.addColorStop(1, "rgba(103, 30, 203, 0.6)");
        gradientStrokeSMA.addColorStop(0, "rgba(130, 30, 150, 0.6)");

        const result = {
            labels: labels,
            datasets: [
                {
                    id: 1,
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

        if (sma) {
            const data = {
                id: 2,
                label: "SMA",
                data: smaValues,
                fill: false,
                backgroundColor: gradientFill,
                borderColor: gradientStrokeSMA,
                pointBorderColor: gradientStrokeSMA,
                pointBackgroundColor: gradientStrokeSMA,
                pointHoverBackgroundColor: gradientStrokeSMA,
                pointHoverBorderColor: gradientStrokeSMA,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
            };
            result.datasets.push(data);
            console.log("smaValues", smaValues);
            console.log("SMA", result.datasets);
            setSMA(false);
        }




        // TODO fix bug where it only displays sma for a second

        // return the data for the graph
        return {
            ...result,
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
                    id: 1,
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

    if (stock.percentChange >= 0) {
        // Return the graph
        if (simpleChart) {
            return (
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {mainTimeline}</h3>
                    <Line data={ChartData} options={graphOptions} />
                    <StockButtons
                        handleTime={handleTime}
                        handleChart={handleChart}
                        handleUpdate={handleUpdate}
                        loading={loading}
                        setLoading={setLoading}
                        stock={stock}
                        user={user}
                        handleStockModal={handleStockModal}
                        handleTADisplay={handleTADisplay}
                    />
                </div >
            );
        } else {
            return (
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {mainTimeline}</h3>
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
                        handleTADisplay={handleTADisplay}
                    />
                </div >
            );
        }
    } else {
        // Return the graph
        if (simpleChart) {
            return (
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {mainTimeline}</h3>
                    <Line data={redData} options={graphOptions} />
                    <StockButtons
                        handleTime={handleTime}
                        handleChart={handleChart}
                        handleUpdate={handleUpdate}
                        loading={loading}
                        setLoading={setLoading}
                        stock={stock}
                        user={user}
                        handleStockModal={handleStockModal}
                        handleTADisplay={handleTADisplay}
                    />
                </div >
            );
        } else {
            return (
                <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                    <h3 id="stock-heading">{stock.symbol}: {mainTimeline}</h3>
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
                        handleTADisplay={handleTADisplay}
                    />
                </div >
            );
        }
    }
}

export default Stock;
