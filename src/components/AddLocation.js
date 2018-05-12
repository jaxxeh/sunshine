import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleAdd, addLocation } from '../actions';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import axios from 'axios';
import config from '../config';

const styles = theme => ({
  grow: {
    flex: 1,
  },
  withPadding: {
    padding: theme.spacing.unit * 3,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  input: {
    flex: 1,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const renderInput = inputProps => {
  const { classes, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      label="City Name"
      helperText="Start typing to see suggestions"
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          ) : (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          );
        })}
      </div>
    </MenuItem>
  );
};

const renderSuggestionsContainer = options => {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
};

const getSuggestionValue = suggestion => {
  return suggestion.name;
};

class AddLocation extends Component {
  state = {
    search: '',
    suggestions: [],
    selected: {},
  };

  handleAdd = () => {
    const { addLocation, toggleAdd } = this.props;
    const { selected } = this.state;
    addLocation(selected.placeId, selected.name, false);
    toggleAdd();
  };

  handleSuggestionSelected = (e, { suggestion }) => {
    this.setState({ selected: suggestion });
  };

  handleSuggestionsFetchRequested = async ({ value }) => {
    const trimmedQuery = value.trim().toLowerCase();
    const response = await axios.get(
      `${config.apiUrl}/cities/search?q=${trimmedQuery}`,
    );
    this.setState({
      suggestions: response.data,
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (e, { newValue }) => {
    this.setState({ search: newValue, selected: {} });
  };

  render() {
    const { classes, toggleAdd } = this.props;
    const { selected, suggestions, search } = this.state;
    return (
      <div>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton onClick={toggleAdd} color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Typography
              className={classes.grow}
              variant="title"
              color="inherit"
            >
              Add Location
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12} className={classes.withPadding}>
            <Autosuggest
              theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
              }}
              renderInputComponent={renderInput}
              suggestions={[...suggestions]}
              onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
              renderSuggestionsContainer={renderSuggestionsContainer}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              onSuggestionSelected={this.handleSuggestionSelected}
              inputProps={{
                classes,
                value: search,
                onChange: this.handleChange,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={`${classes.actions} ${classes.withPadding}`}
          >
            <Button onClick={toggleAdd}>Cancel</Button>
            <Button
              onClick={this.handleAdd}
              disabled={Object.keys(selected).length < 1}
              color="primary"
            >
              Add Location
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AddLocation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { toggleAdd, addLocation })(
  withStyles(styles)(AddLocation),
);
