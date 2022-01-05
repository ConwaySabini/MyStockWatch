import React from 'react';
import './StockForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const StockForm = ({ showHero, toggleHero, handleSubmit, loading,
    confirmClear, symbol, handleChange, handleFilter, filterSymbol,
    handleFilterChange, clearFilters, handleSort,
    setDescendingTrue, setDescendingFalse }) => {

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
                        <button class="button is-link ml-2" onClick={handleSubmit} disabled={loading}>Add Stock</button>
                        <button class="button is-danger ml-5" onClick={confirmClear} disabled={loading}>
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
                                    disabled={loading}
                                />
                            </div>
                        </form>
                    </div>
                    <div class="column is-3">
                        <button class="button is-link ml-2" onClick={handleFilter} disabled={loading}>Filter</button>
                        <button class="button is-danger ml-5" onClick={clearFilters} disabled={loading}>
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
                                disabled={loading}
                            />
                        </form>
                    </div>
                    <div class="column is-4">
                        <button class="button is-link ml-4 mr-4" onClick={handleSort} disabled={loading}>Sort</button>
                        <div class="dropdown is-hoverable ml-4">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" disabled={loading} id="form-button">
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
                                            disabled={loading}>
                                            Ascending
                                        </button>
                                        <button
                                            class="button is-link mt-4"
                                            id="dropdown-buton"
                                            onClick={setDescendingTrue}
                                            disabled={loading}>
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
}

export default StockForm;
