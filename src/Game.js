import React from 'react';
import boardGenerator, { lin2grid } from './boardGenerator.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: boardGenerator(props.difficulty),
      activeSquare: 0,
      userPath: [{row:0, col:0}],
      history: [],
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
      // update history
      let history = this.state.history.slice();
      history.push({
        activeSquare: this.state.activeSquare,
        userPath: this.state.userPath
      });
      
      // update path
      let coor = lin2grid(i, this.state.boardData.size);
      let userPath = this.state.userPath.concat(coor);

      this.setState({
        activeSquare: i,
        userPath,
        history
      });
    }
  }

  handleSolveClick() {
    this.setState({reveal: !this.state.reveal});
  }

  handleUndo() {
    let history = this.state.history;
    let last = history.pop();
    this.setState({
      activeSquare: last.activeSquare,
      userPath: last.userPath,
      history: history
    });
  }

  render() {
    let goal = this.state.boardData.size**2 - 1;
    let string = this.state.activeSquare === goal ? (<div>You win!</div>) : (<div>Active square: {this.state.activeSquare}</div>);
    return(
      <div>
        <BoardOverlay
          size={this.state.boardData.size}
          path={this.state.reveal ? this.state.boardData.solution : this.state.userPath}
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
        <button className="undo" onClick={() => this.handleUndo()}>Undo</button>
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
        let width = 33
        let height = 33;
        
        let x = [] 
        let y = [];
        for (let coor of this.props.path || []) {
          x.push(coor.col * width + width/2);
          y.push(coor.row * height + height/2);
        }

        let shapes = []
        for (let i = 0; i < this.props.path.length - 1; i++) {
          let xDiff = x[i+1] - x[i];
          let yDiff = y[i+1] - y[i];
          let x1 = ( xDiff / 2 ) || ( 10 * Math.sign(yDiff) );
          let y1 = ( yDiff / 2 ) || ( -10 * Math.sign(xDiff) );
          shapes.push(<path key={i*2} d={`M ${x[i]} ${y[i]} Q ${x[i] + x1} ${y[i] + y1}, ${x[i+1]} ${y[i+1]}`} stroke="black" fill="transparent"/>);
          shapes.push(<circle key={i*2 + 1} cx={x[i+1]} cy={y[i+1]} r="3" fill="red" />);
        }

        return (
          <svg className="overlay" height={height * this.props.size} width={width * this.props.size}>
            {shapes}
          </svg>
        );
      }
}

export default Game;