import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import styles from './EditBox.module.css'
import setTextAction from "../../../../app/common/EditingActions/SetText";

const editBoxDomID = "edit-box-dom-elem-id"

/**
 * The box where users would actually type in the content
 */
class EditBox extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleOnInput = this.handleOnInput.bind(this);
    this.editBoxRef = createRef();
  }

  handleOnInput() {
    setTextAction(this.editBoxRef.current.value);
  }

  render() {
    return (
      <textarea id={editBoxDomID} ref={this.editBoxRef}
                className={styles.editBox} onInput={this.handleOnInput}>
      </textarea>
    );
  }
}

EditBox.propTypes = {};

export default EditBox;
export {editBoxDomID};
