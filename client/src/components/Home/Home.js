import './Home.css';

import CardSection from './../CardSection/CardSection';
import Nav from './../Nav/Nav';
import Panel from './../Panel/Panel';
import Footer from './../Footer/Footer';

const chart = require('chart.js');

function Home() {
  return (

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
          <div className="section-small">
            <div class="block"></div>
            <CardSection />
            <div class="block"></div>
          </div>
        </div>

        <div class="column is-2">is 2</div>

      </div>
      <Footer />
    </div >
  );
}

export default Home;
