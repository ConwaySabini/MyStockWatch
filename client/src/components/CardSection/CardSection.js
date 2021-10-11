import './CardSection.css';
import Card from './../Card/Card';
import { useState } from "react";

function CardSection() {
  const [symbol, setSymbol] = useState("");
  const [cards, setCards] = useState([]);


  const addCard = (e) => {
    e.preventDefault();
    setCards([...cards, symbol]);
    setSymbol("");
  };

  const removeCard = (id) => {
    const newCards = [...cards];
    newCards.splice(id, 1);
    setCards(newCards);
  };

  return (
    <div classname="CardSection">
      <section class="section">
        <div class="container">

          <h1 class="title">Enter the symbol of the stock</h1>
          <h2 class="subtitle">
            Click the <strong>button</strong>, to add the stock.
          </h2>
          <div className="addbutton">
            <button class="button is-link" onClick={addCard}>Add Stock</button>
            <button class="button is-danger ml-5" onClick={() => setCards([""])}>Clear Stocks</button>
            <input class="input is-rounded ml-5" type="text" placeholder="Rounded input" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
          </div>
          <div class="block"></div>


          <div class="columns features">
            {cards.map((card, id) => (
              <div className="StockCard" key={id}>
                <div class="card">
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
                    <div class="content">
                      <h4>{symbol}</h4>
                      <p>Price:</p>

                    </div>
                  </div>
                  <footer class="card-footer">
                    <span class="button is-link modal-button ml-2 mt-2 mb-2" data-target="modal-card">Expand Card</span>
                    <button class="button is-danger ml-4 mr-2 mt-2 mb-2" onClick={() => removeCard(id)}>Remove Card</button>
                  </footer>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default CardSection;
