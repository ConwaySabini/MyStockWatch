import React, { useState, useContext } from 'react';
import { StockContext } from "../../context/StockContext";
import './StockForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios').default;

const StockForm = ({ confirmClear,
    calculatePercentChange, updateStocks,
    setUpdateStocks, setFilterSymbolsHub, loadingHub, trie }) => {

    // context api to modify data across components
    const { stocks, addStock, findSymbol, setNewStocks } = useContext(StockContext);

    // when the page is loading some actions are disabled
    const [loading, setLoading] = useState(false);
    // symbol of the stock to be searched
    const [symbol, setSymbol] = useState('');
    // array of symbols to filter from the stock list
    const [filterSymbols, setFilterSymbols] = useState([]);
    // contains the current symbols from the filter bar
    const [filterSymbol, setFilterSymbol] = useState('');
    // when sorting the stocks decide which direction to sort
    const [descending, setDescending] = useState(true);
    // flag for displaying the instructions
    const [showHero, setShowHero] = useState(true);
    // autocomplete suggestions
    const [autocomplete, setAutocomplete] = useState([]);

    // Axios options for getting stock data from 12 Data API
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_RAPIDAPI_TIME_URL,
        params: { interval: `${'1day'}`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
        }
    };

    // Fetches the stock data with the symbol and displays is in a graph
    const addStockData = async () => {
        setLoading(true);
        try {
            // fetch the data
            const response = await axios.request(options);
            // handle error
            if (response.data.status === "error") {
                setSymbol('');
                console.log(response.data.message);
                setLoading(false);
            } else {
                // get the stock and calculate the percent change over the time period
                const foundStock = findSymbol(symbol);
                if (foundStock === undefined) {
                    const percentChange = calculatePercentChange(response.data);
                    // add the stock to the list and context API
                    addStock(symbol, response.data, percentChange, '1day');
                }
                // cleanup
                setUpdateStocks(!updateStocks);
                setSymbol('');
                setLoading(false);
            }
            // handle error
        } catch (error) {
            console.error(error);
            setSymbol('');
            setLoading(false);
        }
    }

    //console.log("names", names);
    //console.log("trie", trie);

    // function to match the name of the company to the symbol
    // const matchName = (name, keyword) => {
    //     const size = keyword.length;
    //     name = name.substring(0, size);
    //     // return true if match and false if not
    //     if (name === keyword && size !== 0)
    //         return true;
    //     else
    //         return false;
    // };

    // Comparing each value in the array against the keyword
    const onSearch = value => {
        if (value !== " " && value !== "") {
            const results = trie.find(value);
            setAutocomplete(results);
        } else {
            setAutocomplete([]);
        }
        // add matched values to the autocomplete array
        // for (const item of names) {
        //     if (item.name !== undefined) {
        //         if (matchName(item.name, value)) {
        //             results.push(item);
        //         }
        //     }
        // }
        // console.log("results", results); 
    };

    // const cancelSearch = () => {
    //     setSymbol('');
    //     setAutocomplete([]);
    // };

    // function to hide the instructions
    const toggleHero = () => {
        setShowHero(!showHero);
    }

    // Clear all current filters that are applied
    const clearFilters = e => {
        setFilterSymbols([]);
        setFilterSymbolsHub([]);
    }

    // Set the sorting order to ascending
    const setDescendingFalse = () => {
        setDescending(false);
    }

    // Set the sorting order to descending
    const setDescendingTrue = () => {
        setDescending(true);
    }

    // Set the symbol of the stock/s to filter
    const handleFilterChange = (e) => {
        e.preventDefault();
        setFilterSymbol(e.target.value);
    }

    // Set the new stocks after filtering them
    const handleFilter = (e) => {
        e.preventDefault();
        setLoading(true);
        let splitSymbols = []
        // filter the symbols if there is a comma
        if (filterSymbol.includes(',')) {
            const noWhiteSpace = filterSymbol.replace(/\s+/g, '')
            splitSymbols = noWhiteSpace.split(',');
            // filter the symbols if there is only spaces
        } else {
            splitSymbols = filterSymbol.split(' ');
        }
        // Set the filter list with the newest filtered stocks
        setFilterSymbols([...filterSymbols, ...splitSymbols]);
        setFilterSymbolsHub([...filterSymbols, ...splitSymbols]);
        setLoading(false);
        setFilterSymbol('');
    }

    // Change symbol state to match with the input 
    const handleChange = (e) => {
        e.preventDefault();
        setSymbol(e.target.value);
        onSearch(e.target.value);
    }

    // Use the autocomplete to change the search
    const updateSearch = (text) => {
        setSymbol(text);
        setAutocomplete([]);
    }

    // Add the stock data for the current symbol in input bar
    const handleSubmit = e => {
        e.preventDefault();
        addStockData();
    }

    // Sort the list of stocks in ascending/descending order
    const handleSort = () => {
        let sortedStocks = [];

        let index = 0;
        for (let stock of stocks) {
            sortedStocks[index] = stock;
            index++;
        }
        // sort them in descending order
        if (descending) {
            sortedStocks.sort((a, b) => b.percentChange - a.percentChange);
            // sort them in ascending order
        } else {
            sortedStocks.sort((a, b) => a.percentChange - b.percentChange);
        }
        // set the new list of stocks
        setNewStocks(sortedStocks);
    }

    //render the results of the autocomplete
    const SearchPreview = ({ name, type, index, symbol, exchange }) => {
        return (
            <div
                id="search-preview"
                class="card"
                onClick={() => updateSearch(symbol)}
                className={`search-preview ${index === 0 ? "start" : ""}`
                }>
                <div class="card-content">
                    <div class="content">
                        {name} ({symbol}) ({exchange})
                    </div>
                </div>
            </div >
        );
    };

    const renderResults = autocomplete.map(({ type, name, symbol, exchange }, index) => {
        return (
            <SearchPreview
                key={index}
                index={index}
                type={type}
                name={name}
                symbol={symbol}
                exchange={exchange}
            />
        );
    });

    return (
        <div>
            {
                showHero ? (
                    <div>
                        <a onClick={() => toggleHero()} href="#instructions">
                            <FontAwesomeIcon id="angle-down-menu" icon={faAngleDown} size="2x" />
                        </a>
                        {/* Title and information about the dashboard */}
                        <section class="hero is-link" id="hero-dash">
                            <div class="hero-body" >
                                <p class="title" id="hero-color">
                                    Welcome to MyStockWatch
                                </p>
                                <p class="subtitle" id="hero-color">
                                    Enter the symbol and click the <strong id="hero-color">Add Stock button or Enter</strong>, to add the stock.
                                </p>
                                <h2 class="subtitle" id="hero-color">
                                    Enter a symbol or multiple symbols separated by a comma or space to filter the stocks. Then hit the
                                    <strong id="hero-color"> Filter button or Enter</strong>, to filter the stocks.
                                </h2>
                                <h2 class="subtitle" id="hero-color">
                                    Use the dropdown menu and select an option then press the
                                    <strong id="hero-color"> Sort button</strong>, to sort the stocks by change in price.
                                </h2>
                            </div>
                        </section>

                    </div >) :
                    (
                        <a onClick={() => toggleHero()} href="#instructions">
                            <FontAwesomeIcon id="angle-down-menu" icon={faAngleUp} size="2x" />
                        </a>
                    )
            }
            <div class="block" />
            {/* Forms and buttons to interact with the dashboard */}
            <div className="button-and-forms ml-6">
                <div class="columns">
                    <div class="column is-4">
                        <button class="button is-link ml-2" onClick={handleSubmit} disabled={loading || loadingHub}>Add Stock</button>
                        <button class="button is-danger ml-5" onClick={confirmClear} disabled={loading || loadingHub}>
                            Clear All Stocks
                        </button>

                        <form onSubmit={handleSubmit}>
                            <div className="stock-form" id="stock-search">
                                <input
                                    id="StockInput"
                                    type="text"
                                    placeholder="Enter Symbol..."
                                    value={symbol}
                                    onChange={handleChange}
                                    required
                                    class="input is-rounded is-link mt-4"
                                    disabled={loading || loadingHub}
                                />
                                {/* <button
                                    onClick={() => cancelSearch()}
                                    className={`cancel-btn ${symbol.length > 0 ? "active" : "inactive"}`}>
                                    x
                                </button> */}
                                <div className="search-results">{renderResults}</div>
                            </div>
                        </form>
                    </div>
                    <div class="column is-3">
                        <button class="button is-link ml-2" onClick={handleFilter} disabled={loading || loadingHub}>Filter</button>
                        <button class="button is-danger ml-5" onClick={clearFilters} disabled={loading || loadingHub}>
                            Clear All Filters
                        </button>
                        <form onSubmit={handleFilter}>
                            <input
                                id="FilterInput"
                                type="text"
                                placeholder="Enter Symbol to Filter"
                                value={filterSymbol}
                                onChange={handleFilterChange}
                                required
                                class="input is-rounded is-link mt-4"
                                disabled={loading || loadingHub}
                            />
                        </form>
                    </div>
                    <div class="column is-4">
                        <button class="button is-link ml-4 mr-4" onClick={handleSort} disabled={loading || loadingHub}>Sort</button>
                        <div class="dropdown is-hoverable ml-4">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" disabled={loading || loadingHub} id="form-button">
                                    <span>Ascending/Descending</span>
                                    <span class="icon is-small">
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="sort-dropdown" role="menu">
                                <div class="dropdown-content" id="sort-dropdown">
                                    <div class="dropdown-item">
                                        <button
                                            class="button is-link"
                                            id="dropdown-buton"
                                            onClick={setDescendingFalse}
                                            disabled={loading || loadingHub}>
                                            Ascending
                                        </button>
                                        <button
                                            class="button is-link mt-4"
                                            id="dropdown-buton"
                                            onClick={setDescendingTrue}
                                            disabled={loading || loadingHub}>
                                            Descending
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockForm;
