import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleUnits } from '../actions';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import Logo from '../assets/sunshine.svg';

const styles = {
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    fontFamily: 'Pacifico',
    transformOrigin: '0 50%',
    transform: 'matrix(1, -0.15, -0.1, 1, 0, 8)',
  },
  logoImg: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
};

const Header = props => {
  const { classes, units, toggleUnits } = props;
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <img src={Logo} alt="logo" className={classes.logoImg} />
        <Typography className={classes.logo} variant="title" color="inherit">
          {props.title}
        </Typography>
        <div className={classes.flex}>
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
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = ({ units }) => {
  return {
    units,
  };
};

export default connect(mapStateToProps, { toggleUnits })(
  withStyles(styles)(Header),
);
