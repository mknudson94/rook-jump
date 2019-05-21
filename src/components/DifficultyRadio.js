import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {withStyles} from '@material-ui/core/styles';

const styles = ({
  radioButton: {
    minWidth: 40,
  },
});

class DifficultyRadio extends Component {
    render() {
      const { classes } = this.props;
      let buttons = [];
      for (let i = 0; i < 10; i++) {
        buttons.push(
          <ToggleButton className={classes.radioButton}
            key={i}
            variant='contained'
            size='small'
            value={i + 1}
            disabled={this.props.difficulty == i + 1}
            onClick={() => this.props.onChange(i)}
          >
            {i + 1}
          </ToggleButton>
        );
      }
      return(
        <ToggleButtonGroup exclusive value={this.props.i}>
          {buttons}
        </ToggleButtonGroup>
      );
    }
  }
  
  export default withStyles(styles)(DifficultyRadio);