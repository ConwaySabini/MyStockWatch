import React, { useContext } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from '../Favorite/Favorite';

// Component to display all favorite stocks
function Menu() {
  const { favorites, clearFavorites } = useContext(StockContext);
  let index = 0;
  let gainers = [];
  let losers = [];

  for (let favorite of favorites) {
    gainers[index] = favorite;
    losers[index] = favorite;
    index++;
  }
  gainers.sort((a, b) => b.percentChange - a.percentChange);
  losers.sort((a, b) => a.percentChange - b.percentChange);
  gainers = gainers.filter(gainer => gainer.percentChange > 0);
  losers = losers.filter(loser => loser.percentChange < 0);

  return (
    <div>
      <aside class="menu">
        <p class="menu-label">
          <strong>Gainers</strong>
          {gainers.length ? (
            <div className="list">
              <ul class="menu-list">
                {gainers.map(favorite => {
                  return <Favorite favorite={favorite} key={favorite.id} />;
                })}
              </ul>
            </div>
          ) : (
            <div className="no-favorites">No Gainers</div>
          )}
        </p>
        <p class="menu-label">
          <strong>Losers</strong>
          {losers.length ? (
            <div className="list">
              <ul class="menu-list">
                {losers.map(favorite => {
                  return <Favorite favorite={favorite} key={favorite.id} />;
                })}
              </ul>
            </div>
          ) : (
            <div className="no-favorites">No Gainers</div>
          )}
        </p>
        <ul class="menu-list">

        </ul>
        <p class="menu-label">
          <strong>Favorites</strong>

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
        </p>
        <button class="button is-danger ml-4 pr-4 pl-4 mt-5 mb-2" onClick={() => clearFavorites()}>Clear Favorites</button>
      </aside>
    </div>
  );
}




export default Menu;
