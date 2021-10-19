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
  }, [stocks])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  // Add favorites
  const addFavorite = (symbol, data) => {
    setFavorites([...favorites, { symbol, data, id: nanoid() }]);
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
    // setEditItem(item)
  }

  // const [editItem, setEditItem] = useState(null)

  // Add stocks
  const addStock = (symbol, data) => {
    setStocks([...stocks, { symbol, data, id: nanoid() }]);
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
    // setEditItem(item)
  }

  // Find stock with matching symbol
  const findSymbol = symbol => {
    const stock = stocks.find(stock => stock.symbol === symbol);
    // setEditItem(item)
  }

  // // Edit stock
  // const editStock = (title, id) => {
  //   const newStocks = stocks.map(stock => (stock.id === id ? { title, id } : stock))
  //   console.log(newStocks)
  //   setStocks(newStocks)
  //   setEditItem(null)
  // }

  return (
    <StockContext.Provider
      value={{
        stocks,
        addStock,
        removeStock,
        clearList,
        findStock,
        addFavorite,
        removeFavorite,
        clearFavorites,
        findFavorite,
        // editStock,
        // editItem
      }}
    >
      {props.children}
    </StockContext.Provider>
  )
}

export default StockContextProvider
