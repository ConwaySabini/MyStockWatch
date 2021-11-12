import React, { useState, useContext, useEffect, useRef } from 'react';
import { StockContext } from "../../context/StockContext";
import StockList from '../StockList/StockList';
import './StockHub.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios').default;

// Component to display all stocks and the forms to add/edit stocks
const StockHub = ({ user }) => {
  // context api to modify data across components
  const { stocks, addStock, clearStocks, editStock, findFavorite,
    editFavorite, findSymbol, setNewStocks } = useContext(StockContext);
  // symbol of the stock to be searched
  const [symbol, setSymbol] = useState('');
  // array of symbols to filter from the stock list
  const [filterSymbols, setFilterSymbols] = useState([]);
  // contains the current symbols from the filter bar
  const [filterSymbol, setFilterSymbol] = useState('');
  // when the page is loading some actions are disabled
  const [loading, setLoading] = useState(false);
  // timeframe of the stock to graph
  const [timeline, setTimeline] = useState('1day');
  // when the timeline is changed of a stock this state is changed to reflect that change
  const [stockChange, setStockChange] = useState(false);
  // the current stock to be modified
  const [currentStock, setCurrentStock] = useState({});
  // the current favorite to be modified
  const [currentFavorite, setCurrentFavorite] = useState({});
  // when sorting the stocks decide which direction to sort
  const [descending, setDescending] = useState(true);
  // modal for confirming events
  const [modal, setModal] = useState(false);
  // flag for displaying the instructions
  const [showHero, setShowHero] = useState(true);
  // flag for updating the stocks on the database
  const [updateStocks, setUpdateStocks] = useState(false);
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

  //TODO add an update data button to stock???

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
          for (const stock of stocks) {
            let containsStock = false;
            for (const pushedStock of newStocks) {
              // Check if the stock is already in the list
              if (stock.symbol === pushedStock.symbol) {
                containsStock = true;
              }
            }
            if (!containsStock) {
              newStocks.push(stock);
            }
          }
          // push stocks to the list from the database
          for (const stock of response.data.stocks.stocks) {
            let containsStock = false;
            for (const newStock of newStocks) {
              // Check if the stock is already in the list
              if (stock.symbol === newStock.symbol) {
                containsStock = true;
              }
            }
            if (!containsStock) {
              newStocks.push(stock);
            }
            //newStocks.push(stock);
          }
          setNewStocks(newStocks);
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
  }, [updateStocks]);

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
          editStock(symbol, response.data, percentChange,
            timeline, currentStock.id, UPDATE_STOCKS, UPDATE_LISTS, user);
          if (currentFavorite !== undefined) {
            // edit the favorite in the sidebar to match the stock being modified
            editFavorite(symbol, response.data, percentChange,
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

  // Add the stock data for the current symbol in input bar
  const handleSubmit = e => {
    e.preventDefault();
    addStockData();
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

  // When user changes timeline change state to reflect change
  const handleStockChange = (time) => {
    setStockChange(!stockChange);
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

  if (!modal) {
    return (
      <div class="StockForm">
        {showHero ? (
          <div>
            <a onClick={() => toggleHero()} href="#instructions">
              <FontAwesomeIcon id="angle-down-menu" icon={faAngleDown} size="2x" />
            </a>
            {/* Title and information about the dashboard */}
            <section class="hero is-link" id="hero-dash">
              <div class="hero-body">
                <p class="title">
                  Welcome to MyStockWatch
                </p>
                <p class="subtitle">
                  Enter the symbol and click the <strong>Add Stock button or Enter</strong>, to add the stock.
                </p>
                <h2 class="subtitle">
                  Enter a symbol or multiple symbols separated by a comma or space to filter the stocks. Then hit the
                  <strong> Filter button or Enter</strong>, to filter the stocks.
                </h2>
                <h2 class="subtitle">
                  Use the dropdown menu and select an option then press the
                  <strong> Sort button</strong>, to sort the stocks by change in price.
                </h2>
              </div>
            </section>

          </div>) :
          (
            <a onClick={() => toggleHero()} href="#instructions">
              <FontAwesomeIcon id="angle-down-menu" icon={faAngleUp} size="2x" />
            </a>
          )
        }
        <div class="block" />
        {/* Forms and buttons to interact with the dashboard */}
        <div className="button-and-forms ml-6">
          <div class="columns">
            <div class="column is-4">
              <button class="button is-link ml-2" onClick={handleSubmit} disabled={loading}>Add Stock</button>
              <button class="button is-danger ml-5" onClick={confirmClear} disabled={loading}>
                Clear All Stocks
              </button>

              <form onSubmit={handleSubmit}>
                <div className="stock-form" id="stock-search">
                  <input
                    id="StockInput"
                    type="text"
                    placeholder="Enter Symbol..."
                    value={symbol}
                    onChange={handleChange}
                    required
                    class="input is-rounded is-link mt-4"
                    disabled={loading}
                  />
                </div>
              </form>
            </div>
            <div class="column is-3">
              <button class="button is-link ml-2" onClick={handleFilter} disabled={loading}>Filter</button>
              <button class="button is-danger ml-5" onClick={clearFilters} disabled={loading}>
                Clear All Filters
              </button>
              <form onSubmit={handleFilter}>
                <input
                  id="FilterInput"
                  type="text"
                  placeholder="Enter Symbol to Filter"
                  value={filterSymbol}
                  onChange={handleFilterChange}
                  required
                  class="input is-rounded is-link mt-4"
                  disabled={loading}
                />
              </form>
            </div>
            <div class="column is-4">
              <button class="button is-link ml-4 mr-4" onClick={handleSort} disabled={loading}>Sort</button>
              <div class="dropdown is-hoverable ml-4">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" disabled={loading}>
                    <span>Ascending/Descending</span>
                    <span class="icon is-small">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="sort-dropdown" role="menu">
                  <div class="dropdown-content" id="sort-dropdown">
                    <div class="dropdown-item">
                      <button
                        class="button is-link"
                        id="dropdown-buton"
                        onClick={setDescendingFalse}
                        disabled={loading}>
                        Ascending
                      </button>
                      <button
                        class="button is-link mt-4"
                        id="dropdown-buton"
                        onClick={setDescendingTrue}
                        disabled={loading}>
                        Descending
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* render the list of stocks and pass down important functions to change aspects of the stocks */}
        <StockList
          handleTimeChange={handleTimeChange}
          filterSymbols={filterSymbols}
          handleStockChange={handleStockChange}
          user={user}
        />
      </div >
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

export default StockHub
