import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = ({
  radioButton: {
    borderRadius: 0,
    minWidth: 40,
  },
});

class DifficultyRadio extends Component {
    render() {
      const { classes } = this.props;
      let buttons = [];
      for (let i = 0; i < 10; i++) {
        buttons.push(
          <Button className={classes.radioButton}
            key={i}
            variant='contained'
            size='small'
            value={i + 1}
            disabled={this.props.difficulty == i + 1}
            onClick={() => this.props.onChange(i)}
          >
            {i + 1}
          </Button>
        );
      }
      return(
        <div>
          {buttons}
        </div>
      );
    }
  }
  
  export default withStyles(styles)(DifficultyRadio);