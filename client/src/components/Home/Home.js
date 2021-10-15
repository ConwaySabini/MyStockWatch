import './Home.css';

import CardSection from './../CardSection/CardSection';
import Nav from './../Nav/Nav';
import Panel from './../Panel/Panel';
import Footer from './../Footer/Footer';
import StockContextProvider from '../../context/StockContext';
import StockList from './../StockList/StockList';
import StockForm from './../StockForm/StockForm';

const chart = require('chart.js');

function Home() {
  return (
    <StockContextProvider>
      <div className="Home">
        {/* Navigation */}
        <header className="app-header">
          <Nav />
        </header>
        <div class="block"></div>

        {/* Column Layout */}
        <div class="columns is-mobile">

          <div class="column is-2">is 2</div>

          <div class="column is-8">is 8
            {/* Layout to add stocks and individual cards for stocks */}
            <section class="section">
              <div class="container">

                <div class="block"></div>
                {/* <CardSection /> */}
                <StockForm />
                <div class="block"></div>
                <StockList />
                <div class="block"></div>
              </div>
            </section>
          </div>

          <div class="column is-2">
            <aside class="menu">
              <p class="menu-label">
                Gainers
              </p>
              <ul class="menu-list">
                <li><a>Dashboard</a></li>
                <li><a>Customers</a></li>
              </ul>
              <p class="menu-label">
                Losers
              </p>
              <ul class="menu-list">
                <li><a>Team Settings</a></li>
                <li>
                  <a class="is-active">Manage Your Team</a>
                  <ul>
                    <li><a>Members</a></li>
                    <li><a>Plugins</a></li>
                    <li><a>Add a member</a></li>
                  </ul>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
              </ul>
              <p class="menu-label">
                Favorites
              </p>
              <ul class="menu-list">
                <li><a>Payments</a></li>
                <li><a>Transfers</a></li>
                <li><a>Balance</a></li>
              </ul>
            </aside>
          </div>

        </div>
        <div className="homeFooter">
          <Footer />
        </div>
      </div >
    </StockContextProvider>
  );
}

export default Home;
