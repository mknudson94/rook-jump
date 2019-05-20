import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

let boxWidth = 33;
let boxHeight = 33;

const styles = ({
  overlay: {
  }
});

class BoardOverlay extends Component {

  render() {
    const { classes, size } = this.props;
    
    let x = [] 
    let y = [];
    for (let coor of this.props.path || []) {
      x.push(coor.col * boxWidth + boxWidth/2);
      y.push(coor.row * boxHeight + boxHeight/2);
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
      <svg className={classes.overlay} height={boxHeight * size} width={boxWidth * size}>
        {shapes}
      </svg>
    );
  }
}

export default withStyles(styles)(BoardOverlay);