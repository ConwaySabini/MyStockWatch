import { BrowserRouter as Router, Switch, Redirect, Link, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import CardSection from './components/CardSection/CardSection.jsx';

function App() {
  return (

    <div className="app">
      <Router>
        {/* <Redirect exact from="/" to="/login" /> */}
        <Route path="/" exact component={Dashboard} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/news" exact component={CardSection} />
      </Router>

    </div>
  );
}

export default App;