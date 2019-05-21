import React from 'react';
import Board from './Board';
import BoardOverlay from './BoardOverlay';
import DifficultyRadio from './DifficultyRadio';
import boardGenerator, { lin2grid } from '../boardGenerator.js';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UndoIcon from '@material-ui/icons/Undo';
import RestoreIcon from '@material-ui/icons/Restore';

import {withStyles} from '@material-ui/core/styles';

import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-plaza.css';
import { Animated } from "react-animated-css";

const styles = theme => ({
  containerCard: {
    maxWidth: 620,
    margin: 'auto',
    padding: 10,
  },
  cardContent: {
    // width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boardAndOverlayContainer: {
    position: 'relative',
    height: 256,
    minWidth: 256,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
  },
  overlayContainer: {
    position: 'absolute',
  },
  overlay: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  secondaryPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '20px 0',
    },
  },
  gameMessageContainer: {
    height: 65,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionButton: {
    display: 'block',
    margin: '20px 10px',
    // background: blue,
    color: 'white',
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

function NumIterations(props) {
  return (
  <Odometer 
  style={{
    'first-child':{
      visibility: 'hidden'
    }
  }} 
  value={props.i}
  format='(ddd)'
  />);
};

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
      bounce: false,
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.difficulty !== this.props.difficulty) {
      console.log('updating board');
      this.setState({
        activeSquare: 0,
        boardData: boardGenerator(this.props.difficulty),
        userPath: [{row:0, col:0}],
        reveal: false
      });
  }
  const goal = this.state.boardData.size**2 - 1;
  console.log(this.state.activeSquare, goal, prevState.activeSquare, goal);
  if (this.state.activeSquare === goal && prevState.activeSquare !== goal
    && this.state.userPath.length > this.state.boardData.solution.length) {
    console.log('bouncing!');
    this.setState({bounce: true});
    this.forceUpdate(() => {
      setTimeout(() => {
        this.setState({bounce: false});
      }, 1000);
    });
    }
  //   setTimeout(() => {
  //     console.log('bouncing timeout');
  //     this.setState({bounce: false});
  //   }, 500);
  // }
  // if (this.state.bounce) {
  //   console.log('not bouncing');
  //   this.setState({bounce: false});
  // } 
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

  handleReset() {
    this.setState({
      activeSquare: 0,
      userPath: [{row:0, col:0}],
      reveal: false
    });
  }

  render() {
    const { classes } = this.props;
    const goal = this.state.boardData.size**2 - 1;
    const activeSquare = lin2grid(this.state.activeSquare, this.state.boardData.size);
    const string = this.state.activeSquare === goal ? 
      this.state.userPath.length === this.state.boardData.solution.length ?
        (<>You win!</>)
        :
        (<>Good job! {<br/>}But that's not the shortest solution...</>)
      : 
      (<>{`Active square: (${activeSquare.row}, ${activeSquare.col})`}</>);
    return(
      <Card className={classes.containerCard}>
      <CardContent>
        <Grid container spacing={0} styles={{justifyContent: 'center', }}>
          <Grid item xs={12} sm={6} className={classes.boardAndOverlayContainer}>
            <div className={classes.overlayContainer}>
              <div className={classes.overlay}>
                <BoardOverlay
                  size={this.state.boardData.size}
                  path={this.state.reveal ? this.state.boardData.solution : this.state.userPath}
                />
              </div>
              <div style={{visibility:'hidden', display:'inline-block'}}>
                {/* fake button */}
                <Fab 
                  size='small'
                  className={classes.actionButton}
                >
                  <UndoIcon/>
                </Fab>
                {/* fake button */}
                <Fab
                  size='small'
                  className={classes.actionButton}
                >
                  <RestoreIcon/>
                </Fab>
              </div>
            </div>
            <Board
              className={classes.board}
              squares={this.state.boardData.board}
              difficulty={this.props.difficulty} 
              size={this.state.boardData.size}
              onClick={(i) => this.handleClick(i)}
            />
            <div>
            <Fab 
              className={classes.actionButton} 
              size='small'
              color='primary'
              onClick={() => this.handleUndo()}
            >
              <UndoIcon/>
            </Fab>
            <Animated
              animationOut='bounce'
              animationOutDelay={300}
              isVisible={!this.state.bounce}
              animationInDuration={0}
            >
              <Fab
                className={classes.actionButton}
                size='small'
                color='secondary'
                onClick={() => this.handleReset()}
              >
                <RestoreIcon/>
              </Fab>
            </Animated>
          </div>
          </Grid>
          <Grid item xs={12} sm={5} className={classes.secondaryPanel}>
            <Typography container='div' variant='caption'>
              Maze successfully generated after <NumIterations i={this.state.boardData.iterations} classes={classes}/> iterations.
            </Typography>
            <div className={classes.gameMessageContainer}>
              <Typography variant='subtitle2'>
                {string}
              </Typography>
            </div>
            <Divider style={{margin:'16px 0'}}/>
            <div>
              <Button 
                className={classes.revealButton} 
                variant={this.state.reveal ? 'outlined' : 'contained'}
                color='inherit' 
                size='small'
                onClick={() => this.handleSolveClick()}
              >
                Reveal solution
              </Button>
            </div>
          </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Typography variant='caption' style={{marginLeft:'auto', cursor: 'pointer'}} onClick={this.handleExpandClick}>Change difficulty</Typography>
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