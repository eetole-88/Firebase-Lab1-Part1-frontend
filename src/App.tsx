import React, { useContext } from "react";
import "./App.css";
import PersonalShoutouts from "./components/ShoutoutListByUser";
("./PersonalShoutouts");
import ShoutoutList from "./components/ShoutoutList";
import { AuthContext } from "./context/auth-context";
import { signInWithGoogle, signOut } from "./firebaseConfig";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ShoutoutListByUser from "./components/ShoutoutListByUser";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <h1>All Shout Outs</h1>
        {user ? (
          <div className="signed-in">
            Welcome
            {user.photoURL && <img src={user.photoURL} />}
            {user.displayName}
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <div className="signed-out">
            <button onClick={signInWithGoogle}>Sign In With Google</button>
          </div>
        )}
      </header>

      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

      <Router>
        <Switch>
          <Route path="/user/:name" exact>
            <ShoutoutListByUser />
          </Route>
          <Route path="/">
            <ShoutoutList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
