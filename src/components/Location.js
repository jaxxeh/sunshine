import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showDetails, updateWeather } from '../actions';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import weatherLookup from '../assets/weatherLookup';
import 'weather-icons-sass/css/weather-icons.min.css';

const styles = {
  wIcon: {
    fontSize: '2em',
    width: 50,
    textAlign: 'center',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class Location extends Component {
  state = {
    location: null,
    lastWeatherUpdate: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.placeId !== prevProps.placeId) {
      const { locations, placeId } = this.props;
      this.setState({ location: locations.find(l => l.placeId === placeId) });
    }
    if (this.props.time > this.state.lastWeatherUpdate + 600000) {
      const { updateWeather, time } = this.props;
      const { location } = this.state;
      updateWeather(location);
      this.setState({ lastWeatherUpdate: time });
    }
  }

  componentDidMount() {
    const { locations, placeId, time } = this.props;
    this.setState({
      location: locations.find(l => l.placeId === placeId),
      lastWeatherUpdate: time,
    });
  }

  handleClick = () => {
    const { showDetails, placeId } = this.props;
    showDetails(placeId);
  };

  render() {
    const { classes, units, time } = this.props;
    const { location } = this.state;
    if (!location) {
      return <div>Loading...</div>;
    } else {
      const wId = location.weather.weather[0].id;
      const now = new Date();
      const local = new Date(
        time + (now.getTimezoneOffset() + location.utcOffset) * 60000,
      );
      let wIcon = weatherLookup[wId].icon;
      if (wIcon.hasOwnProperty('day')) {
        const sunrise = new Date(
          location.weather.sys.sunrise * 1000 +
            (now.getTimezoneOffset() + location.utcOffset) * 60000,
        );
        const sunset = new Date(
          location.weather.sys.sunset * 1000 +
            (now.getTimezoneOffset() + location.utcOffset) * 60000,
        );
        let key = 'day';
        if (local < sunrise || local > sunset) {
          key = 'night';
        }
        wIcon = wIcon[key];
      }
      const temp =
        units === 'metric'
          ? location.weather.main.temp
          : (location.weather.main.temp + 40) * 1.8 - 40;
      return (
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <i className={`wi ${wIcon} ${classes.wIcon}`} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span className={classes.flex}>
                <span>{`${location.name}${
                  location.isCurrent ? ' (current location)' : ''
                }`}</span>
                <span>{`${local.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}</span>
              </span>
            }
            secondary={`${weatherLookup[wId].simple}, ${Math.round(temp)}${
              units === 'metric' ? '°C' : '°F'
            }`}
          />
        </ListItem>
      );
    }
  }
}

Location.propTypes = {
  classes: PropTypes.object.isRequired,
  placeId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ units, locations }) => {
  return {
    units,
    locations,
  };
};

export default connect(mapStateToProps, { showDetails, updateWeather })(
  withStyles(styles)(Location),
);
