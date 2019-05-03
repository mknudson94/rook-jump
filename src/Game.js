import React from 'react';
import boardGenerator from './boardGenerator.js';

const easyBoard = [3, 4, 3, 2, 4, 
                   2, 3, 3, 3, 2,
                   3, 3, 2, 1, 3,
                   3, 2, 1, 3, 1,
                   4, 4, 3, 2, 0];

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
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>
    );
  }
  
  render() {
    let rows = []
    
    for (let i = 0; i < this.props.size; i++) {
      let squares = []
      for (let j = 0; j < this.props.size; j++) {
        let index = i * this.props.size + j;
        squares.push(this.renderSquare(index));
      }
      rows.push(<div className="board-row">{squares}</div>);
    }

    return(
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSquare: 0,
      board: boardGenerator(this.props.size)
    }
  }

  isNeighbor(i) {
    let active = this.state.activeSquare;
    let board = this.state.board;
    let sameColumn = ((i - active) % this.props.size === 0);
    let sameRow = (Math.floor(i/5) === Math.floor(active/5));
    let horizontalAway = (Math.abs(i-active) === board[active]);
    let verticalAway = (Math.abs(Math.floor(i / this.props.size) - Math.floor(active / this.props.size)) === board[active]);
    return ((sameRow && horizontalAway) || (sameColumn && verticalAway)); 
  }

  handleClick(i) {
    if (this.isNeighbor(i)) {
      this.setState({activeSquare: i});
    }
  }

  render() {
    let goal = this.props.size**2 - 1;
    let string = this.state.activeSquare === goal ? (<div>You win!</div>) : (<div>Active square: {this.state.activeSquare}</div>)
    return(
      <div>
        <Board
          squares={this.state.board}
          size={this.props.size} 
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game-info">
          {string}
        </div>
      </div>
    );
  }
}

export default Game;