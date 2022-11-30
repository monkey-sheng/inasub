import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './CMA.module.css'
import {connect} from "react-redux";
import {deleteLines} from "../../../../app/LineOrderingSlice";


function mapStateToProps(state) {
  const selectedLines = state.selectedLines.present;
  return {selectedLines}
}

const mapDispatchToProps = {
  // TODO: reducer actions here
  deleteLines,
}

class CMA_DeleteLine extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * Perform deletion of selected lines, and set selected line to one closest to index of
   * original active line
   * don't delete if only one line left
   * @param event
   */
  handleOnClick(event) {

  }

  render() {
    const containerClasses = 'flex-row ' + styles.actionContainer;
    const actionNameClasses = 'flex-grow-1 ' + styles.actionName;
    return (
      <div className={containerClasses}>
        <div className={styles.actionLogo}>

        </div>
        <div className={actionNameClasses} onClick={}>
          Delete Lines
        </div>
        <div className="shortcut">

        </div>
      </div>
    );
  }
}

CMA_DeleteLine.propTypes = {};

// export default CMA_DeleteLine;
export default connect(mapStateToProps, mapDispatchToProps)(CMA_DeleteLine);
