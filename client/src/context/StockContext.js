import React, { useState, useEffect, createContext } from 'react'
import { nanoid } from 'nanoid'

export const StockContext = createContext()

const StockContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem('stocks')) || [];

  const [stocks, setStocks] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks])

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
    const item = stocks.find(stock => stock.id === id);

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
        // editStock,
        // editItem
      }}
    >
      {props.children}
    </StockContext.Provider>
  )
}

export default StockContextProvider
