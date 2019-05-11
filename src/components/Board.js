import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Board.css';

const styles = ({
    square: {
        background: 'rgba(255, 255, 255, 0)',
        border: '1px solid #999',
        borderRadius: 0,
        float: 'left',
        fontSize: '22px',
        fontWeight: 'bold',
        lineHeight: '34px',
        height: '34px',
        width: '34px',
        minWidth: '34px',
        marginRight: '-1px',
        marginTop: '-1px',
        padding: 0,
        textAlign: 'center',
      },
      hover: {},
});

function Square(props) {
  return (
    <Button className={props.classes.square} onClick={props.onClick}>
      {props.value}
    </Button>
  );
}
  
  class Board extends React.Component {
  
  renderSquare(i) {
    return(
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        classes={this.props.classes}
        />
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

export default withStyles(styles)(Board);