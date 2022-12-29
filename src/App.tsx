import React from "react";
import logo from "img/logo.svg";
import "styles/App.css";
import Test from "components/Test";
function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Test />
    </div>
  );
}

export default App;
