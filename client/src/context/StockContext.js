import React, { useState, useEffect, createContext } from 'react'
import { nanoid } from 'nanoid'

export const StockContext = createContext()

const StockContextProvider = props => {
  const initialStockState = JSON.parse(localStorage.getItem('stocks')) || [];
  const initialFavoriteState = JSON.parse(localStorage.getItem('favorites')) || [];

  const [stocks, setStocks] = useState(initialStockState);
  const [favorites, setFavorites] = useState(initialFavoriteState);
  const [time, setTime] = useState('1day');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add favorites
  const addFavorite = (stock) => {
    setFavorites([...favorites, { stock, id: nanoid() }]);
  }

  // Remove favorites
  const removeFavorite = id => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  }

  // Clear favorites
  const clearFavorites = () => {
    setFavorites([]);
  }

  // Find Favorite
  const findFavorite = id => {
    const favorite = favorites.find(favorite => favorite.id === id);
    //setEditItem(favorite);
  }

  // Add stocks
  const addStock = (symbol, data, percentChange, timeline) => {
    setStocks([...stocks, { symbol, data, percentChange, timeline, id: nanoid() }]);
  }

  // Remove stocks
  const removeStock = id => {
    setStocks(stocks.filter(stock => stock.id !== id));
  }

  // Clear stocks
  const clearList = () => {
    setStocks([]);
  }

  // Find stock
  const findStock = id => {
    const stock = stocks.find(stock => stock.id === id);
    setEditItem(stock);
  }

  // Find stock
  const getTimeline = id => {
    const stock = stocks.find(stock => stock.id === id);
    // setEditItem(item)
  }

  // Find stock with matching symbol
  const findSymbol = symbol => {
    const stock = stocks.find(stock => stock.symbol === symbol);
    // setEditItem(item)
  }

  // Edit stock
  const editStock = (symbol, data, percentChange, timeline, id) => {
    const newStocks = stocks.map(stock => (stock.id === id ? { symbol, data, percentChange, timeline, id } : stock));
    console.log(newStocks);
    setStocks(newStocks);
    setEditItem(null);
  }

  //Set Time
  const setStockTime = time => {
    setTime(time);
  }

  //Get Time
  const getStockTime = id => {
    const stock = stocks.find(stock => stock.id === id);
    return stock.timeline;
  }

  return (
    <StockContext.Provider
      value={{
        stocks,
        addStock,
        removeStock,
        clearList,
        findStock,
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        findFavorite,
        editStock,
        editItem,
        setStockTime,
        getStockTime,
      }}
    >
      {props.children}
    </StockContext.Provider>
  )
}

export default StockContextProvider
