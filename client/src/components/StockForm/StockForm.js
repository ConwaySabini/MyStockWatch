import React, { useState, useContext, useEffect } from 'react'
import { StockContext } from "../../context/StockContext";

const StockForm = () => {
  const { addStock, clearList, editStock, editItem } = useContext(StockContext)
  const [title, setTitle] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!editItem) {
      addStock(title)
      setTitle('')
    } else {
      editStock(title, editItem.id)
    }
  }

  const handleChange = e => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title)
      console.log(editItem)
    } else {
      setTitle('')
    }
  }, [editItem])

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Add Stock..."
        value={title}
        onChange={handleChange}
        required
        className="stock-input"
      />
      <div className="buttons">
        <button type="submit" className="btn add-stock-btn">
          {editItem ? 'Edit Stock' : 'Add Stock'}
        </button>
        <button className="btn clear-btn" onClick={clearList}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default StockForm
