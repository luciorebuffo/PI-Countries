import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/Landing"

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route component={Home} />
        </Switch>
    </Router>
  );
}

export default App;
