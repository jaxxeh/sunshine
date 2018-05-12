import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleUnits, hideDetails } from '../actions';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from 'material-ui/Switch';
import Hidden from 'material-ui/Hidden';

const styles = theme => ({
  toolBar: {
    minHeight: 64,
  },
  title: {
    marginLeft: 16,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 72,
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  grow: {
    flex: 1,
  },
});

const DetailsHeader = props => {
  const {
    classes,
    handleRemove,
    location,
    hideDetails,
    local,
    units,
    toggleUnits,
  } = props;
  return (
    <AppBar position="static" color="secondary">
      <Toolbar className={classes.toolBar}>
        <div className={`${classes.grow} ${classes.flex}`}>
          <IconButton onClick={hideDetails} color="inherit">
            <ArrowBackIcon />
          </IconButton>
          <Hidden xsDown>
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
            >
              {location.name} -{' '}
              {`${local.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}`}
            </Typography>
          </Hidden>
        </div>
        <div className={classes.flex}>
          {!location.isCurrent && (
            <IconButton onClick={handleRemove} color="inherit">
              <DeleteIcon />
            </IconButton>
          )}
          <Typography variant="subheading" color="inherit">
            °C
          </Typography>
          <Switch
            checked={units === 'imperial'}
            value="units"
            color="default"
            onChange={toggleUnits}
          />
          <Typography variant="subheading" color="inherit">
            °F
          </Typography>
        </div>
      </Toolbar>
      <Hidden smUp>
        <Toolbar className={classes.toolBar}>
          <Typography variant="title" color="inherit" className={classes.title}>
            {location.name} -{' '}
            {`${local.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}`}
          </Typography>
        </Toolbar>
      </Hidden>
    </AppBar>
  );
};

DetailsHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

const mapStateToProps = ({ units }) => {
  return {
    units,
  };
};

export default connect(mapStateToProps, {
  hideDetails,
  toggleUnits,
})(withStyles(styles)(DetailsHeader));
