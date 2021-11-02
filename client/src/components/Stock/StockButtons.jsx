import { useState, useEffect, useContext } from "react";
import { StockContext } from "../../context/StockContext";

//Component to render the buttons and handle changes to data
function StockButtons({ handleChart, loading, handleTime, stock, setLoading }) {
  // stock context api shared data across components
  const { removeStock, addFavorite, findFavorite, addStockToList, lists, removeStockFromList } = useContext(StockContext);
  // State to track which list to add the stock to
  const [list, setList] = useState("");

  // When the user adds a favorite to their list update the list
  const handleFavorite = () => {
    setLoading(true);
    const favorite = findFavorite(stock.symbol);
    if (favorite === undefined) {
      addFavorite(stock.symbol, stock.data, stock.percentChange, stock.timeline);
    }
    setLoading(false);
  }

  // set the list to add the stock to
  const handleListChange = (name) => {
    setList(name);
  }

  // function to add a stock to a list
  const addToList = () => {
    setLoading(true);
    addStockToList(list, stock.symbol);
    setLoading(false);
  }

  // function to remove a stock from a list
  const removeFromList = () => {
    setLoading(true);
    removeStockFromList(list, stock.symbol);
    setLoading(false);
  }

  return (
    <div className="stock-buttons">
      <button className="favorite" class="button is-warning ml-2 mt-4 mb-2" onClick={() => handleFavorite()}>Favorite</button>
      <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(false)}>Technical Graph</button>
      <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(true)}>Simple Graph</button>
      <div class="dropdown is-hoverable ml-2 mt-4" >
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" disabled={loading} id="stock-dropdown">
            <span id="dropdown-font">Lists</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="sort-dropdown" role="menu">
          <div class="dropdown-content" id="sort-dropdown">
            <div class="dropdown-item">
              {lists.length ? (
                <div className="list">
                  <ul>
                    {lists.map(list => {
                      return (
                        <li>
                          <button class="button is-link mt-2" id="dropdown-buton" onClick={() => handleListChange(list.name)} disabled={loading}>{list.name}</button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : (
                <article class="message is-link">
                  <div class="message-body ">
                    <strong>No Lists</strong>
                  </div>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
      <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => addToList()}>Add To List</button>
      <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => removeFromList()}>Remove From List</button>
      <button className="delete-stock" class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2" onClick={() => removeStock(stock.id)}>
        <i className="fas fa-trash-alt"></i>
      </button>
      <br />
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1min')}>30Min</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('5min')}>2.5H</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('15min')}>7.5H</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('30min')}>15H</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1h')}>~1D</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('2h')}>~1W</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1day')}>1M</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1week')}>6M+</button>
      <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTime('1month')}>2.5Y</button>
    </div>
  );
}

export default StockButtons;
