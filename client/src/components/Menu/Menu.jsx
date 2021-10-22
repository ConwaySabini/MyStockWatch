import React, { useContext, useEffect } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from '../Favorite/Favorite';

function Menu() {
  const { favorites, clearFavorites } = useContext(StockContext);

  return (
    <div>
      <aside class="menu">
        <p class="menu-label">
          <strong>Gainers</strong>
        </p>
        <ul class="menu-list">

        </ul>
        <p class="menu-label">
          <strong>Losers</strong>
        </p>
        <ul class="menu-list">

        </ul>
        <p class="menu-label">
          <strong>Favorites</strong>
        </p>
        {favorites.length ? (
          <div className="list">
            <ul class="menu-list">
              {favorites.map(favorite => {
                return <Favorite favorite={favorite} key={favorite.id} />;
              })}
            </ul>
          </div>
        ) : (
          <div className="no-favorites">No Favorites</div>
        )}
        <button class="button is-danger ml-4 pr-4 pl-4 mt-5 mb-2" onClick={() => clearFavorites()}>Clear Favorites</button>
      </aside>
    </div>
  );
}




export default Menu;
