import './Home.css'

import Nav from './Nav';
import Panel from './Panel';

function Home() {
  return (
    <div className="Home">
      <header className="app-header">
        <Nav></Nav>

        <div className="section-small">
          <section class="section">
            <div class="buttons">
              <button class="button is-info">Add Stock</button>
            </div>
            {/* <h1 class="title">Large section</h1>
            <h2 class="subtitle">
              A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading.
            </h2> */}
            {/* <Panel></Panel> */}
            <div class="block"></div>

            <div className="pagination">
              <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous">Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                  <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                  <li><span class="pagination-ellipsis">&hellip;</span></li>
                  <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                  <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                  <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                  <li><span class="pagination-ellipsis">&hellip;</span></li>
                  <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
                </ul>
              </nav>
            </div>
          </section>
        </div>

        <div className="footer">
          <footer class="footer">
            <div class="content has-text-centered">
              <p>
                <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
              </p>
            </div>
          </footer>
        </div>
      </header>
    </div >
  );
}

export default Home;
