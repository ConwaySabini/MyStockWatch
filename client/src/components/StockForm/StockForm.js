import React, { useState, useContext, useEffect } from 'react'
import { StockContext } from "../../context/StockContext";
const axios = require('axios').default;

const StockForm = () => {
  const { addStock, clearList, editStock, editItem, findSymbol, addFavorite } = useContext(StockContext);
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [timeline, setTimeline] = useState('1day');


  // News 

  // var axios = require("axios").default;

  // var options = {
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

  // var options = {
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




  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: `${timeline}`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };



  const getStockData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      console.log(response.data);
      if (response.data.status === "error") {
        setLoading(false);
      } else {
        setLoading(false);
        setCounter(counter + 1);



        let priceSize = response.data.values.length;
        let startPrice = response.data.values[0].close;
        let endPrice = response.data.values[priceSize - 1].close;
        let difference = endPrice - startPrice;
        let percentChange = (difference / startPrice) * 100;

        addStock(symbol, response.data, percentChange, timeline);
        setSymbol('');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }



  const handleSubmit = e => {
    e.preventDefault()
    //if (!editItem) {
    getStockData();
    //}
    //  else {
    //   editStock(title, editItem.id)
    // }
  }

  const handleChange = e => {
    setSymbol(e.target.value);
  }

  const clear = e => {
    setCounter(0);
    clearList();
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
      <div className="button-and-form">
        <button class="button is-link" onClick={handleSubmit} disabled={loading}>Add Stock</button>
        <button class="button is-danger ml-5" onClick={clearList} disabled={loading}>
          Clear All Stocks
        </button>

        <form onSubmit={handleSubmit}>
          <div className="stock-form" id="stock-search">
            <input
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
    </div >
  );
}

export default StockForm
