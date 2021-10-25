import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';

export const StockContext = createContext();

const StockContextProvider = props => {
  // Set the state in local storage
  const initialStockState = JSON.parse(localStorage.getItem('stocks')) || [];
  const initialFavoriteState = JSON.parse(localStorage.getItem('favorites')) || [];

  // states for stock list and favorites list
  const [stocks, setStocks] = useState(initialStockState);
  const [favorites, setFavorites] = useState(initialFavoriteState);

  // update local storage on modification
  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  // update local storage on modification
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

  // Remove stock by id
  const removeStock = id => {
    setStocks(stocks.filter(stock => stock.id !== id));
    let stock = findStock(id);
    let favorite = findFavorite(stock.symbol);
    if (favorite !== undefined) {
      removeFavorite(favorite.id);
    }
  }

  // Clear stocks and favorites 
  const clearStocks = () => {
    setStocks([]);
    setFavorites([]);
  }

  // Clear stocks only
  const clearStocksOnly = () => {
    setStocks([]);
  }

  // Find stock and return it
  const findStock = id => {
    return stocks.find(stock => stock.id === id);
  }

  // Find stock timeline and return it
  const getStockTime = id => {
    const stockToGet = stocks.find(stock => stock.id === id);
    return stockToGet.timeline;
  }

  // Find stock with matching symbol
  const findSymbol = symbol => {
    const stockToGet = stocks.find(stock => stock.symbol === symbol);
    if (stockToGet !== undefined) {
      return stockToGet;
    }
    return stockToGet;
  }

  // Edit stock
  const editStock = (symbol, data, percentChange, timeline, id) => {
    // edit stock if it exists
    const newStocks = stocks.map(stock => (stock.id === id ? { symbol, data, percentChange, timeline, id } : stock));
    setStocks(newStocks);
  }

  // Set all stocks
  const setNewStocks = (newStocks) => {
    clearStocksOnly();
    setStocks(newStocks);
  }

  // Edit favorite
  const editFavorite = (symbol, data, percentChange, timeline, id) => {
    // edit favorite if it exists
    const newFavorites = favorites.map(favorite => (favorite.id === id ? { symbol, data, percentChange, timeline, id } : favorite));
    setFavorites(newFavorites);
  }

  // export all functions, data, and components wrapped in context
  return (
    <StockContext.Provider
      value={{
        stocks,
        addStock,
        removeStock,
        clearStocks,
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
        setNewStocks,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
}

export default StockContextProvider;
