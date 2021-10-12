import './Stock.css';
import { useContext } from "react";
import { StockContext } from "../../context/StockContext";

function Stock({ stock }) {
  const { removeStock, findStock } = useContext(StockContext)
  return (
    <li className="list-item">
      <span>{stock.title} </span>
      <div>
        <button
          className="btn-delete stock-btn"
          onClick={() => removeStock(stock.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>{' '}
        <button className="btn-edit stock-btn" onClick={() => findStock(stock.id)}>
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </li>
  )
}

export default Stock;
