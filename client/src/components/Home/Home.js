import './Home.css';

import CardSection from './../CardSection/CardSection';
import Nav from './../Nav/Nav';
import Panel from './../Panel/Panel';
import Footer from './../Footer/Footer';
import StockContextProvider from '../../context/StockContext';
import StockList from './../StockList/StockList';
import StockForm from './../StockForm/StockForm';
import Menu from './../Menu/Menu';

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

          <div class="column is-2">


          </div>

          <div class="column is-8">
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

          <div class="column is-2" id="SideMenu">
            <Menu />
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
