import { BrowserRouter as Router, Switch, Redirect, Link, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (

    <div className="app">
      <Router>
        {/* <Redirect exact from="/" to="/login" /> */}
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Router>

    </div>
  );
}

export default App;
