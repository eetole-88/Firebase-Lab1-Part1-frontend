import React from "react";
import "./App.css";
import ShoutoutList from "./components/ShoutoutList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>All Shout Outs</h1>
      </header>
      <ShoutoutList />
    </div>
  );
}

export default App;
