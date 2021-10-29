// Moving Average Convergence Divergence Extended(MACDEXT) 
// gives greater control over MACD input parameters. MACDEXT has an unstable period ~ 100.
const MACD = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/macdext',
  params: {
    interval: '1min',
    symbol: 'AAPL',
    slow_period: '26',
    fast_ma_type: 'SMA',
    outputsize: '30',
    fast_period: '12',
    slow_ma_type: 'SMA',
    signal_period: '9',
    format: 'json',
    series_type: 'close',
    signal_ma_type: 'SMA'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Simple Moving Average(SMA) is an arithmetic moving average calculated by adding 
// the latest closing prices and then dividing them by the number of time periods.
const SMA = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/sma',
  params: {
    symbol: 'AAPL',
    interval: '1min',
    series_type: 'close',
    format: 'json',
    outputsize: '30',
    time_period: '9'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Exponential Moving Average(EMA) places greater importance on recent data points than the normal Moving Average(MA).
const EMA = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/ema',
  params: {
    interval: '1min',
    symbol: 'AAPL',
    time_period: '9',
    outputsize: '30',
    format: 'json',
    series_type: 'close'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Bollinger Bands®(BBANDS) are volatility bands located above and below a moving average. 
// The volatility size parameter depends on standard deviation.
const BBANDS = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/bbands',
  params: {
    interval: '1min',
    symbol: 'AAPL',
    format: 'json',
    outputsize: '30',
    time_period: '20',
    ma_type: 'SMA',
    series_type: 'close',
    sd: '2'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Relative Strength Index(RSI) is a momentum indicator, 
// which calculates the magnitude of a price change to assess 
// the overbought and oversold conditions in the price of an asset.
const RSI = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/rsi',
  params: {
    symbol: 'AAPL',
    interval: '1min',
    outputsize: '30',
    series_type: 'close',
    time_period: '14',
    format: 'json'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Stochastic Oscillator(STOCH) is used to decide if the price trend is strong.
const STOCH = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/stoch',
  params: {
    interval: '1min',
    symbol: 'AAPL',
    outputsize: '30',
    slow_d_period: '3',
    format: 'json',
    fast_k_period: '14',
    slow_dma_type: 'SMA',
    slow_kma_type: 'SMA',
    slow_k_period: '1'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// On Balance Volume(OBV) is a momentum indicator, which uses volume flow to forecast upcoming price changes.
const OBV = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/obv',
  params: {
    interval: '1min',
    symbol: 'AAPL',
    series_type: 'close',
    outputsize: '30',
    format: 'json'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Chaikin A/D Line(AD) calculates the Advance/Decline of an asset. 
// This indicator belongs to the group of Volume Indicators.
const AD = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/ad',
  params: { symbol: 'AAPL', interval: '1min', format: 'json', outputsize: '30' },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Average Directional Index(ADX) is used to decide if the price trend is strong.
const ADX = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/adx',
  params: {
    interval: '1min',
    symbol: 'AAPL',
    time_period: '14',
    outputsize: '30',
    format: 'json'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

// Aroon Indicator(AROON) is used to identify if the price is trending. 
// It can also spot the beginning of a new trend and its strength.
const AROON = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/aroon',
  params: {
    interval: '1min',
    symbol: 'AAPL',
    outputsize: '30',
    time_period: '14',
    format: 'json'
  },
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '4543d16204msh97b0f60c7a436c0p18cc93jsnccd821077011'
  }
};

const TA = { MACD, SMA, EMA, BBANDS, RSI, STOCH, OBV, AD, ADX, AROON };

export default TA;
