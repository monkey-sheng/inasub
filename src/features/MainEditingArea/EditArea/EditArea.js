import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import EditBox from "./EditBox/EditBox";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import EditStyleButton from "./EditStyleButton/EditStyleButton";
import NameInputDropdown from "./NameEffectInputDropdown/NameInputDropdown";
import EffectInputDropdown from "./NameEffectInputDropdown/EffectInputDropdown";
import LayerNumberInput from "./LayerNumberInput/LayerNumberInput";
import LineStartTime from "./LineTimeDisplayInput/LineStartTime";
import LineEndTime from "./LineTimeDisplayInput/LineEndTime";
import LineDurationTime from "./LineTimeDisplayInput/LineDurationTime";
import LineMarginL from "./LineMarginDisplayInput/LineMarginL";
import LineMarginR from "./LineMarginDisplayInput/LineMarginR";
import LineMarginV from "./LineMarginDisplayInput/LineMarginV";
import {assFileActions} from "../../../app/AssFileSlice";
import {store} from "../../../app/store";
import styles from './EditArea.module.css'
import StyleDropdown from "./StyleDropdown/StyleDropdown";
import CommentCheckbox from "./CommentCheckbox/CommentCheckbox";


/**
 * The area where the user would type and do stuff to the line of subtitle.
 * Includes comment toggle, style dropdown, actor and effect field, etc. Like aegisub,
 * and most importantly the edit box
 */
class EditArea extends Component {

  constructor(props, context) {
    super(props, context);
    this.checkboxRef = createRef();
  }

  render() {
    const containerClasses = "d-flex flex-column align-items-stretch h-100 w-100";
    const rowContainerClasses = "d-flex flex-row align-items-center w-100 " + styles.rowContainer;
    const rowContainerClassesTodo = "d-flex flex-row align-items-center w-100 " + styles.rowContainerTodo;
    // in css
    return (
      <div className={containerClasses}>

        <div className={rowContainerClasses}>
          <CommentCheckbox/>

          <StyleDropdown/>

          <EditStyleButton/>

          <NameInputDropdown/>

          <EffectInputDropdown/>
        </div>

        <div className={rowContainerClassesTodo}>
          <LayerNumberInput/>

          <LineStartTime/>
          <LineEndTime/>
          <LineDurationTime/>

          <LineMarginL/>
          <LineMarginR/>
          <LineMarginV/>
        </div>

        <div className="flex-grow-1">
          <EditBox/>
        </div>

      </div>
    );
  }
}

EditArea.propTypes = {};

export default EditArea;
