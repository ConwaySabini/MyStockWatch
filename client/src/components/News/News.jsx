import './News.css';
import Nav from '../Nav/Nav';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import { useState } from "react";

// Component to display the news cards
function News() {
  return (
    <div classname="CardSection">
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

            </div>
          </section>
        </div>

        <div class="column is-2" id="SideMenu">

        </div>

      </div>
      <div className="homeFooter">
        <Footer />
      </div>

    </div>
  );
}

export default News;
