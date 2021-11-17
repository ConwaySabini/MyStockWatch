import './Footer.css';

//TODO link my name to portfolio
// Component to display the footer of the application
function Footer() {
  return (

    <div className="HomeFooter" >
      {/* Footer with information and links */}
      <footer class="footer" id="home-footer">
        <section class="section is-small">
          <div class="container">
            <div class="content has-text-centered">
              <div class="soc">
                <a href="/#github">
                  <i class="fa fa-github-alt fa-lg" role="none"></i>
                </a>
              </div>
              <div className="FooterMessage">
                <p>
                  <strong>MyStockWatch</strong> by <a href="/">Ethan Sabini</a>. The source code is licensed by
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
