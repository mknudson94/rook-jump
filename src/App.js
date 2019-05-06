import React from 'react';
import './App.css';
import Game from './Game.js'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 5
    }
  }

  handleOptionChange = e => {
    console.log(`${e.target.value} has been selected!`);
    this.setState( { difficulty: e.target.value } );
    this.forceUpdate();
  }

  render() {

    return (
      <div>
        <Game
          difficulty={this.state.difficulty}
        />
        <div>
          <DifficultyRadio
            difficulty={this.state.difficulty}
            onChange={e => this.handleOptionChange(e)}
          />
        </div>    
      </div>
    );
  }
}

class DifficultyRadio extends React.Component {
  render() {
    let buttons = [];
    for (let i = 0; i < 10; i++) {
      buttons.push(
        <div key={i}>
          <input
            type="radio"
            value={i + 1}
            checked={this.props.difficulty == i + 1}
            onChange={this.props.onChange}
          />
          {i + 1}
        </div>
      );
    }
    return(
      <div>
        {buttons}
      </div>
    );
  }
}

export default App;
