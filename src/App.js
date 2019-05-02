import React from 'react';
import './App.css';
import Game from './Game.js'

class App extends React.Component {
  
  render() {
    return (
      <div>
        Hello, world!
        <Game 
          message="I'm hit!"
          size="5"
        />
      </div>
    );
  }
}

export default App;
