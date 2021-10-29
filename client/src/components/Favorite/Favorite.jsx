import './Favorite.css'
import React, { useContext } from 'react'
import { StockContext } from "../../context/StockContext";

// Component to display the individual favorite stock in the menu
function Favorite({ favorite }) {
  const { removeFavorite } = useContext(StockContext);
  let price = favorite.data.values[0].close;
  price = parseFloat(price).toFixed(2);

  // Display stocks that have gained in value
  if (favorite.percentChange > 0) {
    return (
      <section>
        <div className="FavoriteStock mt-4">
          <li className="green">
            <article class="message is-primary">
              <div class="message-body">
                {favorite.symbol}: {favorite.percentChange}%
                <button class="button is-small is-danger ml-6 mt-2" onClick={() => removeFavorite(favorite.id)}>Delete</button>
                <br />
                Price: {price}
              </div>
            </article>
          </li>
        </div>
      </section>
    );
    // Display stocks that have lost value
  } else {
    return (
      <section>
        <div className="FavoriteStock mt-4">
          <li className="red">
            <article class="message is-danger">
              <div class="message-body">
                {favorite.symbol}: {favorite.percentChange}%
                <button class="button is-small is-danger ml-6 mt-2" onClick={() => removeFavorite(favorite.id)}>Delete</button>
                <br />
                Price: {price}
              </div>
            </article>
          </li>
        </div>
      </section>
    );
  }

}

export default Favorite;
