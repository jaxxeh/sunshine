import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Location from './Location';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

const LocationsList = props => {
  const { classes, locations, time } = props;
  return (
    <List component="div" className={classes.root}>
      {locations.map((l, i) => {
        return (
          <div key={i}>
            <Location placeId={l.placeId} time={time} />
            {i < locations.length - 1 && <Divider />}
          </div>
        );
      })}
    </List>
  );
};

LocationsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ locations }) => {
  return {
    locations,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(LocationsList));
