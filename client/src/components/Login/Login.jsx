import './Login.css';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

// Component to log the user in
function Login() {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <body id="login-body">
        <section id="login-hero-success" class="hero is-success is-fullheight">
          <div class="hero-body" id="login-hero">
            <div class="container has-text-centered">
              <div class="column is-4 is-offset-4">
                <h3 class="title has-text-black">Login</h3>
                <hr class="login-hr" />
                <p id="login-p" class="subtitle has-text-black">Please login to proceed.</p>
                <div class="box" id="login-box">
                  {/* <figure class="avatar">
                  <img src="https://placehold.it/128x128" />
                </figure> */}
                  <form>
                    <div id="login-field" class="field">
                      <div class="control">
                        <input id="login-input" class="input is-large" type="email" placeholder="Your Email" autofocus="" />
                      </div>
                    </div>

                    <div id="login-field" class="field">
                      <div class="control">
                        <input id="login-input" class="input is-large" type="password" placeholder="Your Password" />
                      </div>
                    </div>
                    <div id="login-field" class="field">
                      <label class="checkbox">
                        <input id="login-input" type="checkbox" />
                        Remember me
                      </label>
                    </div>
                    <button
                      class="button is-block is-primary is-large is-fullwidth"
                      onClick={() => loginWithRedirect()}>
                      Login
                      <i id="login-fa" class="fa fa-sign-in" aria-hidden="true"></i>
                    </button>
                  </form>
                </div>
                <p id="login-p" class="has-text-grey">
                  <a href="register">Sign Up</a> &nbsp; ·&nbsp;
                  <a href="../">Forgot Password</a> &nbsp; ·&nbsp;
                  <a href="../">Need Help?</a> &nbsp; ·&nbsp;
                  <a href="/home">Home</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <script async type="text/javascript" src="../js/bulma.js"></script>
      </body >
    );
  }
}




export default Login;
