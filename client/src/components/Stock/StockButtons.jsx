import './Stock.css'
import { useState, useContext } from "react";
import { StockContext } from "../../context/StockContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

//Component to render the buttons and handle changes to data
function StockButtons({ handleChart, loading, stock, setLoading, user, handleUpdate, handleStockModal,
    handleTADisplay, clearTechnicalAnalysis }) {
    // stock context api shared data across components
    const { removeStock, addFavorite, findFavorite, addStockToList, lists, removeStockFromList } = useContext(StockContext);
    // State to track which list to add the stock to
    const [list, setList] = useState("");
    // URLS to make API calls from the Context API
    // server url to update favorites
    const UPDATE_FAVORITES = process.env.REACT_APP_UPDATE_FAVORITES;
    // server url to update lists
    const UPDATE_LISTS = process.env.REACT_APP_UPDATE_LISTS;
    // server url to update stocks
    const UPDATE_STOCKS = process.env.REACT_APP_UPDATE_STOCKS;

    // When the user adds a favorite to their list update the list
    const handleFavorite = () => {
        setLoading(true);
        const favorite = findFavorite(stock.symbol);
        // Add the favorite to the list if it is defined
        if (favorite === undefined) {
            addFavorite(stock.symbol, stock.data, stock.percentChange, stock.timeline, UPDATE_FAVORITES, user);
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
        if (list !== "") {
            addStockToList(list, stock.symbol, UPDATE_LISTS, user);
        }
        setLoading(false);
    }

    // function to remove a stock from a list
    const removeFromList = () => {
        setLoading(true);
        if (list !== "") {
            removeStockFromList(list, stock.symbol, UPDATE_LISTS, user);
        }
        setLoading(false);
    }

    // function to remove the stock altogether
    const handleRemove = () => {
        setLoading(true);
        removeStock(stock.id, UPDATE_STOCKS, UPDATE_FAVORITES, UPDATE_LISTS, user);
        setLoading(false);
    }

    let i = 0;



    return (
        <div className="stock-buttons">
            <button
                className="favorite"
                class="button is-warning ml-2 mt-4 mb-2"
                onClick={() => handleFavorite()}>
                Favorite
            </button>
            <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(false)}>Technical Graph</button>
            <button class="button is-primary ml-2 mt-4 mb-2" onClick={() => handleChart(true)}>Simple Graph</button>
            <div class="dropdown is-hoverable ml-2 mt-4" >
                <div class="dropdown-trigger">
                    <button
                        class="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu3"
                        disabled={loading}
                        id="stock-dropdown">
                        <span id="dropdown-font">Lists</span>
                        <span class="icon is-small">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="sort-dropdown" role="menu">
                    <div class="dropdown-content" id="sort-dropdown">
                        <div class="dropdown-item">
                            {lists.length ? (
                                <div className="list">
                                    <ul>
                                        {lists.map(listCurr => {
                                            return (
                                                <li key={i++}>
                                                    <button
                                                        class="button is-link mt-2"
                                                        id="dropdown-buton"
                                                        onClick={() => handleListChange(listCurr.name)}
                                                        disabled={loading}>
                                                        {listCurr.name}
                                                    </button>
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
            <button
                className="delete-stock"
                class="button is-danger ml-3 pr-2 pl-5 mt-4 mb-2"
                onClick={() => handleRemove()}>
                <FontAwesomeIcon id="trash" icon={faTrashAlt} />
            </button>
            <br />
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('1min')}>30Min</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('5min')}>2.5H</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('15min')}>7.5H</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('30min')}>15H</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('1h')}>~1D</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('2h')}>~1W</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('1day')}>1M</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('1week')}>6M+</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate('1month')}>2.5Y</button>
            <button class="button is-primary ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleUpdate(stock.timeline)}>Update</button>
            <br></br>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTADisplay("SMA")}>SMA</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTADisplay("EMA")}>EMA</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTADisplay("RSI")}>RSI</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTADisplay("MACD")}>MACD</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTADisplay("BBANDS")}>BBANDS</button>
            <button class="button is-link ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleTADisplay("STOCH")}>STOCH</button>
            <button
                className="delete-stock"
                class="button is-danger ml-3 pr-4 pl-4 mt-4 mb-2"
                onClick={() => clearTechnicalAnalysis()}>
                Clear TA
            </button>
            <button class="button is-primary ml-3 pr-4 pl-4 mt-4 mb-2" onClick={() => handleStockModal(stock.symbol)}>View</button>
        </div >
    );
}

export default StockButtons;
