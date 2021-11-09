import { BrowserRouter as Router, Switch, Redirect, Link, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import News from './components/News/News.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

if (process.env.REACT_APP === "development") {
  console.log('hello dev mode');
  // do something
}

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function App() {
  //Router for the application
  return (
    <div className="app">
      <Router>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          // redirectUri={window.location.origi
          redirectUri={"http://localhost:3001/dashboard"}>
          {/* useRefreshToken={true}
          cacheLocation={'localStorage'}> */}
          {/* <Redirect exact from="/" to="/login" /> */}
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/news" exact component={News} />
        </Auth0Provider>
      </Router>

    </div >
  );
}

export default App;
