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
        <div classname="News" id="NewsSection">
            {/* Navigation */}
            <header className="app-header">
                <Nav toggleTheme={toggleTheme} />
            </header>
            <div class="block"></div>

            {/* Column Layout */}
            <div class="columns is-mobile">
                <div class="column is-3">
                </div>
                <div class="column is-6">
                    <h2 class="title" id="about-title">Form</h2>
                    <br />
                    <p id="about-title"> </p>
                    {/* <img src={form} alt="logo" id="about-picture"/> */}
                    <picture alt="logo" id="about-picture">
                        <source srcSet={formWeb} type="image/webp" />
                        <source srcSet={form} type="image/jpeg" />
                        <img src={form} alt="Alt text" />
                    </picture>
                    <br />
                    <br />
                    <p>Enter the symbol of the stock (amzn for Amazon, etc),
                        or the name of the stock to use the autocomplete to get the stock symbol.
                        Then click the add stock button, or the enter key on the keyboard to add the stock to the dashboard.
                        Enter the symbol or name of the stock you wish to view into the filter bar.
                        You can also enter a symbol, followed by a comma or space to filter multiple stocks to view.
                        Then hit enter on the keyboard, or click the filter button to view the stocks.
                        Use the dropdown menu to sort the stocks by ascending or descending price difference by clicking either button.
                        Then click the sort button to sort the stocks.
                    </p>
                    <br />
                    <br />
                    <h2 class="title" id="about-title">Stock Card</h2>
                    <br />
                    <p id="about-title"> </p>
                    {/* <img src={stock} alt="logo" id="about-picture" /> */}
                    <picture alt="logo" id="about-picture">
                        <source srcSet={stockWeb} type="image/webp" />
                        <source srcSet={stock} type="image/jpeg" />
                        <img src={stock} alt="Alt text" />
                    </picture>
                    <br />
                    <br />
                    <p>The favorite button will add it to the favorites list and store it in either the gainers or losers.
                        The technical graph and simple graph buttons will swap between the two modes available.</p>
                    <br />
                    {/* <img src={technical} alt="logo" id="about-picture" /> */}
                    <picture alt="logo" id="about-picture">
                        <source srcSet={technicalWeb} type="image/webp" />
                        <source srcSet={technical} type="image/jpeg" />
                        <img src={technical} alt="Alt text" />
                    </picture>
                    <br />
                    <br />
                    <p>The technical chart will display the volume and price change of a stock.
                    </p>
                    <br />
                    <br />
                    {/* <img src={time} alt="logo" id="about-picture" /> */}
                    <picture alt="logo" id="about-picture">
                        <source srcSet={timeWeb} type="image/webp" />
                        <source srcSet={time} type="image/jpeg" />
                        <img src={time} alt="Alt text" />
                    </picture>
                    <br />
                    <br />
                    <p>Click on any of the different timeline options to change the time frame of the stock.
                        From 30 minutes to 2 and a half years. The Update button will get the latest stock data.
                    </p>
                    <br />
                    <br />
                    {/* <img src={indicators} alt="logo" id="about-picture" /> */}
                    <picture alt="logo" id="about-picture">
                        <source srcSet={indicatorsWeb} type="image/webp" />
                        <source srcSet={indicators} type="image/jpeg" />
                        <img src={indicators} alt="Alt text" />
                    </picture>
                    <br />
                    <br />
                    <p>Click on any of the different indicators to get and display the corresponding technical indiator.
                    </p>
                    <p>The view button will only display that stock.</p>
                    <br />
                    <ul>
                        <li>SMA: A simple moving average (SMA) calculates the average of a selected range of prices,
                            usually closing prices, by the number of periods in that range. </li>
                        <br />
                        <li>EMA: An exponential moving average (EMA) is a type of moving average (MA)
                            that places a greater weight and significance on the most recent data points.
                            Different Day lengths are used such as 10-day, 50-day, or 200-day averages.</li>
                        <br />
                        <li>RSI: The relative strength index (RSI) is a momentum indicator used in technical
                            analysis that measures the magnitude of recent price changes to evaluate overbought
                            or oversold conditions in the price of a stock or other asset.
                            An asset is usually considered overbought when the RSI is above
                            70% and oversold when it is below 30%.</li>
                        <br />
                        <li>MACD: Moving average convergence divergence (MACD) is a trend-following momentum indicator
                            that shows the relationship between two moving averages of a security’s price.
                            The MACD is calculated by subtracting the 26-period
                            exponential moving average (EMA) from the 12-period EMA.
                            The result of that calculation is the MACD line.
                            A nine-day EMA of the MACD called the "signal line,"
                            is then plotted on top of the MACD line,
                            which can function as a trigger for buy and sell signals.
                            Traders may buy the security when the MACD crosses above its signal line
                            and sell—or short—the security when the MACD crosses below the signal line. </li>
                        <br />
                        <li>BBANDS: A Bollinger Band® is a technical analysis tool defined by a set of trendlines
                            plotted two standard deviations (positively and negatively) away from a simple moving
                            average (SMA) of a security's price, but which can be adjusted to user preferences.
                            Many traders believe the closer the prices move to the upper band, the more overbought the market,
                            and the closer the prices move to the lower band, the more oversold the market.
                            The squeeze is the central concept of Bollinger Bands®. When the bands come close together,
                            constricting the moving average, it is called a squeeze.
                            A squeeze signals a period of low volatility and is considered by traders to be a
                            potential sign of future increased volatility and possible trading opportunities.
                            Conversely, the wider apart the bands move,
                            the more likely the chance of a decrease in volatility and the greater the
                            possibility of exiting a trade. </li>
                        <br />
                        <li>STOCH: A stochastic oscillator is a momentum indicator comparing a particular
                            closing price of a security to a range of its prices over a certain period of time.
                            Traditionally, readings over 80 are considered in the overbought range,
                            and readings under 20 are considered oversold.</li>
                    </ul>
                    <br />
                    <br />
                    <h2 class="title" id="about-title">Lists</h2>
                    <br />
                    <p id="about-title"> </p>
                    {/* <img src={createList} alt="logo" id="about-picture" /> */}
                    <picture alt="logo" id="about-picture">
                        <source srcSet={createListWeb} type="image/webp" />
                        <source srcSet={createList} type="image/jpeg" />
                        <img src={createList} alt="Alt text" />
                    </picture>
                    <br />
                    <br />
                    <p>On the right side of the screen, you can enter the name of the list
                        you want to create and click the plus button, or the enter key, to add the list to your profile.
                        The arrow can also be pressed to hide the entire right menu.</p>
                    <br />
                    {/* <img src={lists} alt="logo" id="about-picture" /> */}
                    <picture alt="logo" id="about-picture">
                        <source srcSet={listsWeb} type="image/webp" />
                        <source srcSet={lists} type="image/jpeg" />
                        <img src={lists} alt="Alt text" />
                    </picture>
                    <br />
                    <br />
                    <p>View the favorites and custom lists on the right side of the screen.
                        You can delete stocks from lists, and delete the lists here.</p>
                </div>
                <div class="column is-3" id="SideMenu">
                </div>
            </div>

            <div className="homeFooter">
                <Footer />
            </div>

        </div >
    );
}

export default About;
