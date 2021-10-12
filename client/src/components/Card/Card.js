import './Card.css';
import { useState } from "react";

function Card({ symbol, price, interval, exchange, id, removeCard }) {
  return (
    <div class="column is-4" className="StockCard">
      <header class="card-header">
        <p class="card-header-title">
          Stock: {symbol}
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div>
          <p> Price: {price} </p>
          <p> Interval: {interval} </p>
          <p> Exchange: {exchange} </p>
        </div>
      </div>
      <footer class="card-footer">
        <span class="button is-link modal-button ml-2 mt-2 mb-2" data-target="modal-card">Expand Card</span>
        <button className="Xbutton" class="button is-danger ml-6 mt-2 mb-2" onClick={() => removeCard(id)}>X</button>
      </footer>
    </div>
  );
}

export default Card;
