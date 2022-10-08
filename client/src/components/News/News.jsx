import './News.css';
import Nav from '../Nav/Nav';
import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import { useState, useEffect } from "react";
const axios = require('axios').default;

// Component to display the news cards
function News({ toggleTheme }) {
    // array of news articles
    const [news, setNews] = useState([]);
    // symbol of the stock to be searched
    const [symbol, setSymbol] = useState('');
    // when the page is loading some actions are disabled
    const [loading, setLoading] = useState(false);
    // type of news to be displayed (individual or trending)
    const [type, setType] = useState('trending');

    // News API
    const BingNewsOptions = {
        method: 'GET',
        url: process.env.REACT_APP_NEWS_URL,
        params: { textFormat: 'Raw', safeSearch: 'Off', category: 'Business' },
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-host': process.env.REACT_APP_NEWS_HOST,
            'x-rapidapi-key': process.env.REACT_APP_NEWS_KEY
        }
    };

    const SeekingAlphaIndividual = {
        method: 'GET',
        url: process.env.REACT_APP_NEWS_SYMBOL_URL,
        params: { id: `${symbol}`, size: '20', until: '0' },
        headers: {
            'x-rapidapi-host': process.env.REACT_APP_NEWS_SYMBOL_HOST,
            'x-rapidapi-key': process.env.REACT_APP_NEWS_SYMBOL_KEY
        }
    };

    // Fetches the stock data with the symbol and displays is in a graph
    const addNewsData = async () => {
        try {
            // fetch the data
            const response = await axios.request(BingNewsOptions);
            // handle error
            if (response.data.status === "error") {
                console.log(response.data.message);
            } else {
                let articles = [];
                for (const article of response.data.value) {
                    articles.push(article);
                }
                setNews(articles);
            }
            // handle error
        } catch (error) {
            console.error(error);
        }
    }

    const addNewsForSymbol = async () => {
        try {
            // fetch the data
            const response = await axios.request(SeekingAlphaIndividual);
            // handle error
            if (response.data.status === "error") {
                console.log(response.data.message);
            } else {
                // if (response.data.errors.length > 0) {
                //     return;
                // }
                let articles = [];
                for (const article of response.data.data) {
                    articles.push(article);
                }
                setNews(articles);
            }
            // handle error
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        if (type === 'trending') {
            addNewsData();
        }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (news.length === 20) {
            setType('individual');
        } else {
            setType('trending');
        }
        setLoading(false);
    }, [news]);

    // Add the news data for the current symbol in input bar
    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        addNewsForSymbol();
    }

    // Change symbol state to match with the input 
    const handleChange = (e) => {
        e.preventDefault();
        setSymbol(e.target.value);
    }

    // set the articles back to trending news
    const clear = e => {
        e.preventDefault();
        setLoading(true);
        addNewsData();
    }

    if (loading) {
        return (
            <div></div>
        );
    } else {
        return (
            <div classname="News" id="NewsSection">
                {/* Navigation */}
                <header className="app-header">
                    <Nav toggleTheme={toggleTheme} />
                </header>
                <div class="block"></div>

                {/* Column Layout */}
                <div class="columns is-mobile">
                    <div class="column is-2">
                    </div>
                    <div class="column is-8">
                        <div className="button-and-forms mt-4">
                            <div class="columns">
                                <div class="column is-6">
                                    <section class="hero is-link" id="hero-dash">
                                        <div class="hero-body">
                                            <p class="subtitle" id="hero-color">
                                                Enter the symbol and click the <strong id="hero-color">Add News button or Enter</strong>, to get news pertaining to the stock.
                                            </p>
                                        </div>
                                    </section>
                                </div>
                                <div class="column is-6 mt-6">
                                    <button
                                        class="button is-link"
                                        onClick={handleSubmit}
                                        disabled={loading}>
                                        Add News
                                    </button>
                                    <button
                                        class="button is-danger ml-5"
                                        onClick={clear}
                                        disabled={loading}>
                                        Clear Filter
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
                            </div>
                        </div>
                        {/* Layout to add stocks and individual cards for stocks */}
                        <CardList key={news} news={news} type={type} />
                    </div>
                    <div class="column is-2" id="SideMenu">
                    </div>
                </div>

                <div className="homeFooter">
                    <Footer />
                </div>

            </div >
        );
    }

}

export default News;
