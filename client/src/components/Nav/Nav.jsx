import './Nav.css';


function Nav() {
  return (
    <div className="navigation">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item">
            <i class="fas fa-chart-line fa-2x"></i>
            <a class="nav-title fa-2x" href="">
              Stocks
            </a>
            {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="home">
              Home
            </a>

            <a class="navbar-item" href="dashboard">
              Dashboard
            </a>

            <a class="navbar-item" href="news">
              News
            </a>

            <a class="navbar-item">
              About
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-link" href="Register">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light" href="Login">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav >

    </div >
  );
}

export default Nav;
