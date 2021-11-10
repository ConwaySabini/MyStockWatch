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
    let newFavorites = favorites.filter(favorite => favorite.id !== id);
    setFavorites(newFavorites);
    // delete the stock from the favorites database
    updateFavoriteData(url, userId, newFavorites);
  }

  // Clear favorites
  const clearFavorites = (url, userId) => {
    let newFavorites = [];
    // update database with new favorites
    updateFavoriteData(url, userId, newFavorites);
    // update context
    setFavorites([]);
  }

  // Find Favorite
  const findFavorite = symbol => {
    return favorites.find(favorite => favorite.symbol === symbol);
  }

  // Add List
  const addList = (name, stocks, url, userId) => {
    let newLists = [...lists, { name, stocks, id: nanoid() }];
    // update database with new lists
    updateListData(url, userId, newLists);
    // update context
    setLists(newLists);
  }

  // Find List
  const findList = name => {
    return lists.find(list => list.name === name);
  }

  // Find and remove List
  const removeList = (name, url, userId) => {
    let newLists = lists.filter(list => list.name !== name);
    // update context
    setLists(newLists);
    // update database with new lists
    updateListData(url, userId, newLists);
  }

  // Add a stock to a list
  const addStockToList = (name, symbol, url, userId) => {
    // edit stock if it exists
    const foundStock = stocks.find(stock => stock.symbol === symbol);
    // find the list with the stock
    const foundList = lists.find(list => list.name === name);
    // set the new stocks with added stock
    let newStocks = [...foundList.stocks, foundStock];
    foundList.stocks = newStocks;
    // update the lists
    const newLists = lists.map(list => (list.name === name ? foundList : list));
    // update the database and context
    updateListData(url, userId, newLists);
    setLists(newLists);
  }

  // remove a stock from a list
  const removeStockFromList = (name, symbol, url, userId) => {
    // edit stock if it exists
    const foundStock = stocks.find(stock => stock.symbol === symbol);
    const foundList = lists.find(list => list.name === name);
    // change the lists stocks to remove the stock
    foundList.stocks = foundList.stocks.filter(stock => stock.symbol !== foundStock.symbol);
    // Add the list to the lists
    const newLists = lists.map(list => (list.name === name ? foundList : list));
    // update the list in the database
    updateListData(url, userId, newLists);
    // update context API lists
    setLists(newLists);
  }

  //TODO test this for multiple lists
  // check if a list contains a stock
  const deleteStockFromLists = (symbol, userId, url) => {
    let newLists = [];
    // find the lists if they exist
    for (let list of lists) {
      newLists.push(list);
    }
    for (let list of newLists) {
      for (let stock of list.stocks) {
        if (stock.symbol === symbol) {
          // remove the stock from the list
          list.stocks = list.stocks.filter(stock => stock.symbol !== symbol);
        }
      }
    }
    setLists(newLists);
    // delete the stock from the lists database
    updateListData(url, userId, newLists);
    // const foundList = lists.find(list => list.stocks.find(stock => stock.symbol === symbol));
    // if (foundList) {
    //   // remove the stock from the list
    //   foundList.stocks = foundList.stocks.filter(stock => stock.symbol !== symbol);
    //   // update the list in the lists
    //   const newLists = lists.map(list => (list.name === foundList.name ? foundList : list));
    //   setLists(newLists);
    //   // delete the stock from the lists database
    //   updateListData(url, userId, newLists);
    // }
  }

  // Clear favorites
  const clearLists = (url, userId) => {
    let newLists = [];
    updateListData(url, userId, newLists);
    setLists([]);
  }

  // Add stocks
  const addStock = (symbol, data, percentChange, timeline) => {
    // update context
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

  // Clear stocks and favorites 
  const clearStocks = (stocksURL, favoritesURL, listsURL, userID) => {
    // update context
    setStocks([]);
    setFavorites([]);
    setLists([]);
    // update database
    updateStockData(stocksURL, userID, []);
    updateFavoriteData(favoritesURL, userID, []);
    updateListData(listsURL, userID, []);
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
  const editStock = (symbol, data, percentChange, timeline, id, stocksURL, listsURL, userId) => {
    // edit stock if it exists
    const newStocks = stocks.map(stock => (stock.id === id ? { symbol, data, percentChange, timeline, id } : stock));
    setStocks(newStocks);
    let newLists = [];
    // find the lists if they exist
    for (let list of lists) {
      newLists.push(list);
    }
    for (let list of newLists) {
      list.stocks = list.stocks.map(stock => (stock.symbol === symbol ? { symbol, data, percentChange, timeline, id } : stock));
    }
    setLists(newLists);
    updateStockData(stocksURL, userId, newStocks);
    updateListData(listsURL, userId, newLists);
  }

  // Set all stocks, method does not need to use database API
  const setNewStocks = (newStocks) => {
    setStocks(newStocks);
  }

  // Edit favorite
  const editFavorite = (symbol, data, percentChange, timeline, id, url, userId) => {
    // edit favorite if it exists
    const newFavorites = favorites.map(favorite => (favorite.id === id ? { symbol, data, percentChange, timeline, id } : favorite));
    // update databse data
    updateFavoriteData(url, userId, newFavorites);
    setFavorites(newFavorites);
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
