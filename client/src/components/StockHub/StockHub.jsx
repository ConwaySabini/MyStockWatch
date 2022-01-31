import React, { useState, useContext, useEffect, useRef } from 'react';
import { StockContext } from "../../context/StockContext";
import StockList from '../StockList/StockList';
import StockForm from '../StockForm/StockForm';
import './StockHub.css';
import Stock from '../Stock/Stock';
const axios = require('axios').default;

// Component to display all stocks and the forms to add/edit stocks
const StockHub = ({ user }) => {
    // context api to modify data across components
    const { stocks, clearStocks, findSymbol, setNewStocks,
        editFavorite, findFavorite, editStock } = useContext(StockContext);

    // when the page is loading some actions are disabled
    const [loading, setLoading] = useState(false);
    // modal for confirming events
    const [modal, setModal] = useState(false);
    // modal for viewing stock
    const [stockModal, setStockModal] = useState(false);
    // stock to display for stock modal
    const [stockView, setStock] = useState(null);
    // array of symbols to filter from the stock list
    const [filterSymbolsHub, setFilterSymbolsHub] = useState([]);
    // symbol of the stock to be searched
    const [symbolHub, setSymbolHub] = useState('');
    // timeframe of the stock to graph
    const [timelineHub, setTimelineHub] = useState('1day');
    // symbols and names for stock autocomplete
    const [names, setNames] = useState([]);

    // flag for updating the stocks on the database
    const [updateStocks, setUpdateStocks] = useState(false);
    // when the timeline is changed of a stock this state is changed to reflect that change
    const [stockChange, setStockChange] = useState(false);
    // the current stock to be modified
    const [currentStock, setCurrentStock] = useState({});
    // the current favorite to be modified
    const [currentFavorite, setCurrentFavorite] = useState({});

    // server url to update favorites
    const UPDATE_FAVORITES = process.env.REACT_APP_UPDATE_FAVORITES;
    // server url to update lists
    const UPDATE_LISTS = process.env.REACT_APP_UPDATE_LISTS;
    // server url to update stocks
    const UPDATE_STOCKS = process.env.REACT_APP_UPDATE_STOCKS;
    //server url
    const SERVER = process.env.REACT_APP_GET_USER_STOCKS + user;
    // server url to create stocks
    const CREATE_STOCKS = process.env.REACT_APP_CREATE_STOCKS;

    // Fetch the stock data from the server and render the stocks
    // If there is no stock data for this user, create new data
    useEffect(() => {
        const fetchDataFromServer = async () => {
            setLoading(true);
            try {
                // fetch the stock data 
                const response = await axios.get(SERVER);
                // handle error
                if (response.data.stocks === null) {
                    setLoading(false);
                    console.log("Creating new stock data for user");
                    createNewStockData();
                    setLoading(false);
                } else {
                    // delete irrelevent data
                    delete response.data.stocks._id;
                    // set the stocks from the database
                    let newStocks = [];
                    //push stocks to the list from the Context API
                    for (const stock of response.data.stocks.stocks) {
                        newStocks.push(stock);
                    }
                    if (newStocks.length > 0) {
                        setNewStocks(newStocks);
                    }
                    // cleanup function
                    setLoading(false);
                }
                // handle error
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        // create new stock data for the user
        const createNewStockData = async () => {
            setLoading(true);
            try {
                // create the stock data 
                await axios.put(CREATE_STOCKS, { userId: user, stocks: stocks });
                // handle error
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        // get list of stocks for autocomplete search
        const getStockList = async () => {
            setLoading(true);
            try {
                // get the stock name data
                const allStocks = await axios.request(listOptions);
                //console.log("allStocks", allStocks.data.data);
                for (let i = 0; i < allStocks.data.data.length; i++) {
                    allStocks.data.data[i].name = allStocks.data.data[i].name.toLowerCase();
                }
                // TODO create Trie and store in database and get data from there
                //localStorage.setItem('allStocks', JSON.stringify(allStocks.data.data));
                setNames(allStocks.data.data);
                // handle error
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        // get autocomplete data from the server
        // get the user data from the server
        fetchDataFromServer();


        localStorage.removeItem('allStocks');
        // get symbols and names for autocomplete search
        const stockNames = JSON.parse(localStorage.getItem('allStocks'));
        if (stockNames === null || stockNames === undefined) {
            getStockList();
        } else {
            setNames(stockNames);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    setSymbolHub('');
                    setLoading(false);
                    console.log(response.data.message);
                } else {
                    // get the stock and calculate the percent change over the time period
                    const percentChange = calculatePercentChange(response.data);
                    // edit the stock being modified
                    editStock(currentStock.symbol, response.data, percentChange,
                        timelineHub, currentStock.id, UPDATE_STOCKS, UPDATE_LISTS, user);
                    if (currentFavorite !== undefined) {
                        // edit the favorite in the sidebar to match the stock being modified
                        editFavorite(currentFavorite.symbol, response.data, percentChange,
                            timelineHub, currentFavorite.id, UPDATE_FAVORITES, user);
                    }
                    // cleanup function
                    setUpdateStocks(!updateStocks);
                    setSymbolHub('');
                    setLoading(false);
                }
                // handle error
            } catch (error) {
                console.error(error);
                setSymbolHub('');
                setLoading(false);
            }
        }
        if (firstRender.current) {
            firstRender.current = false;
            return;
        } else {
            changeStockData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stockChange]);

    // Axios options for getting stock data from 12 Data API
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_RAPIDAPI_TIME_URL,
        params: { interval: `${timelineHub}`, symbol: `${symbolHub}`, format: 'json', outputsize: '30' },
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
    };

    // options for getting the list of stock symbols with matching names
    const listOptions = {
        method: 'GET',
        url: process.env.REACT_APP_RAPIDAPI_STOCK_URL,
        params: { format: 'json' },
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
    };

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

    // When user changes timeline change state to reflect change
    const handleStockChange = (time) => {
        setStockChange(!stockChange);
    }

    // Edit the stock being modified for the new timeline of the graph
    const handleTimeChange = (time, stock) => {
        setSymbolHub(stock.symbol);
        setCurrentStock(stock);
        setTimelineHub(time);
        // get favorite corresponding to the stock being modified if available
        const favorite = findFavorite(stock.symbol);
        setCurrentFavorite(favorite);
    }

    // clear the list of stocks on the screen
    const clear = e => {
        e.preventDefault();
        clearStocks(UPDATE_STOCKS, UPDATE_LISTS, UPDATE_FAVORITES, user);
        setModal(false);
        setUpdateStocks(!updateStocks);
    }

    const handleStockModal = (stockSymbol) => {
        const stock = findSymbol(stockSymbol);
        if (stock !== undefined) {
            setStock(stock);
            setStockModal(true);
        }
    }

    const clearStockModal = () => {
        setStockModal(false);
    }

    // function to confirm the deletion of all stocks
    const confirmClear = () => {
        setModal(true);
    }

    // function to set modal to false and close confirmation dialogue 
    const clearModal = () => {
        setModal(false);
    }
    if (names.length > 0) {
        if (!modal && !stockModal) {
            return (
                <div class="StockForm">
                    <StockForm
                        updateStocks={updateStocks}
                        setUpdateStocks={setUpdateStocks}
                        confirmClear={confirmClear}
                        calculatePercentChange={calculatePercentChange}
                        setFilterSymbolsHub={setFilterSymbolsHub}
                        loadingHub={loading}
                        names={names}
                    />
                    {/* render the list of stocks and pass down important 
                functions to change aspects of the stocks */}
                    <StockList
                        filterSymbols={filterSymbolsHub}
                        user={user}
                        handleStockModal={handleStockModal}
                        handleStockChange={handleStockChange}
                        handleTimeChange={handleTimeChange}
                    />
                </div >
            );
        } else if (stockModal) {
            return (
                <div class="modal is-active">
                    <div class="modal-background"> </div>
                    <div class="modal-content" id="stock-modal">
                        {/* <!-- Any other Bulma elements you want --> */}
                        {/* <div class="section" id="stock-modal-section"> */}
                        <Stock
                            stock={stockView}
                            key={stockView.id}
                            user={user}
                            handleStockModal={handleStockModal}
                            handleStockChange={handleStockChange}
                            handleTimeChange={handleTimeChange}
                            id="viewing-stock"
                        />
                        <button class="button is-primary mt-4 ml-6" onClick={clearStockModal}>Exit</button>
                        {/* </div> */}
                    </div>
                    <button class="modal-close is-large" onClick={clearStockModal} aria-label="close"></button>
                </div>
            );
        } else {
            return (
                <div class="modal is-active">
                    <div class="modal-background"> </div>
                    <div class="modal-content">
                        {/* <!-- Any other Bulma elements you want --> */}
                        <div class="section" id="modal-section">
                            <h3 id="modal-heading">Are you sure you want to clear all stocks?</h3>
                            <button class="button is-danger mt-4" onClick={clear}>Clear All Stocks</button>
                            <button class="button is-primary mt-4 ml-4" onClick={clearModal}>Cancel</button>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close"></button>
                </div>
            );
        }
    }
    else
        return null;
}

export default StockHub;
