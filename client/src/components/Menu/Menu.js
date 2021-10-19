import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from './../Favorite/Favorite';

function Menu() {
  const { favorites, removeFavorite } = useContext(StockContext);

  return (
    <div>
      <aside class="menu">
        <p class="menu-label">
          Gainers
        </p>
        <ul class="menu-list">
          <li><a>Stock2</a></li>
          <li><a>Stock1</a></li>
        </ul>
        <p class="menu-label">
          Losers
        </p>
        <ul class="menu-list">

        </ul>
        <p class="menu-label">
          Favorites
        </p>
        {favorites.length ? (
          <div className="list">
            <ul class="menu-list">
              {favorites.map(favorite => {
                return <Favorite favortie={favorite} key={favorite.id} />;
              })}
            </ul>
          </div>
        ) : (
          <div className="no-favorites">No Favorites</div>
        )}
      </aside>
    </div>
  );
}




export default Menu;
