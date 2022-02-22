import './Nav.css';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// Component to render the navigation bar
function Nav({ toggleTheme, theme }) {
    const { logout } = useAuth0();
    const [isBurger, setIsBurger] = useState(false);

    return (
        <div className="navigation">
            <nav class="navbar" role="navigation" aria-label="main navigation" id="navigation-bar">
                <>
                    {
                        isBurger ? (
                            <>
                                <div class="navbar-brand" id="navbar-hover">
                                    <a class="navbar-item" href="/dashboard#title" >
                                        <FontAwesomeIcon icon={faChartLine} size="2x" />
                                        <a class="nav-title fa-2x" href="/dashboard#title">
                                            MyStockWatch
                                        </a>
                                        {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
                                    </a>

                                    <a
                                        href="#burger"
                                        role="button"
                                        class="navbar-burger showNav is-active"
                                        onClick={() => setIsBurger(!isBurger)}
                                        aria-label="menu"
                                        aria-expanded="false"
                                        id="burger"
                                    >
                                        <span aria-hidden="true" id="burger"></span>
                                        <span aria-hidden="true" id="burger"></span>
                                        <span aria-hidden="true" id="burger"></span>
                                    </a>
                                </div>
                                <div id="navigation-bar" class="navbar-menu is-active">
                                    <div class="navbar-start">
                                        <a class="navbar-item" href="/home" id="navbar-item">
                                            Home
                                        </a>
                                        <a class="navbar-item" href="/dashboard" id="navbar-item">
                                            Dashboard
                                        </a>
                                        <a class="navbar-item" href="/news" id="navbar-item">
                                            News
                                        </a>
                                        <a class="navbar-item" href="/about" id="navbar-item">
                                            About
                                        </a>
                                    </div>
                                    <div class="navbar-end">
                                        <div class="navbar-item">
                                            <div class="buttons">
                                                {
                                                    theme === 'light' ? (
                                                        <button class="button is-link mt-2" onClick={toggleTheme}>
                                                            <FontAwesomeIcon icon={faMoon} />
                                                        </button>
                                                    ) : (
                                                        <button class="button is-link mt-2" onClick={toggleTheme}>
                                                            <FontAwesomeIcon icon={faSun} />
                                                        </button>
                                                    )
                                                }
                                                <button class="button is-primary mt-2 ml-2 mb-2" onClick={() => logout()}>
                                                    <strong>Log Out</strong>
                                                </button>
                                            </div>
                                            {/* <Profile></Profile> */}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div class="navbar-brand">
                                    <a class="navbar-item" href="/dashboard#title">
                                        <FontAwesomeIcon icon={faChartLine} size="2x" />
                                        <a class="nav-title fa-2x" href="/dashboard#title">
                                            MyStockWatch
                                        </a>
                                        {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
                                    </a>

                                    <a
                                        href="#burger"
                                        role="button"
                                        class="navbar-burger showNav"
                                        onClick={() => setIsBurger(!isBurger)}
                                        aria-label="menu"
                                        aria-expanded="false"
                                    >
                                        <span aria-hidden="true"></span>
                                        <span aria-hidden="true"></span>
                                        <span aria-hidden="true"></span>
                                    </a>
                                </div>
                                <div id="navbarBasicExample" class="navbar-menu">
                                    <div class="navbar-start">
                                        <a class="navbar-item" href="/home" id="navbar-item">
                                            Home
                                        </a>
                                        <a class="navbar-item" href="/dashboard" id="navbar-item">
                                            Dashboard
                                        </a>
                                        <a class="navbar-item" href="/news" id="navbar-item">
                                            News
                                        </a>
                                        <a class="navbar-item" href="/about" id="navbar-item">
                                            About
                                        </a>
                                    </div>
                                    <div class="navbar-end">
                                        <div class="navbar-item">
                                            <div class="buttons">
                                                {
                                                    theme === 'light' ? (
                                                        <button class="button is-link mt-2" onClick={toggleTheme}>
                                                            <FontAwesomeIcon icon={faMoon} />
                                                        </button>
                                                    ) : (
                                                        <button class="button is-link mt-2" onClick={toggleTheme}>
                                                            <FontAwesomeIcon icon={faSun} />
                                                        </button>
                                                    )
                                                }
                                                <button class="button is-primary mt-2 ml-2 mb-2" onClick={() => logout()}>
                                                    <strong>Log Out</strong>
                                                </button>
                                            </div>
                                            {/* <Profile></Profile> */}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </>
            </nav >

        </div >
    );
}

export default Nav;
