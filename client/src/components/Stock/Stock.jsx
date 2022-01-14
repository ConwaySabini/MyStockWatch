import './Stock.css';
import { useState, useContext, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { StockContext } from "../../context/StockContext";
import useDimensions from "react-cool-dimensions";
import TechnicalGraph from '../TechnicalGraph/TechnicalGraph';
import StockButtons from './StockButtons';
const axios = require('axios').default;


// Component to display the individual stock
function Stock({ stock, user,
    handleStockModal, handleStockChange, handleTimeChange }) {
    // context api to modify data across components
    const { addTAData, findTAData, removeTAData } = useContext(StockContext);

    // State to track which chart to display (simple or technical)
    const [simpleChart, setSimpleChart] = useState(true);
    // loading state to have components wait for data to load
    const [loading, setLoading] = useState(false);
    // set the technical analysis to be displayed
    const [ta, setTA] = useState('');
    // when the technical analysis is changed of a stock this state is changed to reflect that change
    const [technicalChange, setTechnicalChange] = useState(false);
    // array for sma values
    const [smaValues, setSMAValues] = useState([]);
    // array for ema values
    const [emaValues, setEMAValues] = useState([]);
    // array for rsi values
    const [rsiValues, setRSIValues] = useState([]);
    // array for macd values
    const [macdValues, setMACDValues] = useState([]);
    // array for stochastic oscillator values
    const [stochValues, setSTOCHValues] = useState([]);
    // array for bollinger bands values
    const [bbandsValues, setBBANDSValues] = useState([]);

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
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
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
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
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
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
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
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
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
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
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
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
    };

    useEffect(() => {
        if (!smaValues.length) {
            const sma = findTAData(stock.symbol, 'SMA');
            if (sma !== undefined) setSMAValues(sma.data);
        }

        if (!emaValues.length) {
            const ema = findTAData(stock.symbol, 'EMA');
            if (ema !== undefined) setEMAValues(ema.data);
        }

        if (!bbandsValues.length) {
            const bbands = findTAData(stock.symbol, 'BBANDS');
            if (bbands !== undefined) setBBANDSValues(bbands.data);
        }

        if (!rsiValues.length) {
            const rsi = findTAData(stock.symbol, 'RSI');
            if (rsi !== undefined) setRSIValues(rsi.data);
        }

        if (!macdValues.length) {
            const macd = findTAData(stock.symbol, 'MACD');
            if (macd !== undefined) setMACDValues(macd.data);
        }

        if (!stochValues.length) {
            const stoch = findTAData(stock.symbol, 'STOCH');
            if (stoch !== undefined) setSTOCHValues(stoch.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Fetches the technical data
        const addTechnicalAnalysis = async () => {
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
                    } else {
                        switch (ta) {
                            case "EMA":
                                //handleUpdate(stock.timeline);
                                calculateEMA(response.data);
                                break;
                            case "SMA":
                                //handleUpdate(stock.timeline);
                                calculateSMA(response.data);
                                break;
                            case "RSI":
                                //handleUpdate(stock.timeline);
                                calculateRSI(response.data);
                                break;
                            case "BBANDS":
                                //handleUpdate(stock.timeline);
                                calculateBBANDS(response.data);
                                break;
                            case "STOCH":
                                //handleUpdate(stock.timeline);
                                calculateSTOCH(response.data);
                                break;
                            case "MACD":
                                //handleUpdate(stock.timeline);
                                calculateMACD(response.data);
                                break;
                            default:
                                break;
                        }
                        // cleanup
                        setTA('');
                    }
                }
                // handle error
            } catch (error) {
                console.error(error);
                setTA('');
            }
        }
        setLoading(true);
        addTechnicalAnalysis();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technicalChange]);

    // When user wants technical data set the variables
    const handleTechnicalChange = (type) => {
        setTA(type);
        switch (type) {
            case "EMA":
                if (!emaValues.length) {
                    setTechnicalChange(!technicalChange);
                }
                else {
                    clearEMA();
                }
                break;
            case "SMA":
                if (!smaValues.length) {
                    setTechnicalChange(!technicalChange);
                }
                else {
                    clearSMA();
                }
                break;
            case "RSI":
                if (!rsiValues.length) {
                    setTechnicalChange(!technicalChange);
                }
                else {
                    clearRSI();
                }
                break;
            case "BBANDS":
                if (!bbandsValues.length) {
                    setTechnicalChange(!technicalChange);
                }
                else {
                    clearBBANDS();
                }
                break;
            case "STOCH":
                if (!stochValues.length) {
                    setTechnicalChange(!technicalChange);
                }
                else {
                    clearSTOCH();
                }
                break;
            case "MACD":
                if (!macdValues.length) {
                    setTechnicalChange(!technicalChange);
                }
                else {
                    clearMACD();
                }
                break;
            default:
                break;
        }
    }

    // dates of the stock for the graph
    const labels = [];
    // prices of the stock for the graph
    const prices = [];

    // Calculate the Simple Moving Average over a period of time
    const calculateSMA = (data) => {
        let values = [];
        // 30 dates and prices for the graph
        let taIndex = data.values.length - 1;
        // Loop through each date and price for the stock and add it to the arrays
        for (let i = 0; i < data.values.length; i++) {
            values[taIndex] = data.values[i].sma;
            taIndex--;
        }
        setSMAValues(values);
        addTAData(stock.symbol, stock.timeline, "SMA", values);
    }

    // Calculate the Exponential Moving Average over a period of time
    const calculateEMA = (data) => {
        let values = [];
        // 30 dates and prices for the graph
        let taIndex = data.values.length - 1;
        // Loop through each date and price for the stock and add it to the arrays
        for (let i = 0; i < data.values.length; i++) {
            values[taIndex] = data.values[i].ema;
            taIndex--;
        }
        setEMAValues(values);
        addTAData(stock.symbol, stock.timeline, "EMA", values);
    }

    // Calculate the Bollinger Bands over a period of time
    const calculateBBANDS = (data) => {
        let values = [];
        values.push([]);
        values.push([]);
        values.push([]);
        // 30 dates and prices for the graph
        let taIndex = data.values.length - 1;
        // Loop through each date and price for the stock and add it to the arrays
        for (let i = 0; i < data.values.length; i++) {
            values[0][taIndex] = data.values[i].lower_band;
            values[1][taIndex] = data.values[i].middle_band;
            values[2][taIndex] = data.values[i].upper_band;
            taIndex--;
        }
        setBBANDSValues(values);
        addTAData(stock.symbol, stock.timeline, "BBANDS", values);
    }

    // Calculate the MACD over a period of time
    const calculateMACD = (data) => {
        let values = [];
        values.push([]);
        values.push([]);
        values.push([]);
        // 30 dates and prices for the graph
        let taIndex = data.values.length - 1;
        // Loop through each date and price for the stock and add it to the arrays
        for (let i = 0; i < data.values.length; i++) {
            values[0][taIndex] = data.values[i].macd;
            values[1][taIndex] = data.values[i].macd_signal;
            values[2][taIndex] = data.values[i].macd_hist;
            taIndex--;
        }
        setMACDValues(values);
        addTAData(stock.symbol, stock.timeline, "MACD", values);
    }

    // Calculate the Stochastic Oscillator over a period of time
    const calculateSTOCH = (data) => {
        let values = [];
        values.push([]);
        values.push([]);
        // 30 dates and prices for the graph
        let taIndex = data.values.length - 1;
        // Loop through each date and price for the stock and add it to the arrays
        for (let i = 0; i < data.values.length; i++) {
            values[0][taIndex] = data.values[i].slow_k;
            values[1][taIndex] = data.values[i].slow_d;
            taIndex--;
        }
        setSTOCHValues(values);
        addTAData(stock.symbol, stock.timeline, "STOCH", values);
    }

    // Calculate the Relative Strength Index over a period of time
    const calculateRSI = (data) => {
        let values = [];
        // 30 dates and prices for the graph
        let taIndex = data.values.length - 1;
        // Loop through each date and price for the stock and add it to the arrays
        for (let i = 0; i < data.values.length; i++) {
            values[taIndex] = data.values[i].rsi;
            taIndex--;
        }
        setRSIValues(values);
        addTAData(stock.symbol, stock.timeline, "RSI", values);
    }

    // clear SMA from chart
    const clearSMA = () => {
        setSMAValues([]);
    }

    // clear EMA from chart
    const clearEMA = () => {
        setEMAValues([]);
    }

    // clear BBANDS from chart
    const clearBBANDS = () => {
        setBBANDSValues([]);
    }

    // clear MACD from chart
    const clearMACD = () => {
        setMACDValues([]);
    }

    // clear STOCH from chart
    const clearSTOCH = () => {
        setSTOCHValues([]);
    }

    // clear RSI from chart
    const clearRSI = () => {
        setRSIValues([]);
    }

    // clear technical analysis from chart
    const clearTechnicalAnalysis = () => {
        if (smaValues.length) {
            removeTAData(stock.symbol, "SMA");
            setSMAValues([]);
        }
        if (emaValues.length) {
            removeTAData(stock.symbol, "EMA");
            setEMAValues([]);
        }
        if (bbandsValues.length) {
            removeTAData(stock.symbol, "BBANDS");
            setBBANDSValues([]);
        }
        if (macdValues.length) {
            removeTAData(stock.symbol, "MACD");
            setMACDValues([]);
        }
        if (stochValues.length) {
            removeTAData(stock.symbol, "STOCH");
            setSTOCHValues([]);
        }
        if (rsiValues.length) {
            removeTAData(stock.symbol, "RSI");
            setRSIValues([]);
        }
    }

    // function to handle the technical change
    const handleTADisplay = (type) => {
        setLoading(true);
        handleTechnicalChange(type);
        setLoading(false);
    }

    // When the user changes the timeframe of the stock, update the graph
    const handleUpdate = (time) => {
        setLoading(true);
        clearTechnicalAnalysis();
        handleTimeChange(time, stock);
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

    // options for the graph
    const graphOptionsMACD = {
        responsive: true,
        title: {
            display: true,
            // position: "top",
            text: "Moving Average Convergence Divergence",
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

    // options for the graph
    const graphOptionsRSI = {
        responsive: true,
        title: {
            display: true,
            // position: "top",
            text: "Relative Strength Index",
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

    // options for the graph
    const graphOptionsSTOCH = {
        responsive: true,
        title: {
            display: true,
            // position: "top",
            text: "Stochastic Oscillator",
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
        const gradientFill = ctx.createLinearGradient(700, 0, 300, 0);
        const gradientStrokeSMA = ctx.createLinearGradient(700, 0, 300, 0);
        const gradientStrokeEMA = ctx.createLinearGradient(700, 0, 300, 0);
        const gradientStrokeBBANDS = ctx.createLinearGradient(700, 0, 300, 0);
        // green graph
        if (stock.percentChange >= 0) {
            gradientStroke.addColorStop(1, "rgba(72, 95, 199, 0.6)");
            gradientStroke.addColorStop(0, "rgba(0, 209, 178, 0.6)");

            gradientFill.addColorStop(1, "rgba(72, 95, 199, 0.6)");
            gradientFill.addColorStop(0, "rgba(0, 209, 178, 0.6)");

            gradientStrokeSMA.addColorStop(1, "rgba(157, 43, 213, 1)");
            gradientStrokeSMA.addColorStop(0, "rgba(187, 71, 243, 1)");

            gradientStrokeEMA.addColorStop(1, "rgba(233, 20, 20, 1)");
            gradientStrokeEMA.addColorStop(0, "rgba(156, 17, 17, 1)");

            gradientStrokeBBANDS.addColorStop(1, "rgba(46, 237, 27, 1)");
            gradientStrokeBBANDS.addColorStop(0, "rgba(109, 202, 100, 1)");
        }
        // red graph
        else {
            gradientStroke.addColorStop(1, "rgba(141, 23, 174, 0.6)");
            gradientStroke.addColorStop(0, "rgba(200, 39, 72, 0.6)");

            gradientFill.addColorStop(1, "rgba(141, 23, 174, 0.6)");
            gradientFill.addColorStop(0, "rgba(200, 39, 72, 0.6)");

            gradientStrokeSMA.addColorStop(1, "rgba(34, 230, 58, 1)");
            gradientStrokeSMA.addColorStop(0, "rgba(34, 167, 230, 1)");

            gradientStrokeBBANDS.addColorStop(1, "rgba(46, 237, 27, 1)");
            gradientStrokeBBANDS.addColorStop(0, "rgba(109, 202, 100, 1)");
        }

        const result = {
            labels: labels,
            datasets: []
        };

        if (smaValues.length) {
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
        }
        if (emaValues.length) {
            console.log("emaValues ", emaValues);
            const data = {
                id: 3,
                label: "EMA",
                data: emaValues,
                fill: false,
                backgroundColor: gradientFill,
                borderColor: gradientStrokeEMA,
                pointBorderColor: gradientStrokeEMA,
                pointBackgroundColor: gradientStrokeEMA,
                pointHoverBackgroundColor: gradientStrokeEMA,
                pointHoverBorderColor: gradientStrokeEMA,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
            };
            result.datasets.push(data);
        }

        if (bbandsValues.length) {
            const lower = {
                id: 7,
                label: "lower_bands",
                data: bbandsValues[0],
                fill: false,
                backgroundColor: gradientFill,
                borderColor: gradientStrokeBBANDS,
                pointBorderColor: gradientStrokeBBANDS,
                pointBackgroundColor: gradientStrokeBBANDS,
                pointHoverBackgroundColor: gradientStrokeBBANDS,
                pointHoverBorderColor: gradientStrokeBBANDS,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
            };
            const middle = {
                id: 8,
                label: "middle_bands",
                data: bbandsValues[1],
                fill: false,
                backgroundColor: gradientFill,
                borderColor: gradientStrokeBBANDS,
                pointBorderColor: gradientStrokeBBANDS,
                pointBackgroundColor: gradientStrokeBBANDS,
                pointHoverBackgroundColor: gradientStrokeBBANDS,
                pointHoverBorderColor: gradientStrokeBBANDS,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
            };
            const upper = {
                id: 9,
                label: "upper_bands",
                data: bbandsValues[2],
                fill: false,
                backgroundColor: gradientFill,
                borderColor: gradientStrokeBBANDS,
                pointBorderColor: gradientStrokeBBANDS,
                pointBackgroundColor: gradientStrokeBBANDS,
                pointHoverBackgroundColor: gradientStrokeBBANDS,
                pointHoverBorderColor: gradientStrokeBBANDS,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
            };
            result.datasets.push(lower);
            result.datasets.push(middle);
            result.datasets.push(upper);
        }

        // push the graph
        result.datasets.push({
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
        });

        // return the data for the graph
        return {
            ...result,
        };
    };

    // data for the graph
    const macdData = (canvas) => {
        const macd = {
            labels: labels,
            datasets: [],
        }

        // Create gradients to make the graph pretty
        const ctx = canvas.getContext("2d");
        const gradientStroke = ctx.createLinearGradient(700, 0, 300, 0);
        const gradientFill = ctx.createLinearGradient(700, 0, 300, 0);
        const gradientSignal = ctx.createLinearGradient(700, 0, 300, 0);
        gradientStroke.addColorStop(1, "rgba(72, 95, 199, 0.6)");
        gradientStroke.addColorStop(0, "rgba(0, 209, 178, 0.6)");

        gradientFill.addColorStop(1, "rgba(72, 95, 199, 0.6)");
        gradientFill.addColorStop(0, "rgba(0, 209, 178, 0.6)");

        gradientSignal.addColorStop(1, "rgba(195, 30, 88, 1)");
        gradientSignal.addColorStop(0, "rgba(158, 28, 152, 1)");

        if (macdValues.length) {
            const macdLine = {
                id: 1,
                type: 'line',
                label: "MACD",
                data: macdValues[0],
                fill: false,
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
            };
            const macdSignal = {
                id: 2,
                type: 'line',
                label: "MACD Signal",
                data: macdValues[1],
                fill: false,
                backgroundColor: gradientSignal,
                borderColor: gradientSignal,
                pointBorderColor: gradientSignal,
                pointBackgroundColor: gradientSignal,
                pointHoverBackgroundColor: gradientSignal,
                pointHoverBorderColor: gradientSignal,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
            };
            const macdHistogram = {
                id: 3,
                type: 'bar',
                label: "Histogram",
                data: macdValues[2],
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
            };
            macd.datasets.push(macdHistogram);
            macd.datasets.push(macdLine);
            macd.datasets.push(macdSignal);
        }

        // return the data for the graph
        return {
            ...macd,
        };
    };

    // data for the graph
    const rsiData = (canvas) => {
        const rsi = {
            labels: labels,
            datasets: [],
        }

        // Create gradients to make the graph pretty
        const ctx = canvas.getContext("2d");
        const gradientStroke = ctx.createLinearGradient(700, 0, 300, 0);
        const gradientFill = ctx.createLinearGradient(700, 0, 300, 0);
        gradientStroke.addColorStop(1, "rgba(72, 95, 199, 0.6)");
        gradientStroke.addColorStop(0, "rgba(0, 209, 178, 0.6)");

        gradientFill.addColorStop(1, "rgba(72, 95, 199, 0.6)");
        gradientFill.addColorStop(0, "rgba(0, 209, 178, 0.6)");

        if (rsiValues.length) {
            const data = {
                id: 4,
                label: "RSI",
                data: rsiValues,
                fill: false,
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
            };
            rsi.datasets.push(data);
        }

        // return the data for the graph
        return {
            ...rsi,
        };
    };

    // data for the graph
    const stochData = (canvas) => {
        const stoch = {
            labels: labels,
            datasets: [],
        }

        // Create gradients to make the graph pretty
        const ctx = canvas.getContext("2d");
        const gradientStroke = ctx.createLinearGradient(700, 0, 300, 0);
        const gradientFill = ctx.createLinearGradient(700, 0, 300, 0);
        const graidentSlowD = ctx.createLinearGradient(700, 0, 300, 0);
        gradientStroke.addColorStop(1, "rgba(72, 95, 199, 0.6)");
        gradientStroke.addColorStop(0, "rgba(0, 209, 178, 0.6)");

        gradientFill.addColorStop(1, "rgba(72, 95, 199, 0.6)");
        gradientFill.addColorStop(0, "rgba(0, 209, 178, 0.6)");

        graidentSlowD.addColorStop(1, "rgba(195, 30, 88, 1)");
        graidentSlowD.addColorStop(0, "rgba(158, 28, 152, 1)");

        if (stochValues.length) {
            const slow_k = {
                id: 6,
                label: "slow_k",
                data: stochValues[0],
                fill: false,
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
            };
            const slow_d = {
                id: 6,
                label: "slow_d",
                data: stochValues[1],
                fill: false,
                backgroundColor: gradientFill,
                borderColor: graidentSlowD,
                pointBorderColor: graidentSlowD,
                pointBackgroundColor: graidentSlowD,
                pointHoverBackgroundColor: graidentSlowD,
                pointHoverBorderColor: graidentSlowD,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                borderWidth: 4,
            };
            stoch.datasets.push(slow_k);
            stoch.datasets.push(slow_d);
        }

        // return the data for the graph
        return {
            ...stoch,
        };

    };

    // display the stock component
    // Return the graph
    if (simpleChart) {
        return (
            <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                <h3 id="stock-heading">{stock.symbol}: {mainTimeline}</h3>
                <Line data={ChartData} options={graphOptions} />
                {
                    macdValues.length ? (
                        <Line data={macdData} options={graphOptionsMACD} />
                    ) : (
                        null
                    )
                }
                {
                    rsiValues.length ? (
                        <Line data={rsiData} options={graphOptionsRSI} />
                    ) : (
                        null
                    )
                }
                {
                    stochValues.length ? (
                        <Line data={stochData} options={graphOptionsSTOCH} />
                    ) : (
                        null
                    )
                }
                <StockButtons
                    handleChart={handleChart}
                    handleUpdate={handleUpdate}
                    loading={loading}
                    setLoading={setLoading}
                    stock={stock}
                    user={user}
                    handleStockModal={handleStockModal}
                    handleTADisplay={handleTADisplay}
                    clearTechnicalAnalysis={clearTechnicalAnalysis}
                />
            </div >
        );
    } else {
        return (
            <div ref={observe} className="StockCard mt-6 pl-4 pr-4 pb-4 pt-4" id="StockChart">
                <h3 id="stock-heading">{stock.symbol}: {mainTimeline}</h3>
                <TechnicalGraph stock={stock} width={width} height={height} />
                {
                    macdValues.length ? (
                        <Line data={macdData} options={graphOptionsMACD} />
                    ) : (
                        null
                    )
                }
                {
                    rsiValues.length ? (
                        <Line data={rsiData} options={graphOptionsRSI} />
                    ) : (
                        null
                    )
                }
                {
                    stochValues.length ? (
                        <Line data={stochData} options={graphOptionsSTOCH} />
                    ) : (
                        null
                    )
                }
                <StockButtons
                    handleChart={handleChart}
                    handleUpdate={handleUpdate}
                    loading={loading}
                    setLoading={setLoading}
                    stock={stock}
                    user={user}
                    handleStockModal={handleStockModal}
                    handleTADisplay={handleTADisplay}
                    clearTechnicalAnalysis={clearTechnicalAnalysis}
                />
            </div >
        );
    }
}

export default Stock;
