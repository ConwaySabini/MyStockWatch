import './Home.css';

// Component to display the home page of the application
function Home() {
  return (
    <div className="Home">
      <body>
        <section class="hero is-medium" id="home-hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title is-1" id="homeTitle">Welcome to MyStockWatch</h1>
              <h2 class="subtitle" id="homeSubtitle">The simple and intuitive stock tracker and financial news aggregator</h2>
              {/* <a href="register" class="button is-white is-medium is-inverted">Learn More&ensp; </a> */}
            </div>
          </div>
        </section>
        <section id="parallax-1" class="hero is-large ">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-6 is-offset-6">
                  <h1 class="title is-1 " id="homeTitle">Free and Easy to Use Platform</h1>
                  <hr class="content-divider" />
                  <h2 class="subtitle" id="homeSubtitle">Track stocks individually, search, filter, and sort them.</h2>
                  <a href="register" class="button is-white is-inverted">Next&ensp;</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="parallax-2" class="hero is-large ">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-6">
                  <h1 class="title is-1 " id="homeTitle">Get the Latest Financial News</h1>
                  <hr class="content-divider" />
                  <h2 class="subtitle" id="homeSubtitle">Add stocks to your favorites and get news in one place.</h2>
                  <a href="register" class="button is-white is-inverted">Next&ensp;</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="parallax-3" class="hero is-large ">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-6 is-offset-6">
                  <h1 class="title is-1 " id="homeTitle">For Beginners and Advanced Users Alike</h1>
                  <hr class="content-divider" />
                  <h2 class="subtitle" id="homeSubtitle">Get financial data displayed from many different timeframes of your choosing.</h2>
                  <a href="register" class="button is-white is-inverted">Next&ensp; </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="cta va" id="home-cta">
          <div class="container">
            <div class="columns">
              <div class="column is-6">
                <h1 class="title is-1 " id="homeTitle">Sign Up Today!</h1>
                <hr class="content-divider" />
                <h2 class="subtitle" id="homeSubtitle">Sign Up with your email and password become a user today!</h2>
                <a href="register">
                  <button class="button is-black mt-2">Register</button>
                </a>
                <a href="login">
                  <button class="button is-black mt-2 ml-4">Login</button>
                </a>
                <a href="dashboard">
                  <button class="button is-black mt-2 ml-4">Dashboard</button>
                </a>
              </div>
            </div>
          </div>

        </section>
      </body>

    </div >
  );
}

export default Home;
