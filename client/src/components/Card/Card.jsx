import './Card.css';
import { useState } from "react";

// Component for individual news card
function Card({ symbol, price, interval, exchange, id, removeCard }) {
  return (
    <div class="column is-4" className="NewsCard">
      <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <p class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="" />
            </p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            {/* <!-- Content ... --> */}
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Card;
