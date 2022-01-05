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
    const { stocks, addStock, clearStocks, findSymbol, setNewStocks,
        editFavorite, findFavorite, editStock } = useContext(StockContext);
    // symbol of the stock to be searched
    const [symbol, setSymbol] = useState('');
    // array of symbols to filter from the stock list
    const [filterSymbols, setFilterSymbols] = useState([]);
    // contains the current symbols from the filter bar
    const [filterSymbol, setFilterSymbol] = useState('');
    // timeframe of the stock to graph
    const [timeline, setTimeline] = useState('1day');
    // when sorting the stocks decide which direction to sort
    const [descending, setDescending] = useState(true);
    // when the page is loading some actions are disabled
    const [loading, setLoading] = useState(false);
    // modal for confirming events
    const [modal, setModal] = useState(false);
    // modal for viewing stock
    const [stockModal, setStockModal] = useState(false);
    // stock to display for stock modal
    const [stockView, setStock] = useState(null);
    // flag for displaying the instructions
    const [showHero, setShowHero] = useState(true);
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
                    //console.log("newStocks", newStocks);
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
        fetchDataFromServer();
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
                    setSymbol('');
                    setLoading(false);
                    console.log(response.data.message);
                } else {
                    // get the stock and calculate the percent change over the time period
                    const percentChange = calculatePercentChange(response.data);
                    // edit the stock being modified
                    editStock(currentStock.symbol, response.data, percentChange,
                        timeline, currentStock.id, UPDATE_STOCKS, UPDATE_LISTS, user);
                    if (currentFavorite !== undefined) {
                        // edit the favorite in the sidebar to match the stock being modified
                        editFavorite(currentFavorite.symbol, response.data, percentChange,
                            timeline, currentFavorite.id, UPDATE_FAVORITES, user);
                    }
                    // cleanup function
                    setUpdateStocks(!updateStocks);
                    setSymbol('');
                    setLoading(false);
                }
                // handle error
            } catch (error) {
                console.error(error);
                setSymbol('');
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

    // Fetches the stock data with the symbol and displays is in a graph
    const addStockData = async () => {
        setLoading(true);
        try {
            // fetch the data
            const response = await axios.request(options);
            // handle error
            if (response.data.status === "error") {
                setSymbol('');
                console.log(response.data.message);
                setLoading(false);
            } else {
                // get the stock and calculate the percent change over the time period
                const foundStock = findSymbol(symbol);
                if (foundStock === undefined) {
                    const percentChange = calculatePercentChange(response.data);
                    // add the stock to the list and context API
                    addStock(symbol, response.data, percentChange, timeline);
                }
                // cleanup
                setUpdateStocks(!updateStocks);
                setSymbol('');
                setLoading(false);
            }
            // handle error
        } catch (error) {
            console.error(error);
            setSymbol('');
            setLoading(false);
        }
    }


    // Axios options for getting stock data from 12 Data API
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_RAPIDAPI_TIME_URL,
        params: { interval: `${timeline}`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
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
        setSymbol(stock.symbol);
        setCurrentStock(stock);
        setTimeline(time);
        // get favorite corresponding to the stock being modified if available
        const favorite = findFavorite(stock.symbol);
        setCurrentFavorite(favorite);
    }

    // Add the stock data for the current symbol in input bar
    const handleSubmit = e => {
        e.preventDefault();
        addStockData();
    }

    // Change symbol state to match with the input 
    const handleChange = (e) => {
        e.preventDefault();
        setSymbol(e.target.value);
    }

    // Set the symbol of the stock/s to filter
    const handleFilterChange = (e) => {
        e.preventDefault();
        setFilterSymbol(e.target.value);
    }

    // Set the new stocks after filtering them
    const handleFilter = (e) => {
        e.preventDefault();
        setLoading(true);
        let splitSymbols = []
        // filter the symbols if there is a comma
        if (filterSymbol.includes(',')) {
            const noWhiteSpace = filterSymbol.replace(/\s+/g, '')
            splitSymbols = noWhiteSpace.split(',');
            // filter the symbols if there is only spaces
        } else {
            splitSymbols = filterSymbol.split(' ');
        }
        // Set the filter list with the newest filtered stocks
        setFilterSymbols([...filterSymbols, ...splitSymbols]);
        setLoading(false);
        setFilterSymbol('');
    }

    // Sort the list of stocks in ascending/descending order
    const handleSort = () => {
        let sortedStocks = [];

        let index = 0;
        for (let stock of stocks) {
            sortedStocks[index] = stock;
            index++;
        }
        // sort them in descending order
        if (descending) {
            sortedStocks.sort((a, b) => b.percentChange - a.percentChange);
            // sort them in ascending order
        } else {
            sortedStocks.sort((a, b) => a.percentChange - b.percentChange);
        }
        // set the new list of stocks
        setNewStocks(sortedStocks);
    }

    // clear the list of stocks on the screen
    const clear = e => {
        e.preventDefault();
        clearStocks(UPDATE_STOCKS, UPDATE_LISTS, UPDATE_FAVORITES, user);
        setModal(false);
        setUpdateStocks(!updateStocks);
    }

    // Clear all current filters that are applied
    const clearFilters = e => {
        setFilterSymbols([]);
    }

    // Set the sorting order to ascending
    const setDescendingFalse = () => {
        setDescending(false);
    }

    // Set the sorting order to descending
    const setDescendingTrue = () => {
        setDescending(true);
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

    // function to hide the instructions
    const toggleHero = () => {
        setShowHero(!showHero);
    }

    if (!modal && !stockModal) {
        return (
            <div class="StockForm">
                <StockForm
                    showHero={showHero}
                    toggleHero={toggleHero}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    confirmClear={confirmClear}
                    symbol={symbol}
                    handleChange={handleChange}
                    handleFilter={handleFilter}
                    filterSymbol={filterSymbol}
                    handleFilterChange={handleFilterChange}
                    clearFilters={clearFilters}
                    handleSort={handleSort}
                    setDescendingTrue={setDescendingTrue}
                    setDescendingFalse={setDescendingFalse}
                />
                {/* render the list of stocks and pass down important 
                functions to change aspects of the stocks */}
                <StockList
                    filterSymbols={filterSymbols}
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
                <button class="modal-close is-large" aria-label="close"></button>
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

export default StockHub;
