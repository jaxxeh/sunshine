import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleAdd, hideDetails, addLocation, loadLocations } from '../actions';
import { withStyles } from 'material-ui/styles';
import withRoot from '../hocs/withRoot';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from 'material-ui/Dialog';
import Grow from 'material-ui/transitions/Grow';
import Zoom from 'material-ui/transitions/Zoom';
import Tooltip from 'material-ui/Tooltip';
import axios from 'axios';
import Header from '../components/Header';
import LocationsList from '../components/LocationsList';
import AddLocation from '../components/AddLocation';
import LocationDetails from '../components/LocationDetails';
import config from '../config';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  },
});

const Transition = props => {
  return <Grow style={{ transformOrigin: '95% 95%' }} {...props} />;
};

class App extends Component {
  state = {
    time: null,
    interval: null,
  };

  getTime = () => {
    this.setState({ time: Date.now() });
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  async componentDidMount() {
    this.setState({ interval: setInterval(this.getTime, 1000) });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async pos => {
          const { latitude, longitude } = pos.coords;
          const response = await axios.get(
            `${config.apiUrl}/cities/find?q=${latitude},${longitude}`,
          );
          const { id, name } = response.data;
          this.props.addLocation(id, name, true);
        },
        () => console.log('unable to to retrieve location'),
      );
    }
    this.props.loadLocations();
  }

  render() {
    const { classes, dialogs, toggleAdd, hideDetails } = this.props;
    const { time } = this.state;
    return (
      <div className={classes.root}>
        <Header title="Sunshine!" />
        <LocationsList time={time} />
        <Dialog
          fullScreen
          open={dialogs.details}
          onClose={hideDetails}
          TransitionComponent={Transition}
        >
          <LocationDetails time={time} />
        </Dialog>
        <Tooltip title="Add Location" placement="left">
          <Zoom in={!(dialogs.add || dialogs.details)}>
            <Button
              variant="fab"
              className={classes.fab}
              color="secondary"
              onClick={toggleAdd}
            >
              <AddIcon />
            </Button>
          </Zoom>
        </Tooltip>
        <Dialog
          fullScreen
          open={dialogs.add}
          onClose={toggleAdd}
          TransitionComponent={Transition}
        >
          <AddLocation />
        </Dialog>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ dialogs }) => {
  return {
    dialogs,
  };
};

export default connect(mapStateToProps, {
  toggleAdd,
  hideDetails,
  addLocation,
  loadLocations,
})(withRoot(withStyles(styles)(App)));
