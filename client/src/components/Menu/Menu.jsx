import './Menu.css';
import React, { useState, useContext } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from '../Favorite/Favorite';

// Component to display all favorite stocks
function Menu() {
  // use context api
  const { favorites, clearFavorites, addList, removeList } = useContext(StockContext);
  // list name to add
  const [listName, setListName] = useState("");

  let index = 0;
  let gainers = [];
  let losers = [];

  // get favorite stocks
  for (let favorite of favorites) {
    gainers[index] = favorite;
    losers[index] = favorite;
    index++;
  }
  // filter the stocks by price change
  gainers = gainers.filter(gainer => gainer.percentChange >= 0);
  losers = losers.filter(loser => loser.percentChange < 0);
  // Sort the favorite stocks by price change
  gainers.sort((a, b) => b.percentChange - a.percentChange);
  losers.sort((a, b) => a.percentChange - b.percentChange);


  // Add a new list with the name
  const addStockList = (name) => {
    //addList(name, []);
  }

  // Change symbol state to match with the input 
  const handleChange = (e) => {
    e.preventDefault();
    setListName(e.target.value);
  }

  // Add the stock data for the current symbol in input bar
  const handleSubmit = e => {
    e.preventDefault();
    addStockList(listName);
  }

  // hide the list
  const hideList = (name) => {
    var list = document.getElementById(name);
    if (list.style.display === "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  }

  return (
    <div>
      <aside class="menu">
        <form onSubmit={handleSubmit}>
          <a>
            <i class="fas fa-plus-circle fa-2x mb-3 mr-5 mt-1" onClick={addStockList(listName)}></i>
          </a>
          <input
            id="menu-input"
            class="input is-primary"
            type="text"
            placeholder="Create new list"
            onChange={handleChange}
            value={listName}
          />
        </form>
        <br />
        <p class="menu-label">
          <strong id="menu-label">Gainers</strong>
          <a>
            <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
          </a>
          <p>
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
        </p>
        <p class="menu-label">
          <strong id="menu-label">Losers</strong>
          <a>
            <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
          </a>
          {losers.length ? (
            <div className="list">
              <ul class="menu-list">
                {losers.map(favorite => {
                  return <Favorite favorite={favorite} key={favorite.id} />;
                })}
              </ul>
            </div>
          ) : (
            <div className="no-favorites">No Losers</div>
          )}
        </p>
        <p class="menu-label">
          <strong id="menu-label">Favorites</strong>
          <a>
            <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
          </a>
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
