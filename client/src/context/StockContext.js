import React, { useState, useEffect, createContext } from 'react'
import { nanoid } from 'nanoid'

export const StockContext = createContext()

const StockContextProvider = props => {
  const initialStockState = JSON.parse(localStorage.getItem('stocks')) || [];
  const initialFavoriteState = JSON.parse(localStorage.getItem('favorites')) || [];

  const [stocks, setStocks] = useState(initialStockState);
  const [favorites, setFavorites] = useState(initialFavoriteState);
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
    const favoriteStock = favorites.find(favorite => favorite.id === id);
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
    const foundStock = stocks.find(stock => stock.id === id);
    // setEditItem(foundStock);
  }

  // Find stock
  const getStockTime = id => {
    const stockToGet = stocks.find(stock => stock.id === id);
    return stockToGet.timeline;
    // setEditItem(item)
  }

  // Find stock with matching symbol
  const findSymbol = symbol => {
    const stockToGet = stocks.find(stock => stock.symbol === symbol);
    // setEditItem(item)
  }

  // Edit stock
  const editStock = (symbol, data, percentChange, timeline, id) => {
    const newStocks = stocks.map(stock => (stock.id === id ? { symbol, data, percentChange, timeline, id } : stock));
    console.log(newStocks);
    setStocks(newStocks);
    setEditItem(null);
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
        getStockTime,
      }}
    >
      {props.children}
    </StockContext.Provider>
  )
}

export default StockContextProvider
