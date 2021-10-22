import './Favorite.css'
import React, { useContext, useState, useEffect } from 'react'
import { StockContext } from "../../context/StockContext";

function Favorite({ favorite }) {
  const { removeFavorite, favorites } = useContext(StockContext);
  // const [myFavorites, setMyFavorites] = useState(favorites);

  if (favorite.percentChange > 0) {
    return (
      <section>
        <div className="FavoriteStock mt-4">
          <li className="green">
            <article class="message is-primary">
              <div class="message-body">
                {favorite.symbol}: {favorite.percentChange}%
                <button class="button is-danger mt-4" onClick={() => removeFavorite(favorite.id)}>Delete</button>
              </div>
            </article>
          </li>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="FavoriteStock mt-4">
          <li className="red">
            <article class="message is-danger">
              <div class="message-body">
                {favorite.symbol}: {favorite.percentChange}%
                <button class="button is-danger mt-4" onClick={() => removeFavorite(favorite.id)}>Delete</button>
              </div>
            </article>
          </li>
        </div>
      </section>
    );
  }

}

export default Favorite;
