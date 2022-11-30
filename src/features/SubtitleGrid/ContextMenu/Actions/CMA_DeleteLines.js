import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './CMA.module.css'
import deleteLinesAction from "../../../../app/common/EditingActions/DeleteLines";


class CMA_DeleteLines extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * Perform deletion of selected lines, and set active and selected lines to the one that
   * currently is closest to the index (line number) of original active line
   * if everything is deleted, add a default line
   * @param event
   */
  handleOnClick(event) {
    event.stopPropagation();
    event.preventDefault();
    deleteLinesAction();
  }

  render() {
    const containerClasses = 'd-flex flex-row ' + styles.actionContainer;
    const actionNameClasses = 'flex-grow-1 ' + styles.actionNameShortcut;
    return (
      <div className={containerClasses}>
        <div className={styles.actionLogo}>

        </div>
        <div className={actionNameClasses} onClick={this.handleOnClick}>
          Delete Lines
        </div>
        <div className={styles.actionNameShortcut}>
          Ctrl-Delete
        </div>
      </div>
    );
  }
}

CMA_DeleteLines.propTypes = {};

// export default CMA_DeleteLines;
export default CMA_DeleteLines;
