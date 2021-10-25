import './News.css';
import Nav from '../Nav/Nav';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import { useState, useEffect } from "react";
const axios = require('axios').default;

// Component to display the news cards
function News() {
  const [news, setNews] = useState([]);

  // News API
  const BingNewsOptions = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: { textFormat: 'Raw', safeSearch: 'Off', category: 'Business' },
    headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

  // More Trending News from API
  const SeekingAlphaOptions = {
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/news/list-trending',
    headers: {
      'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };


  // useEffect(() => {

  // }, []);

  // Fetches the stock data with the symbol and displays is in a graph
  const addNewsData = async () => {
    try {
      // fetch the data
      const BingResponse = await axios.request(BingNewsOptions);
      //const response = await axios.request(SeekingAplphaOptions);
      // handle error
      if (BingResponse.data.status === "error") {
        console.log(BingResponse.data.message);
      } else {
        //TODO set the data to the state
        let articles = [];
        for (const article of BingResponse.data.value) {
          articles.push(article);
        }
        console.log(articles);
        setNews(...news, ...articles);
      }
      // handle error
    } catch (error) {
      console.error(error);
    }
  }

  addNewsData();

  //TODO make each set of cards a component???
  return (
    <div classname="News" id="NewsSection">
      {/* Navigation */}
      <header className="app-header">
        <Nav />
      </header>
      <div class="block"></div>
      {/* Column Layout */}
      <section class="section">
        <div class="columns is-mobile">
          <div class="column is-2">
          </div>
          <div class="column is-8">
            {/* Layout to add stocks and individual cards for stocks */}
            <div class="columns is-mobile">
              <div class="column is-4">
                <Card article={news[0]} />
                <Card article={news[3]} />
                <Card article={news[6]} />
                <Card article={news[9]} />
              </div>
              <div class="column is-4">
                <Card article={news[1]} />
                <Card article={news[4]} />
                <Card article={news[7]} />
                <Card article={news[10]} />
              </div>
              <div class="column is-4">
                <Card article={news[2]} />
                <Card article={news[5]} />
                <Card article={news[8]} />
                <Card article={news[11]} />
              </div>
            </div>
          </div>
          <div class="column is-2" id="SideMenu">
          </div>
        </div>
      </section>
      <div className="homeFooter">
        <Footer />
      </div>

    </div>
  );
}

export default News;
