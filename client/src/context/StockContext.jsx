import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';

export const StockContext = createContext();

const StockContextProvider = props => {
  // Set the state in local storage
  const initialStockState = JSON.parse(localStorage.getItem('stocks')) || [];
  const initialFavoriteState = JSON.parse(localStorage.getItem('favorites')) || [];
  const initialListsState = JSON.parse(localStorage.getItem('lists')) || [];

  // states for stock, favorites, and news list
  const [stocks, setStocks] = useState(initialStockState);
  const [favorites, setFavorites] = useState(initialFavoriteState);
  const [lists, setLists] = useState(initialListsState);

  // update local storage on modification
  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  // update local storage on modification
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // update local storage on modification
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

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

  // Add List
  const addList = (name, stocks) => {
    setLists([...lists, { name, stocks, id: nanoid() }]);
  }

  // Find and remove List
  const removeList = name => {
    setLists(lists.filter(list => list.name !== name));
  }

  // Edit lists
  const addStockToList = (name, symbol) => {
    // edit stock if it exists
    const foundStock = stocks.find(stock => stock.symbol === symbol);
    const foundList = lists.find(list => list.name === name);
    let newStocks = [...foundList.stocks, foundStock];
    let id = foundList.id;
    const newLists = stocks.map(list => (list.name === name ? { name, newStocks, id } : list));
    setLists(newLists);
  }

  // Get the lists
  const getLists = () => {
    return lists;
  }

  // Clear favorites
  const clearLists = () => {
    setLists([]);
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
        removeList,
        addList,
        addStockToList,
        getLists,
        clearLists,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
}

export default StockContextProvider;
