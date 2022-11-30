import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {hideSubtitleGridContextMenu} from "../../../app/UIStatesSlice";
import CMA_DeleteLines from "./Actions/CMA_DeleteLines";
import styles from './ContextMenu.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function mapStateToProps(state) {
  const position = state.uiStates.subtitleGridContextMenu;
  return {position, };
}

const mapDispatchToProps = {hideSubtitleGridContextMenu};

class ContextMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.selfRef = props.fwdRef;
  }

  handleOutsideClick(event) {
    // TODO: check this out
    event.stopPropagation();
    event.preventDefault();
    if (this.props.position !== null &&
      this.selfRef.current && !this.selfRef.current.contains(event.target)) {
      this.props.hideSubtitleGridContextMenu();
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  render() {
    const containerClasses = "flex-column align-items-stretch " + styles.container;
    let displayStyle = 'none';
    let [x, y] = [null, null];
    if (this.props.position !== null) {
      displayStyle = 'block';
      x = this.props.position.x;
      y = this.props.position.y;
    }
    return (
      <div ref={this.selfRef} className={containerClasses}
           style={{display: displayStyle, left: x, top: y}}>

        <CMA_DeleteLines/>
        // TODO: other actions here
      </div>
    );
  }
}

ContextMenu.propTypes = {
  fwdRef: PropTypes.object,
};

// export default ContextMenu;
export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
