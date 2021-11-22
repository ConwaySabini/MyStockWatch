import './Dashboard.css';
import { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import StockContextProvider from '../../context/StockContext';
import StockHub from '../StockHub/StockHub';
import Menu from '../Menu/Menu';
const axios = require('axios').default;

// Component for the dashboard of the application providing the main functionality
function Dashboard({ user, toggleTheme, theme }) {
  // user Id for the user
  const [userId, setUserId] = useState('');
  // server url to update user
  const CREATE_USER = process.env.REACT_APP_CREATE_USER;
  // server url to get user
  let GET_USER = process.env.REACT_APP_GET_USER;

  if (user !== undefined) {
    GET_USER = process.env.REACT_APP_GET_USER + user.email;
  }

  // Check if user exists and creat a new user if they do not exist
  useEffect(() => {
    const checkForUser = async () => {
      try {
        // fetch the stock data 
        const response = await axios.get(GET_USER);
        // handle error
        if (response.data.user === null) {
          console.log("No user has been created");
          // create the new user
          //const name = user.name.split(' ');
          const firstName = "first";
          const lastName = "last";
          const type = 'consumer';
          const email = user.email;
          const password = "placeholder";

          const userResponse = await axios.put(CREATE_USER,
            { userId: userId, firstName: firstName, lastName: lastName, type: type, email: email, password: password });
          if (userResponse.data.user === null) {
            console.log("error creating new user");
          } else {
            console.log("created new user");
            setUserId(userResponse.data.user._id);
          }
        } else {
          // user already exists so set the id
          setUserId(response.data.user._id);
        }
        // handle error
      } catch (error) {
        console.error(error);
      }
    }
    if (user !== undefined) {
      checkForUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user !== undefined && userId !== '') {
    return (
      <StockContextProvider>
        <div className="Dashboard">
          {/* Navigation */}
          <header className="app-header">
            <Nav toggleTheme={toggleTheme} theme={theme} />
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
                  <StockHub user={userId} />
                  <div class="block"></div>
                </div>
              </section>
            </div>
            {/* Sidebar for favorites */}
            <div class="column is-2" id="SideMenu">
              <Menu user={userId} />
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
