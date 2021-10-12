import './CardSection.css';
import Card from './../Card/Card';
import { useState } from "react";

function CardSection() {
  const [value, setValue] = useState("");
  const [cards, setCards] = useState([
    {
      symbol: "AMZN",
      price: "1234.56",
      interval: "1d",
      exchange: "NYSE",
      id: "AMZN"
    },
    {
      symbol: "TSLA",
      price: "3000",
      interval: "1d",
      exchange: "NYSE",
      id: "TSLA",
    }
  ]);
  const [stockCount, setStockCount] = useState(0);
  // const [symbol, setSymbol] = useState("");


  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addCard(value);
    setValue("");
  };

  const addCard = symbol => {
    const newCards = setCards([...cards, { symbol }]);
    setCards(newCards);
  };

  const removeCard = id => {
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
            <button class="button is-link" onClick={handleSubmit}>Add Stock</button>
            {/* <button class="button is-danger ml-5" onClick={() => setCards([])}>Clear Stocks</button> */}
            <input
              class="input is-rounded ml-5"
              type="text"
              placeholder="Rounded input"
              onChange={e => setValue(e.target.value)}
              onSubmit={handleSubmit}
            />
          </div>
          <div class="block"></div>

          <div class="columns features">
            {cards.map((card, id) => (
              <Card
                key={id}
                id={id}
                symbol={card.symbol}
                price={card.price}
                interval={card.interval}
                exchange={card.exchange}
                removeCard={removeCard}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default CardSection;
