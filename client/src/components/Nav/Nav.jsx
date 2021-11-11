import './Nav.css';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../Profile/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { useTheme } from "../../context/ThemeContext";

//TODO add navbar links to hamburger menu

// Component to render the navigation bar
function Nav() {
  const { logout, loginWithRedirect } = useAuth0();

  return (
    <div className="navigation">
      <nav class="navbar" role="navigation" aria-label="main navigation" id="navigation-bar">
        <div class="navbar-brand">
          <a class="navbar-item" href="/dashboard/#title">
            <i class="fas fa-chart-line fa-2x"></i>
            <a class="nav-title fa-2x" href="/dashboard/#title">
              MyStockWatch
            </a>
            {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
          </a>
          <a href="burger"
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/home">
              Home
            </a>
            <a class="navbar-item" href="/dashboard">
              Dashboard
            </a>
            <a class="navbar-item" href="/news">
              News
            </a>
            {/* <a class="navbar-item" href="about">
              About
            </a> */}
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button class="button is-primary mt-2 ml-2 mb-2" onClick={() => logout()}>
                  <strong>Log Out</strong>
                </button>
              </div>
              {/* <Profile></Profile> */}
            </div>
          </div>
        </div>
      </nav >

    </div >
  );
}

export default Nav;
