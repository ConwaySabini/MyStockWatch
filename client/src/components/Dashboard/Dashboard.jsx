import './Dashboard.css';

import Nav from '../Nav/Nav';
import Panel from '../Panel/Panel';
import Footer from '../Footer/Footer';
import StockContextProvider from '../../context/StockContext';
import StockForm from '../StockForm/StockForm';
import Menu from '../Menu/Menu';

function Dashboard() {


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
                <StockForm />
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

export default Dashboard;
