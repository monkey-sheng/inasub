import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropdownButton from "react-bootstrap/DropdownButton";
import {connect} from "react-redux";
import {assFileActions} from "../../../../app/AssFileSlice";
import {store} from "../../../../app/store";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Dropdown} from "react-bootstrap";
import styles from './StyleDropdown.module.css'


function mapStateToProps(state) {
  return {
    currStyle: state.assFile.present['Events'][state.activeLine].Style,
    allStyles: state.assFile.present['V4+ Styles']
  }
}

const mapDispatchToProps = {
  setStyle: assFileActions.setStyle
}

class StyleDropdown extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect(eventKey, event) {
    console.log("handleOnSelect", eventKey);
    this.props.setStyle(store.getState().selectedLines, eventKey);
  }

  render() {
    const currStyleName = this.props.currStyle;
    const items = Object.entries(this.props.allStyles).map(([styleName, style]) => {
      const isActive = styleName === this.props.currStyle;
      return <DropdownItem key={styleName} eventKey={styleName} active={isActive}>{styleName}</DropdownItem>
    });
    return (
      // TODO: use Dropdown with custom styles
      // <DropdownButton title={currStyleName} onSelect={this.handleOnSelect}>
      //   {items}
      // </DropdownButton>
      <Dropdown onSelect={this.handleOnSelect}>
        <Dropdown.Toggle className={"d-flex flex-row align-items-center " + styles.toggle}
                         variant="outline-secondary" size="sm">
          <div className="flex-grow-1">{currStyleName}</div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {items}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

StyleDropdown.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(StyleDropdown);
