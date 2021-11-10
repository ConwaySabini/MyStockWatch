import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
const axios = require('axios').default;

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
  const addFavorite = (symbol, data, percentChange, timeline, url, userId) => {
    const newFavorites = [...favorites, { symbol, data, percentChange, timeline, id: nanoid() }];
    setFavorites();
    updateFavoriteData(url, userId, newFavorites);
  }

  // Remove favorites
  const removeFavorite = (id, userId, url) => {
    //TODO handle API calls
    let newFavorites = favorites.filter(favorite => favorite.id !== id);
    setFavorites(newFavorites);
    // delete the stock from the favorites database
    updateFavoriteData(url, userId, newFavorites);
  }

  // Clear favorites
  const clearFavorites = () => {
    //TODO handle API calls
    setFavorites([]);
  }

  // Find Favorite
  const findFavorite = symbol => {
    return favorites.find(favorite => favorite.symbol === symbol);
  }

  // Add List
  const addList = (name, stocks) => {
    //TODO handle API calls
    setLists([...lists, { name, stocks, id: nanoid() }]);
  }

  // Find List
  const findList = name => {
    return lists.find(list => list.name === name);
  }

  // Find and remove List
  const removeList = name => {
    //TODO handle API calls
    setLists(lists.filter(list => list.name !== name));
  }

  // Add a stock to a list
  const addStockToList = (name, symbol) => {
    //TODO API calls
    // edit stock if it exists
    const foundStock = stocks.find(stock => stock.symbol === symbol);
    const foundList = lists.find(list => list.name === name);
    let newStocks = [...foundList.stocks, foundStock];
    foundList.stocks = newStocks;
    const newLists = lists.map(list => (list.name === name ? foundList : list));
    setLists(newLists);
  }

  // remove a stock from a list
  const removeStockFromList = (name, symbol, url) => {
    // TODO handle API calls
    // edit stock if it exists
    const foundStock = stocks.find(stock => stock.symbol === symbol);
    const foundList = lists.find(list => list.name === name);
    foundList.stocks = foundList.stocks.filter(stock => stock.symbol !== foundStock.symbol);
    const newLists = lists.map(list => (list.name === name ? foundList : list));
    setLists(newLists);

    updateListData(url,)
  }

  //TODO make sure it works for multiple lists and other list functions
  // check if a list contains a stock
  const deleteStockFromLists = (symbol, userId, url) => {
    // find the lists if they exist
    const foundList = lists.find(list => list.stocks.find(stock => stock.symbol === symbol));
    if (foundList) {
      foundList.stocks = foundList.stocks.filter(stock => stock.symbol !== symbol);
      const newLists = lists.map(list => (list.name === foundList.name ? foundList : list));
      setLists(newLists);
      // delete the stock from the lists database
      updateListData(url, userId, newLists);
    }
  }

  // Clear favorites
  const clearLists = () => {
    //TODO handle API calls
    setLists([]);
  }

  // Add stocks
  const addStock = (symbol, data, percentChange, timeline) => {
    setStocks([...stocks, { symbol, data, percentChange, timeline, id: nanoid() }]);
  }

  // Remove stock by id
  const removeStock = (id, url, favoriteURL, listsURL, userId) => {
    let newStocks = stocks.filter(stock => stock.id !== id);
    setStocks(newStocks);
    // find the favorite if it exists
    let foundStock = findStock(id);
    let favorite = findFavorite(foundStock.symbol);
    if (favorite !== undefined) {
      // remove favorite stock
      removeFavorite(favorite.id, userId, favoriteURL);
    }
    // remove stock from the list
    deleteStockFromLists(foundStock.symbol, userId, listsURL);
    // delete the stock from the database
    updateStockData(url, userId, newStocks);
  }

  // update the stock data for the user
  const updateStockData = async (url, userId, newStocks) => {
    try {
      // update the stock data 
      const response = await axios.put(url, { userId: userId, stocks: newStocks });
      console.log("updatedStocks", response);
      // handle error
    } catch (error) {
      console.error(error);
    }
  }

  // update the stock data for the user
  const updateFavoriteData = async (url, userId, newFavorites) => {
    try {
      // update the stock data 
      const response = await axios.put(url, { userId: userId, favorites: newFavorites });
      console.log("updatedFavorites", response);
      // handle error
    } catch (error) {
      console.error(error);
    }
  }

  // update the stock data for the user
  const updateListData = async (url, userId, newLists) => {
    try {
      // update the stock data 
      const response = await axios.put(url, { userId: userId, lists: newLists });
      console.log("updatedLists", response);
      // handle error
    } catch (error) {
      console.error(error);
    }
  }

  // Clear stocks and favorites 
  const clearStocks = () => {
    //TODO handle API calls
    setStocks([]);
    setFavorites([]);
    setLists([]);
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
    return undefined;
  }

  // Edit stock
  const editStock = (symbol, data, percentChange, timeline, id) => {
    // edit stock if it exists
    const newStocks = stocks.map(stock => (stock.id === id ? { symbol, data, percentChange, timeline, id } : stock));
    setStocks(newStocks);
    //TODO handle API calls
  }

  // Set all stocks, method does not need to use database API
  const setNewStocks = (newStocks) => {
    setStocks(newStocks);
  }

  // Edit favorite
  const editFavorite = (symbol, data, percentChange, timeline, id) => {
    // edit favorite if it exists
    //TODO handle API calls
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
        clearLists,
        findList,
        lists,
        removeStockFromList,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
}

export default StockContextProvider;
