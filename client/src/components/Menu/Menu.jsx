import './Menu.css';
import React, { useState, useContext, useEffect } from "react";
import { StockContext } from "../../context/StockContext";
import Favorite from '../Favorite/Favorite';
import RenderLists from './RenderLists';

// Component to display all favorite stocks
function Menu() {
  // use context api
  const { favorites, clearFavorites, addList, removeList, clearLists, getLists } = useContext(StockContext);
  // list name to add
  const [listName, setListName] = useState("");
  // list of lists
  const [lists, setLists] = useState([]);
  // list of lists to conditionally render in dropdown
  const [listsToRender, setListsToRender] = useState({});
  // state for first 3 lists to render
  const [renderGainers, setRenderGainers] = useState(true);
  const [renderLosers, setRenderLosers] = useState(true);
  const [renderFavorites, setRenderFavorites] = useState(true);

  useEffect(() => {
    setLists(getLists());
  }, []);

  useEffect(() => {
    let renderLists = {};
    for (const list of lists) {
      renderLists[list.name] = true;
    }
    setListsToRender(renderLists);
    console.log(lists);
  }, [lists]);

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

  // hide the list
  const hideList = (name) => {
    if (name === "gainers") {
      setRenderGainers(false);
    } else if (name === "losers") {
      setRenderLosers(false);
    } else if (name === "favorites") {
      setRenderFavorites(false);
    } else {
      let renderLists = listsToRender
      renderLists[name] = false;
      setListsToRender(renderLists);
    }
  }

  // show the list
  const showList = (name) => {
    if (name === "gainers") {
      setRenderGainers(true);
    } else if (name === "losers") {
      setRenderLosers(true);
    } else if (name === "favorites") {
      setRenderFavorites(true);
    } else {
      let renderLists = listsToRender
      renderLists[name] = true;
      setListsToRender(renderLists);
    }
  }

  return (
    <div>
      <aside class="menu">
        <form onSubmit={handleSubmit}>
          <a>
            <i class="fas fa-plus-circle fa-2x mb-2 mr-5 mt-1" onClick={handleSubmit}></i>
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
        <button class="button is-danger pr-4 pl-4 mb-2" onClick={() => clearFavorites()}>Clear Favorites</button>
        {
          renderGainers ? (
            <p class="menu-label">
              <strong id="menu-label">Gainers</strong>
              <a onClick={() => hideList("gainers")}>
                <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
              </a>
              <p id="gainers">
                {
                  gainers.length ? (
                    <div className="list">
                      <ul class="menu-list">
                        {gainers.map(favorite => {
                          return <Favorite favorite={favorite} key={favorite.id} />;
                        })}
                      </ul>
                    </div>
                  ) : (
                    <div className="no-favorites">No Gainers</div>
                  )
                }
              </p>
            </p>
          ) : (
            <p class="menu-label">
              <strong id="menu-label">Gainers</strong>
              <a onClick={() => showList("gainers")}>
                <i class="fas fa-angle-up fa-2x ml-4" aria-hidden="true"></i>
              </a>
            </p>
          )
        }
        {
          renderLosers ? (
            <p class="menu-label">
              <strong id="menu-label">Losers</strong>
              <a onClick={() => hideList("losers")}>
                <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
              </a>
              <p id="losers">
                {
                  losers.length ? (
                    <div className="list">
                      <ul class="menu-list">
                        {losers.map(favorite => {
                          return <Favorite favorite={favorite} key={favorite.id} />;
                        })}
                      </ul>
                    </div>
                  ) : (
                    <div className="no-favorites">No Losers</div>
                  )
                }
              </p>
            </p>
          ) : (
            <p class="menu-label">
              <strong id="menu-label">Losers</strong>
              <a onClick={() => showList("losers")}>
                <i class="fas fa-angle-up fa-2x ml-4" aria-hidden="true"></i>
              </a>
            </p>
          )
        }
        {
          renderFavorites ? (
            <p class="menu-label">
              <strong id="menu-label">Favorites</strong>
              <a onClick={() => hideList("favorites")}>
                <i class="fas fa-angle-down fa-2x ml-4" aria-hidden="true"></i>
              </a>
              <p id="favorites">
                {
                  favorites.length ? (
                    <div className="list">
                      <ul class="menu-list">
                        {favorites.map(favorite => {
                          return <Favorite favorite={favorite} key={favorite.id} />;
                        })}
                      </ul>
                    </div>
                  ) : (
                    <div className="no-favorites">No Favorites</div>
                  )
                }
              </p>
            </p>
          ) : (
            <p class="menu-label">
              <strong id="menu-label">Favorites</strong>
              <a onClick={() => showList("favorites")}>
                <i class="fas fa-angle-up fa-2x ml-4" aria-hidden="true"></i>
              </a>
            </p>
          )
        }
        {
          lists.length ? (
            <div className="list">
              {lists.map(list => {
                if (listsToRender[list.name] === true) {
                  return <RenderLists list={list} hideList={hideList} listsToRender={listsToRender} />;
                } else {
                  return (
                    <p class="menu-label">
                      <strong id="menu-label">{list.name}</strong>
                      <a onClick={() => showList(list.name)}>
                        <i class="fas fa-angle-up fa-2x ml-4" aria-hidden="true"></i>
                      </a>
                    </p>
                  );
                }
              })}
            </div>
          ) : (
            <div className="no-favorites">No Custom Lists</div>
          )
        }
      </aside>
    </div>
  );
}




export default Menu;
