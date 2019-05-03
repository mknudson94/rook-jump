import React from 'react';
import boardGenerator from './boardGenerator.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSquare: 0,
      board: boardGenerator(props.difficulty),
      size: Math.floor((props.difficulty - 1) / 3) + 3
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.difficulty !== this.props.difficulty) {
      console.log('updating board');
      this.setState({
        activeSquare: 0,
        board: boardGenerator(this.props.difficulty),
        size: Math.floor((this.props.difficulty - 1) / 3) + 3
      });
    }
  }

  isSuccessor(i) {
    let active = this.state.activeSquare;
    let board = this.state.board;
    let sameColumn = ((i - active) % this.state.size === 0);
    let sameRow = (Math.floor(i/this.state.size) === Math.floor(active/this.state.size));
    let horizontalAway = (Math.abs(i-active) === board[active]);
    let verticalAway = (Math.abs(Math.floor(i / this.state.size) - Math.floor(active / this.state.size)) === board[active]);
    return ((sameRow && horizontalAway) || (sameColumn && verticalAway)); 
  }

  handleClick(i) {
    if (this.isSuccessor(i)) {
      this.setState({activeSquare: i});
    }
  }

  render() {
    let goal = this.state.size**2 - 1;
    let string = this.state.activeSquare === goal ? (<div>You win!</div>) : (<div>Active square: {this.state.activeSquare}</div>)
    return(
      <div>
        <Board
          squares={this.state.board}
          difficulty={this.props.difficulty} 
          size={this.state.size}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game-info">
          {string}
        </div>
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return(
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>
    );
  }
  
  render() {
    let rows = []
    
    for (let i = 0; i < this.props.size; i++) {
      let squares = [];
      for (let j = 0; j < this.props.size; j++) {
        let index = i * this.props.size + j;
        squares.push(this.renderSquare(index));
      }
      rows.push(<div key={i} className="board-row">{squares}</div>);
    }

    return(
      <div>
        {rows}
      </div>
    );
  }
}

export default Game;