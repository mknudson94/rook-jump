import React from 'react';
import Board from './Board';
import BoardOverlay from './BoardOverlay';
import DifficultyRadio from './DifficultyRadio';
import boardGenerator, { lin2grid } from '../boardGenerator.js';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  containerCard: {
    minHeight: 292,
    maxWidth: 550,
    margin: 'auto',
    padding: 10,
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boardAndOverlayContainer: {
    position: 'relative',
  },
  board: {

  },
  overlay: {
    position: 'absolute',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
    margin: '20px 0',
    textAlign: 'center',
  },
  actionButton: {
    display: 'block',
    margin: 'auto',
    marginBottom: '6px',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapseContainer: {
    // marginBottom:30
  },
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: boardGenerator(props.difficulty),
      activeSquare: 0,
      userPath: [{row:0, col:0}],
      history: [],
      reveal: false,
      expanded: false,
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

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
    if (this.state.history.length === 0) return;
    let { history } = this.state;
    let last = history.pop();
    this.setState({
      activeSquare: last.activeSquare,
      userPath: last.userPath,
      history: history
    });
  }

  render() {
    const { classes } = this.props;
    console.log(classes);
    let goal = this.state.boardData.size**2 - 1;
    let activeSquare = lin2grid(this.state.activeSquare, this.state.boardData.size);
    let string = this.state.activeSquare === goal ? 
      this.state.userPath.length === this.state.boardData.solution.length ?
        (<Typography variant='subtitle2'>You win!</Typography>)
        :
        (<Typography variant='subtitle2'>Good job! {<br/>}But that's not the shortest solution...</Typography>)
      : 
      (<Typography variant='subtitle2'>{`Active square: (${activeSquare.row}, ${activeSquare.col})`}</Typography>);
    return(
      <Card className={classes.containerCard}>
      <CardContent className={classes.cardContent}>
        <div className={classes.boardAndOverlayContainer}>
          <div className={classes.overlay}>
            <BoardOverlay 
              size={this.state.boardData.size}
              path={this.state.reveal ? this.state.boardData.solution : this.state.userPath}
            />
          </div>
          <Board
            className={classes.board}
            squares={this.state.boardData.board}
            difficulty={this.props.difficulty} 
            size={this.state.boardData.size}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className={classes.controls}>
          {string}
          <Divider style={{margin:'16px 0'}}/>
          <div>
            <Button 
              className={classes.actionButton} 
              variant='outlined' 
              color='inherit'
              size='small'
              onClick={() => this.handleUndo()}
            >
              Undo
            </Button>
            <Button 
              className={classes.actionButton} 
              variant='outlined' 
              color='inherit' 
              size='small'
              onClick={() => this.handleSolveClick()}
            >
              {this.state.reveal ? 'Hide solution' : 'Reveal solution'}
            </Button>
          </div>
        </div>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Typography variant='caption' style={{marginLeft:'auto'}} onClick={this.handleExpandClick}>Change difficulty</Typography>
          <IconButton
            className={this.state.expanded ? classes.expandOpen : classes.expand}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} className={classes.collapseContainer}>
          <CardContent style={{textAlign:'right'}}>
            <DifficultyRadio
              difficulty={this.props.difficulty}
              onChange={this.props.handleRadioChange}
            />          
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(Game);