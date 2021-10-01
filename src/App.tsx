import React from "react";
import "./App.css";
import PersonalShoutouts from "./components/PersonalShoutouts";
("./PersonalShoutouts");
import ShoutoutList from "./components/ShoutoutList";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>All Shout Outs</h1>
      </header>
      <Router>
        <ShoutoutList />
        <Switch>
          <Route path="/user/:name" exact>
            <PersonalShoutouts />
          </Route>
          <Route path="/shoutouts">
            <Redirect to="/shoutouts" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
