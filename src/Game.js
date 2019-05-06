import React from 'react';
import boardGenerator, { lin2grid } from './boardGenerator.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSquare: 0,
      boardData: boardGenerator(props.difficulty),
      path: [{row:0, col:0}],
      reveal: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.difficulty !== this.props.difficulty) {
      console.log('updating board');
      this.setState({
        activeSquare: 0,
        boardData: boardGenerator(this.props.difficulty),
        path: [{row:0, col:0}],
        reveal: false
      });
  }
}

  isSuccessor(i) {
    let active = this.state.activeSquare;
    let board = this.state.boardData.board;
    let sameColumn = ((i - active) % this.state.boardData.size === 0);
    let sameRow = (Math.floor(i/this.state.boardData.size) === Math.floor(active/this.state.boardData.size));
    let horizontalAway = (Math.abs(i-active) === board[active]);
    let verticalAway = (Math.abs(Math.floor(i / this.state.boardData.size) - Math.floor(active / this.state.boardData.size)) === board[active]);
    return ((sameRow && horizontalAway) || (sameColumn && verticalAway)); 
  }

  handleClick(i) {
    if (this.isSuccessor(i)) {
      let coor = lin2grid(i, this.state.boardData.size);
      console.log(this.state.path.concat(coor));
      this.setState({activeSquare: i, path: this.state.path.concat(coor)});
    }
  }

  handleSolveClick() {
    let solution = [];
    this.state.boardData.solution.forEach(i => solution.push(lin2grid(i, this.state.boardData.size)));
    this.setState({path: solution});
  }

  render() {
    let goal = this.state.boardData.size**2 - 1;
    let string = this.state.activeSquare === goal ? (<div>You win!</div>) : (<div>Active square: {this.state.activeSquare}</div>)
    return(
      <div className="game">
        <BoardOverlay
          size={this.state.boardData.size}
          path={this.state.path}
        />
        <Board
          squares={this.state.boardData.board}
          difficulty={this.props.difficulty} 
          size={this.state.boardData.size}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game-info">
          {string}
        </div>
        <button className="solvePrompt" onClick={() => this.handleSolveClick()}>Reveal solution?</button>
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

class BoardOverlay extends React.Component {
      render() {
        console.log(this.props.path);
        let width = 34
        let height = 34;
        
        let x = [] 
        let y = [];
        for (let coor of this.props.path) {
          x.push(coor.col * width);
          y.push(coor.row * height);
        }

        let lines = []
        for (let i = 0; i < this.props.path.length - 1; i++) {
          lines.push(<line key={i} x1={x[i]} y1={y[i]} x2={x[i + 1]} y2={y[i + 1]} style={{stroke:"rgb(255,0,0)",strokeWidth:"2"}}/>);
        }

        return (
          <svg className="overlay" height="210" width="500">
            {lines}
          </svg>
        );
      }
}

export default Game;