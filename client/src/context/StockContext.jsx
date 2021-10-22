import React, { useState, useEffect, createContext } from 'react'
import { nanoid } from 'nanoid'

export const StockContext = createContext()

const StockContextProvider = props => {
  const initialStockState = JSON.parse(localStorage.getItem('stocks')) || [];
  const initialFavoriteState = JSON.parse(localStorage.getItem('favorites')) || [];

  const [stocks, setStocks] = useState(initialStockState);
  const [favorites, setFavorites] = useState(initialFavoriteState);

  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add favorites
  const addFavorite = (symbol, data, percentChange, timeline) => {
    setFavorites([...favorites, { symbol, data, percentChange, timeline, id: nanoid() }]);
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
  const findFavorite = symbol => {
    const favoriteStock = favorites.find(favorite => favorite.symbol === symbol);
    return favoriteStock;
  }

  // Add stocks
  const addStock = (symbol, data, percentChange, timeline) => {
    setStocks([...stocks, { symbol, data, percentChange, timeline, id: nanoid() }]);
  }

  // Remove stocks
  const removeStock = id => {
    setStocks(stocks.filter(stock => stock.id !== id));
    let stock = findStock(id);
    let favorite = findFavorite(stock.symbol);
    if (favorite !== undefined) {
      removeFavorite(favorite.id);
    }
  }

  // Clear stocks
  const clearList = () => {
    setStocks([]);
    setFavorites([]);
  }

  // Find stock
  const findStock = id => {
    const foundStock = stocks.find(stock => stock.id === id);
    return foundStock;
  }

  // Find stock
  const getStockTime = id => {
    const stockToGet = stocks.find(stock => stock.id === id);
    return stockToGet.timeline;
  }

  // Find stock with matching symbol
  const findSymbol = symbol => {
    const stockToGet = stocks.find(stock => stock.symbol === symbol);
    if (stockToGet !== undefined) {
      return true;
    }
    return false;
  }

  // Edit stock
  const editStock = (symbol, data, percentChange, timeline, id) => {
    const newStocks = stocks.map(stock => (stock.id === id ? { symbol, data, percentChange, timeline, id } : stock));
    setStocks(newStocks);
  }

  // Edit stock
  const editFavorite = (symbol, data, percentChange, timeline, id) => {
    const newFavorites = favorites.map(favorite => (favorite.id === id ? { symbol, data, percentChange, timeline, id } : favorite));
    setFavorites(newFavorites);
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
        findSymbol,
        editStock,
        editFavorite,
        getStockTime,
      }}
    >
      {props.children}
    </StockContext.Provider>
  )
}

export default StockContextProvider
