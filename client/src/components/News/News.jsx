import './News.css';
import Nav from '../Nav/Nav';
import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import { useState, useEffect } from "react";
const axios = require('axios').default;

// { data":[20 items
//   0: {
//     5 items
//     "id": "3758156"
//     "type": "news"
//     "attributes": {
//       6 items
//       "publishOn": "2021-10-26T11:05:28-04:00"
//       "isLockedPro": false
//       "commentCount": 36
//       "gettyImage": {...
//       } 8 items
//       "themes": { } 0 items
//       "title": "Nvidia, Arista rise amid enthusiasm for Facebook's spending plans"
//     }
//     "relationships": {
//       5 items
//       "author": {
//         1 item
//         "data": {
//           2 items
//           "id": "54612473"
//           "type": "newsAuthorUser"
//         }
//       }
//       "sentiments": {
//         1 item
//         "data": [0 items
//         ]
//       }
//       "primaryTickers": {
//         1 item
//         "data": []0 items
//       }
//       "secondaryTickers": {
//         1 item
//         "data": [1 item
// 0: {
//             2 items
// "id": "146"
// "type": "tag"
//           }
//         ]
//       }
//       "otherTags": {
//         1 item
//         "data": []0 items
//       }
//     }
//     "links": {
//       1 item
//       "self": "/news/3758156-nvdia-arista-rise-amid-enthusiasm-for-facebooks-spending-plans"
//     }
//   }
// }



// Component to display the news cards
function News() {
  const [news, setNews] = useState([]);
  const [key, setKey] = useState("news");

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

  var SeekingAlphaIndividual = {
    method: 'GET',
    url: 'https://seeking-alpha.p.rapidapi.com/news/list',
    params: { id: 'aapl', size: '20', until: '0' },
    headers: {
      'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com',
      'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
    }
  };

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
        let articles = [];
        for (const article of BingResponse.data.value) {
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
    addNewsData();
    setKey("updatedNews");
  }, []);

  return (
    <div classname="News" id="NewsSection">
      {/* Navigation */}
      <header className="app-header">
        <Nav />
      </header>
      <div class="block"></div>
      {/* Column Layout */}

      <div class="columns is-mobile">
        <div class="column is-2">
        </div>
        <div class="column is-8">
          {/* Layout to add stocks and individual cards for stocks */}
          <CardList key={key} news={news} />
        </div>
        <div class="column is-2" id="SideMenu">
        </div>
      </div>

      <div className="homeFooter">
        <Footer />
      </div>

    </div >
  );
  //TODO make each set of cards a component???

}

export default News;
