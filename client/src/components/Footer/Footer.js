import './Footer.css';

function Footer() {
  return (

    <div className="HomeFooter">
      {/* Footer with information and links */}
      <footer class="footer">
        <section class="section is-small">
          <div class="container">
            <div class="content has-text-centered">
              <div class="soc">
                <a href="/#"><i class="fa fa-github-alt fa-lg" aria-hidden="true"></i></a>
                <a href="/#"><i class="fa fa-youtube fa-lg" aria-hidden="true"></i></a>
                <a href="/#"><i class="fa fa-facebook fa-lg" aria-hidden="true"></i></a>
                <a href="/#"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i></a>
              </div>
              <div className="FooterMessage">
                <p>
                  <strong>MyStocks</strong> by <a href="https://jgthms.com">Ethan Sabini</a>. The source code is licensed by
                  <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content
                  is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>

    </div>
  );
}

export default Footer;
