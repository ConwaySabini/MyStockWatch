//TODO integrate this with paid API or integrate more APISs to make more requests in a minute

// const optionsDaily = {
//   method: 'GET',
//   url: 'https://twelve-data1.p.rapidapi.com/time_series',
//   params: { interval: `1h`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
//   headers: {
//     'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
//     'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
//   }
// };

// const optionsWeekly = {
//   method: 'GET',
//   url: 'https://twelve-data1.p.rapidapi.com/time_series',
//   params: { interval: `2h`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
//   headers: {
//     'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
//     'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
//   }
// };

// const optionsMonthly = {
//   method: 'GET',
//   url: 'https://twelve-data1.p.rapidapi.com/time_series',
//   params: { interval: `1day`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
//   headers: {
//     'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
//     'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
//   }
// };

// const optionsBiYearly = {
//   method: 'GET',
//   url: 'https://twelve-data1.p.rapidapi.com/time_series',
//   params: { interval: `1month`, symbol: `${symbol}`, format: 'json', outputsize: '30' },
//   headers: {
//     'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
//     'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
//   }
// };



//TODO put in useEffect hook to get all data
// if (symbol !== '' &&
//     timeline !== '1day' &&
//     timeline !== '2h' &&
//     timeline !== '1h' &&
//     timeline !== '1day' &&
//     timeline !== '1month') {
//     changeStockData();
//   } else if (symbol !== '') {
//     const stock = findSymbol(symbol);
//     const percentChange = 0;
//     switch (timeline) {
//       default:
//         changeStockData();
//         break;
//       case '1month':
//         percentChange = calculatePercentChange(stock.dataYearly);
//         break;
//       case '1day':
//         percentChange = calculatePercentChange(stock.dataMonthly);
//         break;
//       case '2h':
//         percentChange = calculatePercentChange(stock.dataWeekly);
//         break;
//       case '1h':
//         percentChange = calculatePercentChange(stock.dataDaily);
//         break;
//     }
//     setLoading(true);
//     editStock(symbol, stock.data, stock.dataDaily, stock.dataWeekly, stock.dataMonthly, stock.dataYearly, percentChange, timeline, currentStock.id);
//     if (currentFavorite !== undefined) {
//       editFavorite(symbol, stock.data, stock.dataDaily, stock.dataWeekly, stock.dataMonthly, stock.dataYearly, percentChange, timeline, currentFavorite.id);
//     }
//     setSymbol('');
//     setLoading(false);
//   }





//   const addAllStockData = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.request(options);
//     const responseDaily = await axios.request(optionsDaily);
//     const responseWeekly = await axios.request(optionsWeekly);
//     const responseMonthly = await axios.request(optionsMonthly);
//     const responseBiYearly = await axios.request(optionsBiYearly);
//     if (response.data.status === "error" ||
//       responseDaily.data.status === "error" ||
//       responseWeekly.data.status === "error" ||
//       responseMonthly.data.status === "error" ||
//       responseBiYearly.data.status === "error") {
//       setSymbol('');
//       setLoading(false);
//     } else {
//       const foundStock = findSymbol(symbol);
//       if (foundStock === undefined) {
//         const percentChange = calculatePercentChange(response.data);
//         addStock(symbol, response.data, responseDaily.data, responseWeekly.data, responseMonthly.data, responseBiYearly.data, percentChange, timeline);
//       }
//       setSymbol('');
//       setLoading(false);
//     }
//   } catch (error) {
//     console.error(error);
//     setSymbol('');
//     setLoading(false);
//   }
// }

{/* <div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
      <span>Sort</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu3" role="menu" disabled={loading}>
    <div class="dropdown-content">
      <a href="#" class="dropdown-item">
        Listed Price
      </a>
      <a href="#" class="dropdown-item">
        Daily Price
      </a>
      <a href="#" class="dropdown-item">
        Weekly Price
      </a>
      <a href="#" class="dropdown-item">
        Monthly Price
      </a>
      <a href="#" class="dropdown-item">
        6 Month Price
      </a>
      <a href="#" class="dropdown-item">
        2.5 Year Price
      </a>
    </div>
  </div>
</div> */}
