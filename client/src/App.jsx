import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import News from './components/News/News.jsx';
import { useAuth0 } from "@auth0/auth0-react";

if (process.env.REACT_APP === "development") {
  console.log('hello dev mode');
  // do something
}

function App() {
  // user authentication from auth0
  const { user, isAuthenticated } = useAuth0();

  //Router for the application
  if (isAuthenticated) {
    return (
      <div className="app">
        <Router>
          <Route path="/" exact children={<Home />} />
          <Route path="/dashboard" exact children={<Dashboard user={user} />} />
          <Route path="/home" exact children={<Home />} />
          <Route path="/news" exact children={<News user={user} />} />
        </Router>
      </div >
    );
  } else {
    return (
      <div className="app">
        <Router>
          <Route path="/" exact children={<Home />} />
        </Router>
      </div>
    );
  }
}

export default App;
