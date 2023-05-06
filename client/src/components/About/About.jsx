import './About.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import stock from '../../Images/stock1.png';
import stockWeb from '../../Images/stock1.webp';
import form from '../../Images/Form.png';
import formWeb from '../../Images/Form.webp';
import technical from '../../Images/technical.png';
import technicalWeb from '../../Images/technical.webp';
import time from '../../Images/time.png';
import timeWeb from '../../Images/time.png';
import lists from '../../Images/lists.png';
import listsWeb from '../../Images/lists.png';
import indicators from '../../Images/indicators.png';
import indicatorsWeb from '../../Images/indicators.webp';
import createList from '../../Images/create-list.png';
import createListWeb from '../../Images/create-list.webp';

// Component to display the news cards
function About({ toggleTheme }) {
  return (
    <div
      classname='News'
      id='NewsSection'
    >
      {/* Navigation */}
      <header className='app-header'>
        <Nav toggleTheme={toggleTheme} />
      </header>
      <div class='block'></div>

      {/* Column Layout */}
      <div class='columns is-mobile'>
        <div class='column is-3'></div>
        <div class='column is-6'>
          <h2
            class='title'
            id='about-title'
          >
            Form
          </h2>
          <br />
          <p id='about-title'> </p>
          {/* <img src={form} alt="logo" id="about-picture"/> */}
          <picture
            alt='logo'
            id='about-picture'
          >
            <source
              srcSet={formWeb}
              type='image/webp'
            />
            <source
              srcSet={form}
              type='image/jpeg'
            />
            <img
              src={form}
              alt='Alt text'
            />
          </picture>
          <br />
          <br />
          <p>
            Enter the symbol of the stock (amzn for Amazon, etc), or the name of
            the stock to use the autocomplete to get the stock symbol. Then
            click the add stock button, or the enter key on the keyboard to add
            the stock to the dashboard. Enter the symbol or name of the stock
            you wish to view into the filter bar. You can also enter a symbol,
            followed by a comma or space to filter multiple stocks to view. Then
            hit enter on the keyboard, or click the filter button to view the
            stocks. Use the dropdown menu to sort the stocks by ascending or
            descending price difference by clicking either button. Then click
            the sort button to sort the stocks.
          </p>
          <br />
          <br />
          <h2
            class='title'
            id='about-title'
          >
            Stock Card
          </h2>
          <br />
          <p id='about-title'> </p>
          {/* <img src={stock} alt="logo" id="about-picture" /> */}
          <picture
            alt='logo'
            id='about-picture'
          >
            <source
              srcSet={stockWeb}
              type='image/webp'
            />
            <source
              srcSet={stock}
              type='image/jpeg'
            />
            <img
              src={stock}
              alt='Alt text'
            />
          </picture>
          <br />
          <br />
          <p>
            The favorite button will add it to the favorites list and store it
            in either the gainers or losers. The technical graph and simple
            graph buttons will swap between the two modes available.
          </p>
          <br />
          {/* <img src={technical} alt="logo" id="about-picture" /> */}
          <picture
            alt='logo'
            id='about-picture'
          >
            <source
              srcSet={technicalWeb}
              type='image/webp'
            />
            <source
              srcSet={technical}
              type='image/jpeg'
            />
            <img
              src={technical}
              alt='Alt text'
            />
          </picture>
          <br />
          <br />
          <p>
            The technical chart will display the volume and price change of a
            stock.
          </p>
          <br />
          <br />
          {/* <img src={time} alt="logo" id="about-picture" /> */}
          <picture
            alt='logo'
            id='about-picture'
          >
            <source
              srcSet={timeWeb}
              type='image/webp'
            />
            <source
              srcSet={time}
              type='image/jpeg'
            />
            <img
              src={time}
              alt='Alt text'
            />
          </picture>
          <br />
          <br />
          <p>
            Click on any of the different timeline options to change the time
            frame of the stock. From 30 minutes to 2 and a half years. The
            Update button will get the latest stock data.
          </p>
          <br />
          <br />
          {/* <img src={indicators} alt="logo" id="about-picture" /> */}
          <picture
            alt='logo'
            id='about-picture'
          >
            <source
              srcSet={indicatorsWeb}
              type='image/webp'
            />
            <source
              srcSet={indicators}
              type='image/jpeg'
            />
            <img
              src={indicators}
              alt='Alt text'
            />
          </picture>
          <br />
          <br />
          <p>
            Click on any of the different indicators to get and display the
            corresponding technical indiator.
          </p>
          <p>The view button will only display that stock.</p>
          <br />
          <ul>
            <li>
              A Simple Moving Average (SMA) is a technical indicator used in
              financial analysis to track the price movement of a security or
              financial asset over a specific period of time. To calculate the
              SMA, the closing prices of the security for the period under
              consideration are added up and then divided by the number of
              periods. For example, a 10-day SMA would be calculated by adding
              the closing prices of the asset over the past 10 days and then
              dividing the sum by 10. The SMA helps smooth out short-term price
              fluctuations and can provide a clearer picture of the overall
              trend of the asset. It is often used in technical analysis to
              identify potential areas of support and resistance, as well as to
              determine potential buy and sell signals. Traders and analysts may
              use different SMA periods to analyze different time frames. For
              example, a short-term trader may use a 10-day or 20-day SMA to
              track short-term trends, while a long-term investor may use a
              50-day or 200-day SMA to track long-term trends. It is important
              to note that the SMA is a lagging indicator, meaning it is based
              on past data and does not predict future price movements.
              Therefore, it is usually used in conjunction with other technical
              indicators and fundamental analysis to make informed investment
              decisions.
            </li>
            <br />
            <li>
              Exponential Moving Average (EMA) is another technical analysis
              tool that is similar to Simple Moving Average (SMA) but gives more
              weight to recent price data. Like SMA, EMA is also used to track
              the price movement of a security or financial asset over a
              specific period of time. However, instead of giving equal weight
              to all price data points, EMA gives more weight to recent prices,
              which makes it more responsive to short-term price changes. To
              calculate EMA, a multiplier is applied to each period's closing
              price, with the multiplier value determined by the number of
              periods considered. The multiplier decreases exponentially as more
              periods are added, with greater weight given to recent prices. For
              example, to calculate a 10-day EMA, you would first calculate the
              simple moving average of the past 10 days' closing prices. Then,
              you would calculate the multiplier using the formula 2/(10+1) =
              0.1818. Finally, you would calculate the EMA using the formula:
              EMA = (closing price - EMA(previous day)) x multiplier +
              EMA(previous day) EMA can be used in a similar way to SMA, to
              identify areas of support and resistance and to determine
              potential buy and sell signals. However, because EMA gives more
              weight to recent prices, it can be more responsive to short-term
              price movements, making it a useful tool for short-term traders.
            </li>
            <br />
            <li>
              The Relative Strength Index (RSI) is a popular technical analysis
              tool used to measure the strength of a security's price action,
              and to identify potential buying and selling opportunities. The
              RSI is calculated by comparing the average gains and losses of a
              security over a specified time period, typically 14 days. The RSI
              is expressed as a percentage, with readings above 70 indicating
              that the security is overbought (i.e., it may be due for a price
              correction), while readings below 30 indicate that the security is
              oversold (i.e., it may be due for a price rebound). The RSI
              compares the magnitude of recent gains to recent losses, with the
              results plotted on a scale of 0 to 100. When the RSI is above 70,
              it suggests that the security has been overbought and may be due
              for a price correction. Conversely, when the RSI is below 30, it
              suggests that the security has been oversold and may be due for a
              price rebound.
            </li>
            <br />
            <li>
              Moving Average Convergence Divergence (MACD) is a popular
              technical analysis tool used to identify potential trend reversals
              and momentum shifts in a security or financial asset. MACD is
              calculated by subtracting a longer-term Exponential Moving Average
              (EMA) from a shorter-term EMA. The difference between the two EMAs
              is plotted as a histogram, and a signal line (typically a 9-day
              EMA) is also plotted on top of the histogram. The MACD line is
              calculated by subtracting the signal line from the histogram. The
              MACD is used to identify potential buying and selling
              opportunities, as well as to confirm trend reversals. When the
              MACD line crosses above the signal line, it is a bullish signal
              indicating that the security may be in an uptrend. Conversely,
              when the MACD line crosses below the signal line, it is a bearish
              signal indicating that the security may be in a downtrend. The
              MACD is also used to identify potential divergences between the
              MACD line and the price of the security. A bullish divergence
              occurs when the MACD line is trending higher while the price of
              the security is trending lower, which may suggest that the
              security is due for a price rebound. Conversely, a bearish
              divergence occurs when the MACD line is trending lower while the
              price of the security is trending higher, which may suggest that
              the security is due for a price correction.
            </li>
            <br />
            <li>
              Bollinger Bands (BBands) is a technical analysis tool that uses a
              set of lines plotted two standard deviations (typically) away from
              a simple moving average (SMA) to identify potential buying and
              selling opportunities. BBands consist of three lines: a middle
              band that is a simple moving average of the security's price over
              a specified period of time, and an upper and lower band that are
              plotted two standard deviations away from the middle band. The
              upper and lower bands represent the boundaries of the normal
              trading range for the security, and when the price of the security
              moves outside of these bands, it may suggest that the security is
              overbought or oversold and due for a price correction. When the
              price of the security moves above the upper band, it is considered
              overbought and may indicate a selling opportunity. Conversely,
              when the price of the security moves below the lower band, it is
              considered oversold and may indicate a buying opportunity. BBands
              can be used in conjunction with other technical indicators to
              confirm potential trend reversals or to identify potential areas
              of support and resistance. Traders may also use BBands to identify
              potential breakouts from a trading range or to determine stop-loss
              levels for their trades.
            </li>
            <br />
            <li>
              Stochastic Oscillator (STOCH) is a popular technical analysis tool
              used to measure the momentum of a security and to identify
              potential buying and selling opportunities. STOCH is calculated by
              comparing the current closing price of a security to its price
              range over a specified period of time, typically 14 days. The
              result is expressed as a percentage and plotted on a scale of 0 to
              100. Readings above 80 indicate that the security is overbought,
              while readings below 20 indicate that the security is oversold.
              The STOCH is composed of two lines: the %K line and the %D line.
              The %K line represents the current closing price of the security
              relative to its price range over a specified period of time, while
              the %D line is a moving average of the %K line. When the %K line
              crosses above the %D line, it is considered a bullish signal
              indicating that the security may be in an uptrend. Conversely,
              when the %K line crosses below the %D line, it is considered a
              bearish signal indicating that the security may be in a downtrend.
              Traders can use STOCH to confirm potential trend reversals or to
              identify potential areas of support and resistance.
            </li>
          </ul>
          <br />
          <br />
          <h2
            class='title'
            id='about-title'
          >
            Lists
          </h2>
          <br />
          <p id='about-title'> </p>
          {/* <img src={createList} alt="logo" id="about-picture" /> */}
          <picture
            alt='logo'
            id='about-picture'
          >
            <source
              srcSet={createListWeb}
              type='image/webp'
            />
            <source
              srcSet={createList}
              type='image/jpeg'
            />
            <img
              src={createList}
              alt='Alt text'
            />
          </picture>
          <br />
          <br />
          <p>
            On the right side of the screen, you can enter the name of the list
            you want to create and click the plus button, or the enter key, to
            add the list to your profile. The arrow can also be pressed to hide
            the entire right menu.
          </p>
          <br />
          {/* <img src={lists} alt="logo" id="about-picture" /> */}
          <picture
            alt='logo'
            id='about-picture'
          >
            <source
              srcSet={listsWeb}
              type='image/webp'
            />
            <source
              srcSet={lists}
              type='image/jpeg'
            />
            <img
              src={lists}
              alt='Alt text'
            />
          </picture>
          <br />
          <br />
          <p>
            View the favorites and custom lists on the right side of the screen.
            You can delete stocks from lists, and delete the lists here.
          </p>
        </div>
        <div
          class='column is-3'
          id='SideMenu'
        ></div>
      </div>

      <div className='homeFooter'>
        <Footer />
      </div>
    </div>
  );
}

export default About;
