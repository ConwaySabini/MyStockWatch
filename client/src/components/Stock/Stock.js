import './Stock.css';
import { useContext } from "react";
import { StockContext } from "../../context/StockContext";

function Stock({ stock }) {
  const { removeStock, findStock } = useContext(StockContext)
  return (
    // <li className="list-item">
    <div className="StockCard mt-6">
      <header class="card-header">
        <p class="card-header-title">
          Stock: {stock.symbol}
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        {/* <div>
      <p> Price: {price} </p>
      <p> Interval: {interval} </p>
      <p> Exchange: {exchange} </p>
    </div> */}
      </div>
      <footer class="card-footer">
        <span class="button is-link modal-button ml-2 mt-2 mb-2" data-target="modal-card">Expand Card</span>
        <button className="delete-stock" class="button is-danger ml-4 pr-2 pl-5 mt-2 mb-2" onClick={() => removeStock(stock.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
        {/* <button className="edit-stock" onClick={() => findStock(stock.id)}>
          <i className="fas fa-pen"></i>
        </button> */}
      </footer>
    </div >
    // </li>
  )
}

export default Stock;
