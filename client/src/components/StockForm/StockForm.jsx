import React, { useState, useContext, useEffect } from 'react'
import { StockContext } from "../../context/StockContext";
import StockList from '../StockList/StockList';
import Stock from "../Stock/Stock";
import './StockForm.css';
const axios = require('axios').default;

const StockForm = () => {
  const { stocks, addStock, clearList, editStock, findFavorite, editFavorite, findSymbol } = useContext(StockContext);
  const [symbol, setSymbol] = useState('');
  const [filterSymbols, setFilterSymbols] = useState([]);
  const [filterSymbol, setFilterSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState('1day');
  const [currentStock, setCurrentStock] = useState({});
  const [currentFavorite, setCurrentFavorite] = useState({});

  // Axios options for getting stock data from rapidAPI
  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: `${timeline}`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  const optionsDaily = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: `1h`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  const optionsWeekly = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: `2h`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  const optionsMonthly = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: `1day`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  const optionsBiYearly = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: `1month`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  useEffect(() => {
    const changeStockData = async () => {
      setLoading(true);
      console.log("time ", timeline, "symbol ", symbol);
      try {
        const response = await axios.request(options);
        console.log(response.data);
        if (response.data.status === "error") {
          setSymbol('');
          setLoading(false);
        } else {
          const percentChange = calculatePercentChange(response.data);
          editStock(symbol, response.data, percentChange, timeline, currentStock.id);
          if (currentFavorite !== undefined) {
            editFavorite(symbol, response.data, percentChange, timeline, currentFavorite.id);
          }
          setSymbol('');
          setLoading(false);
          //setTimeline('1day');
        }
      } catch (error) {
        console.error(error);
        setSymbol('');
        setLoading(false);
      }
    }

    if (symbol !== '' &&
      timeline !== '1day' &&
      timeline !== '2h' &&
      timeline !== '1h' &&
      timeline !== '1day' &&
      timeline !== '1month') {
      changeStockData();
    } else if (symbol !== '') {
      const stock = findSymbol(symbol);
      const percentChange = 0;
      switch (timeline) {
        default:
          changeStockData();
          break;
        case '1month':
          percentChange = calculatePercentChange(stock.dataYearly);
          break;
        case '1day':
          percentChange = calculatePercentChange(stock.dataMonthly);
          break;
        case '2h':
          percentChange = calculatePercentChange(stock.dataWeekly);
          break;
        case '1h':
          percentChange = calculatePercentChange(stock.dataDaily);
          break;
      }
      setLoading(true);
      editStock(symbol, stock.data, stock.dataDaily, stock.dataWeekly, stock.dataMonthly, stock.dataYearly, percentChange, timeline, currentStock.id);
      if (currentFavorite !== undefined) {
        editFavorite(symbol, stock.data, stock.dataDaily, stock.dataWeekly, stock.dataMonthly, stock.dataYearly, percentChange, timeline, currentFavorite.id);
      }
      setSymbol('');
      setLoading(false);
    }
  }, [timeline]);

  // News API
  // var axios = require("axios").default;

  // const BingNewsOptions = {
  //   method: 'GET',
  //   url: 'https://bing-news-search1.p.rapidapi.com/news',
  //   params: { textFormat: 'Raw', safeSearch: 'Off', category: 'Business' },
  //   headers: {
  //     'x-bingapis-sdk': 'true',
  //     'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  //     'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  //   }
  // };

  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });



  // More Trending News

  // const NewsOptions = {
  //   method: 'GET',
  //   url: 'https://seeking-alpha.p.rapidapi.com/news/list-trending',
  //   headers: {
  //     'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com',
  //     'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  //   }
  // };

  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  const addStockData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      console.log(response.data);
      if (response.data.status === "error") {
        setLoading(false);
        setSymbol('');
      } else {
        const foundStock = findSymbol(symbol);
        if (foundStock === undefined) {
          const percentChange = calculatePercentChange(response.data);
          addStock(symbol, response.data, percentChange, timeline);
        }
        setSymbol('');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setSymbol('');
      setLoading(false);
    }
  }

  const addAllStockData = async () => {
    setLoading(true);
    try {
      //TODO make one request with all options
      const response = await axios.request(options);
      const responseDaily = await axios.request(optionsDaily);
      const responseWeekly = await axios.request(optionsWeekly);
      const responseMonthly = await axios.request(optionsMonthly);
      const responseBiYearly = await axios.request(optionsBiYearly);
      if (response.data.status === "error" ||
        responseDaily.data.status === "error" ||
        responseWeekly.data.status === "error" ||
        responseMonthly.data.status === "error" ||
        responseBiYearly.data.status === "error") {
        setSymbol('');
        setLoading(false);
      } else {
        const foundStock = findSymbol(symbol);
        if (foundStock === undefined) {
          const percentChange = calculatePercentChange(response.data);
          addStock(symbol, response.data, responseDaily.data, responseWeekly.data, responseMonthly.data, responseBiYearly.data, percentChange, timeline);
        }
        setSymbol('');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setSymbol('');
      setLoading(false);
    }
  }

  //TODO get data from Context and sort the stocks based on percentChange for timeline and add to state
  const sortStocks = (timeframe) => {
    //TODO make each stock a symbol, percentChange object pair based on timeframe
    let sortedStocks = [];

    for (const stock of stocks) {
    }

  }

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

  const handleSubmit = e => {
    e.preventDefault();
    //addStockData();
    addAllStockData();
  }

  const handleTimeChange = (time, stock) => {
    setSymbol(stock.symbol);
    setCurrentStock(stock);
    setTimeline(time);
    const favorite = findFavorite(stock.symbol);
    setCurrentFavorite(favorite);
  }

  const handleChange = (e) => {
    setSymbol(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilterSymbol(e.target.value);
  }

  //TODO fix
  const handleFilter = (e) => {
    e.preventDefault();
    setFilterSymbols([...filterSymbols, filterSymbol]);
  }

  //TODO get confirmation before clearing list
  const clear = e => {
    clearList();
  }

  const clearFilters = e => {
    setFilterSymbols([]);
  }

  // useEffect(() => {
  //   if (editItem) {
  //     setSymbol(editItem.symbol);
  //     console.log(editItem);
  //   } else {
  //     setSymbol('');
  //   }
  // }, [editItem]);


  return (
    <div class="StockForm">
      <h1 class="symbol">Welcome to Stocks</h1>
      <h2 class="subtitle">
        Enter the symbol and click the <strong>button</strong>, to add the stock.
      </h2>
      <div className="button-and-forms">
        <div class="columns">
          <div class="column is-4">
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
            <button class="button is-link mr-4" onClick={handleSubmit} disabled={loading}>Sort</button>
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span>Sort</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                    Listed Price
                  </a>
                  <a href="#" class="dropdown-item">
                    Daily Price
                  </a>
                  <a href="#" class="dropdown-item">
                    Weekly Price
                  </a>
                  <a href="#" class="dropdown-item">
                    Monthly Price
                  </a>
                  <a href="#" class="dropdown-item">
                    6 Month Price
                  </a>
                  <a href="#" class="dropdown-item">
                    2.5 Year Price
                  </a>
                </div>
              </div>
            </div>
            <div class="dropdown is-hoverable ml-4">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span>Ascending/Descending</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                    Ascending Order
                  </a>
                  <a href="#" class="dropdown-item">
                    Descending Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StockList handleTimeChange={handleTimeChange} filterSymbols={filterSymbols} />
    </div >
  );
}

export default StockForm
