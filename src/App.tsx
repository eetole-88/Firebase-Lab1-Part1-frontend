import React, { useContext } from "react";
import "./App.css";
import ShoutoutList from "./components/ShoutoutList";
import { AuthContext } from "./context/auth-context";
import { signInWithGoogle, signOut } from "./firebaseConfig";

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
      <ShoutoutList />
    </div>
  );
}

export default App;
