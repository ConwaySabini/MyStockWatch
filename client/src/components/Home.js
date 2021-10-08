import './Home.css';

import Card from './Card';
import Nav from './Nav';
import Panel from './Panel';

const chart = require('chart.js');

function Home() {
  return (

    <div className="Home">
      {/* Navigation */}
      <header className="app-header">
        <Nav></Nav>
      </header>
      <div class="block"></div>

      {/* Column Layout */}
      <div class="columns is-mobile">
        <div class="column is-2">is 2</div>


        <div class="column is-8">is 6
          {/* Layout to add stocks and individual cards for stocks */}
          <div className="section-small">
            <div class="block"></div>
            {/* <section class="section is-small"> */}
            <Card />
            {/* </section> */}
            <div class="block"></div>
          </div>

          {/* Footer with information and links */}
          <footer class="footer">
            <section class="section is-small">
              <div class="container">
                <div class="content has-text-centered">
                  <div class="soc">
                    <a href="#"><i class="fa fa-github-alt fa-lg" aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-youtube fa-lg" aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a>
                  </div>
                  <p>
                    <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                    is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                  </p>
                </div>
              </div>
            </section>
          </footer>
        </div>


        <div class="column is-2">is 2</div>
      </div>




    </div >
  );
}

export default Home;
