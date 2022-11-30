import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";

class EditStyleButton extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    // TODO
  }

  render() {
    return (
      <Button onClick={this.handleOnClick} variant="outline-secondary" size="sm">
        Edit
      </Button>
    );
  }
}

EditStyleButton.propTypes = {};

export default EditStyleButton;
