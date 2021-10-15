import React, { useState, useContext, useEffect } from 'react'
import { StockContext } from "../../context/StockContext";
const axios = require('axios').default;

const StockForm = () => {
  const { addStock, clearList, /*editStock,*/ editItem } = useContext(StockContext);
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: { interval: '1day', symbol: `${symbol}`, format: 'json', outputsize: '30' },
    headers: {
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  const getStockData = () => {
    setLoading(true);
    axios.request(options).then(function (response) {
      console.log(response.data);
      setLoading(false);
    }).catch(function (error) {
      console.error(error);
      setLoading(false);
    });
  }

  const handleSubmit = e => {
    e.preventDefault()
    //if (!editItem) {
    getStockData();
    addStock(symbol, stockData);
    setSymbol('');
    //}
    //  else {
    //   editStock(title, editItem.id)
    // }
  }

  const handleChange = e => {
    setSymbol(e.target.value);
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
          Clear
        </button>

        <form onSubmit={handleSubmit}>
          <div className="stock-form" id="stock-search">
            <input
              type="text"
              placeholder="Add Stock..."
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
  )
}

export default StockForm
