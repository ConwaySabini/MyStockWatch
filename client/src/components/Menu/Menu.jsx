import './Menu.css';
import React, { useState, useContext } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from '../Favorite/Favorite';

// Component to display all favorite stocks
function Menu() {
  // use context api
  const { favorites, clearFavorites, addList, removeList, clearLists, getLists } = useContext(StockContext);
  // list name to add
  const [listName, setListName] = useState("");
  // list of lists
  const [lists, setLists] = useState(getLists());

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
    addList(name, []);
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
    setListName("");
  }

  // Clear all custom lists
  const handleClear = (e) => {
    e.preventDefault();
    clearLists();
  }

  //TODO debug
  // hide the list
  const hideList = (name) => {
    const list = document.getElementById(name);
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
            <i class="fas fa-plus-circle fa-2x mb-3 mr-5 mt-1" onClick={handleSubmit}></i>
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
        <button class="button is-danger" onClick={handleClear}>Clear All Lists</button>
        <p class="menu-label">
          <strong id="menu-label">Gainers</strong>
          <a onClientClick={() => hideList("gainers")}>
            <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
          </a>
          <p id="gainers">
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
          <a onClientClick={() => hideList("losers")}>
            <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
          </a>
          <p id="losers">
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
        </p>
        <p class="menu-label">
          <strong id="menu-label">Favorites</strong>
          <a onClientClick={() => hideList("favorites")}>
            <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
          </a>
          <p id="favorites">
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
        </p>
        <button class="button is-danger ml-4 pr-4 pl-4 mt-5 mb-2" onClick={() => clearFavorites()}>Clear Favorites</button>
        //TODO render lists here
      </aside>
    </div>
  );
}




export default Menu;
