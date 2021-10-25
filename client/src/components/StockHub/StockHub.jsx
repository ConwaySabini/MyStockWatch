import React, { useState, useContext, useEffect } from 'react'
import { StockContext } from "../../context/StockContext";
import StockList from '../StockList/StockList';
import './StockHub.css';
const axios = require('axios').default;

// Component to display all stocks and the forms to add/edit stocks
const StockHub = () => {
  // context api to modify data across components
  const { stocks, addStock, clearList, editStock, findFavorite,
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

  // Axios options for getting stock data from 12 Data API
  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: `${timeline}`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  // News API
  const BingNewsOptions = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: { textFormat: 'Raw', safeSearch: 'Off', category: 'Business' },
    headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });



  // More Trending News from API
  const NewsOptions = {
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/news/list-trending',
    headers: {
      'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  // When the user changes the timeline for a stock the new data is fetched and displayed to the graph
  useEffect(() => {
    const changeStockData = async () => {
      setLoading(true);
      try {
        // fetch the data 
        const response = await axios.request(options);
        // handle error
        if (response.data.status === "error") {
          setSymbol('');
          setLoading(false);
        } else {
          // get the stock and calculate the percent change over the time period
          const percentChange = calculatePercentChange(response.data);
          // edit the stock being modified
          editStock(symbol, response.data, percentChange,
            timeline, currentStock.id);
          if (currentFavorite !== undefined) {
            // edit the favorite in the sidebar to match the stock being modified
            editFavorite(symbol, response.data, percentChange,
              timeline, currentFavorite.id);
          }
          // cleanup function
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


    changeStockData();
  }, [stockChange]);

  // Fetches the stock data with the symbol and displays is in a graph
  const addStockData = async () => {
    setLoading(true);
    try {
      // fetch the data
      const response = await axios.request(options);
      // handle error
      if (response.data.status === "error") {
        setLoading(false);
        setSymbol('');
      } else {
        // get the stock and calculate the percent change over the time period
        const foundStock = findSymbol(symbol);
        if (foundStock === undefined) {
          const percentChange = calculatePercentChange(response.data);
          // add the stock to the list and context API
          addStock(symbol, response.data, percentChange, timeline);
        }
        // cleanup
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

  //TODO get confirmation before clearing list
  // clear the list of stocks on the screen
  const clear = e => {
    clearList();
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

  return (
    <div class="StockForm">
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
        </div>
      </section>
      <div class="block" />
      {/* Forms and buttons to interact with the dashboard */}
      <div className="button-and-forms">
        <div class="columns">
          <div class="column is-3">
            <button class="button is-link" onClick={handleSubmit} disabled={loading}>Add Stock</button>
            <button class="button is-danger ml-5" onClick={clear} disabled={loading}>
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
            <button class="button is-link" onClick={handleFilter} disabled={loading}>Filter</button>
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
            <button class="button is-link mr-4" onClick={handleSort} disabled={loading}>Sort</button>
            <div class="dropdown is-hoverable ml-4">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" disabled={loading}>
                  <span>Ascending/Descending</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <button class="button is-link" id="dropdown-buton" onClick={setDescendingFalse} disabled={loading}>Ascending</button>
                    <button class="button is-link mt-2" id="dropdown-buton" onClick={setDescendingTrue} disabled={loading}>Descending</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* render the list of stocks and pass down important functions to change aspects of the stocks */}
      <StockList handleTimeChange={handleTimeChange} filterSymbols={filterSymbols} handleStockChange={handleStockChange} />
    </div >
  );
}

export default StockHub
