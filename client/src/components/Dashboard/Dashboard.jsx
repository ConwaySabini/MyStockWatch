import './Dashboard.css';
import { useAuth0 } from "@auth0/auth0-react";
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import StockContextProvider from '../../context/StockContext';
import StockHub from '../StockHub/StockHub';
import Menu from '../Menu/Menu';

// Component for the dashboard of the application providing the main functionality
function Dashboard() {
  // user authentication from auth0
  const { user, isAuthenticated } = useAuth0();
  if (user !== undefined) {
    return (
      <StockContextProvider>
        <div className="Dashboard">
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
                  <StockHub user={user} />
                  <div class="block"></div>
                </div>
              </section>
            </div>
            {/* Sidebar for favorites */}
            <div class="column is-2" id="SideMenu">
              <Menu user={user} />
            </div>
          </div>
          <div className="homeFooter">
            <Footer />
          </div>
        </div >
      </StockContextProvider>

    );
  } else {
    return null;
  }

}

export default Dashboard;
