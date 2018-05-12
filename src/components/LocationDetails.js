import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeLocation } from '../actions';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import DetailsHeader from './DetailsHeader';
import config from '../config';
import weatherLookup from '../assets/weatherLookup';
import 'weather-icons-sass/css/weather-icons.min.css';
import 'weather-icons-sass/css/weather-icons-wind.min.css';

const styles = theme => ({
  photo: {
    height: '30vw',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '40vw',
    },
    [theme.breakpoints.down('xs')]: {
      height: '50vw',
    },
  },
  image: {
    width: '100vw',
  },
  weather: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    // borderRight: `2px solid ${theme.palette.secondary.light}`,
    // '&:last-child': {
    //   borderRight: 'none',
    // },
  },
  weatherLine: {
    alignItems: 'center',
  },
  big: {
    fontSize: '2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
  },
  bigger: {
    fontSize: '3rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.8rem',
    },
  },
  wIcon: {
    fontSize: '1.5rem',
    marginRight: 5,
  },
});

class LocationDetails extends Component {
  state = {
    imgUrl: null,
  };

  async componentDidMount() {
    const { photos } = this.props.location;
    if (photos && photos.length > 0) {
      const response = await axios.get(
        `${config.apiUrl}/cities/photo?q=${
          photos[Math.floor(Math.random() * photos.length)].photo_reference
        }&w=${window.innerWidth}`,
      );
      this.setState({ imgUrl: response.data.imgUrl });
    }
  }

  handleRemove = () => {
    const { location, removeLocation } = this.props;
    removeLocation(location.placeId);
  };

  render() {
    const { classes, location, units, time } = this.props;
    const { imgUrl } = this.state;
    if (!location) {
      return <div />;
    } else {
      const wId = location.weather.weather[0].id;
      const now = new Date();
      const local = new Date(
        time + (now.getTimezoneOffset() + location.utcOffset) * 60000,
      );
      const sunrise = new Date(
        location.weather.sys.sunrise * 1000 +
          (now.getTimezoneOffset() + location.utcOffset) * 60000,
      );
      const sunset = new Date(
        location.weather.sys.sunset * 1000 +
          (now.getTimezoneOffset() + location.utcOffset) * 60000,
      );
      let wIcon = weatherLookup[wId].icon;
      if (wIcon.hasOwnProperty('day')) {
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
      const windSpeed =
        units === 'metric'
          ? Math.round(location.weather.wind.speed * 3.6)
          : Math.round(location.weather.wind.speed * 2.236936);
      return (
        <div>
          <DetailsHeader
            local={local}
            location={location}
            handleRemove={this.handleRemove}
          />
          <Grid container>
            <Grid item xs={12} className={classes.photo}>
              {imgUrl ? (
                <img className={classes.image} src={imgUrl} alt="" />
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.weatherLine}>
            <Grid item xs={3} className={classes.weather}>
              <Typography
                variant="headline"
                align="center"
                className={classes.bigger}
              >
                <i className={`wi ${wIcon}`} />
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.weather}>
              <Typography
                variant="headline"
                align="left"
                className={classes.big}
              >
                {weatherLookup[wId].simple}
              </Typography>
              {weatherLookup[wId].desc.length > 0 && (
                <Typography variant="body1" align="left">
                  ({weatherLookup[wId].desc})
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} className={classes.weather}>
              <Typography
                variant="headline"
                align="center"
                className={classes.bigger}
              >
                {`${Math.round(temp)}${units === 'metric' ? '°C' : '°F'}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={3} className={classes.weather}>
              <Typography variant="body1" align="center">
                <i className={`wi wi-sunrise ${classes.wIcon}`} />
                {`${sunrise.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.weather}>
              <Typography variant="body1" align="center">
                <i
                  className={`wi wi-wind from-${
                    location.weather.wind.deg
                  }-deg ${classes.wIcon}`}
                />
                {`${windSpeed} ${units === 'metric' ? 'km/h' : 'mph'}`}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.weather}>
              <Typography variant="body1" align="center">
                <i className={`wi wi-humidity ${classes.wIcon}`} />
                {`${location.weather.main.humidity}%`}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.weather}>
              <Typography variant="body1" align="center">
                <i className={`wi wi-sunset ${classes.wIcon}`} />
                {`${sunset.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

LocationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ locations, units }) => {
  return {
    location: locations.find(l => l.isSelected),
    units,
  };
};

export default connect(mapStateToProps, {
  removeLocation,
})(withStyles(styles)(LocationDetails));
