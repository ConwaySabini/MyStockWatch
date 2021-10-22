import './Register.css';

function Register() {
  return (
    <div className="search-panel">
      <body>
        <section class="container">
          <div class="columns is-multiline">
            <div class="column is-8 is-offset-2 register">
              <div class="columns">
                <div class="column left">
                  <h1 class="title is-1">StockWatch</h1>
                  <h2 class="subtitle colored is-4">Sign Up With Your Name, Email, and Password</h2>
                  <p>Creating an account is free and grants you access to the best and most intuitive stock tracker around.</p>
                  <br />
                  <div class="block" />
                  <small><em>Already Have and account? Login below.</em></small>
                  <a href="login">
                    <button class="button is-block is-primary is-fullwidth is-medium mt-5">Login</button>
                  </a>
                </div>
                <div class="column right has-text-centered">
                  <h1 class="title is-4">Sign up today</h1>
                  <p class="description">Make sure to use a strong password of at least 10 characters with a mix of numbers, special characters, and cases.</p>
                  <form>
                    <div class="field">
                      <div class="control">
                        <input class="input is-medium" type="text" placeholder="Name" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input class="input is-medium" type="email" placeholder="Email" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input class="input is-medium" type="text" placeholder="Password" />
                      </div>
                    </div>
                    <button class="button is-block is-primary is-fullwidth is-medium">Submit</button>

                  </form>
                </div>
              </div>
            </div>
            {/* <div class="column is-8 is-offset-2">
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <span class="icon">
                      <i class="fab fa-twitter"></i>
                    </span> &emsp;
                    <span class="icon">
                      <i class="fab fa-facebook"></i>
                    </span> &emsp;
                    <span class="icon">
                      <i class="fab fa-instagram"></i>
                    </span> &emsp;
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span> &emsp;
                    <span class="icon">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="level-right">
                  <small class="level-item">
                    &copy; Super Cool Website.All Rights Reserved.
                  </small>
                </div>
              </nav>
            </div> */}
          </div>
        </section>
      </body>
      <style>


      </style>
    </div>
  );
}

export default Register;
