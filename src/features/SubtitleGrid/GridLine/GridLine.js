import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './GridLine.module.css'
import SubtitleLine from "../../../app/common/SubtitleLine";
import {setSelectedLines} from "../../../app/SelectedLinesSlice";
import {setActiveLine} from "../../../app/ActiveLineSlice";
import {connect} from "react-redux";
import {store} from "../../../app/store";


function mapStateToProps(state, ownProps) {
  const lineObj = state.assFile.present['Events'][ownProps.id];
  const activeLineID = state.activeLine;
  const activeLineObj = state.assFile.present['Events'][activeLineID];
  const selectedLines = state.selectedLines;
  return {lineObj, activeLineID, activeLineObj, selectedLines};
}

const mapDispatchToProps = {
  setSelectedLines,
  setActiveLine
}


/**
 * A line in the subtitle grid
 */
class GridLine extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * on click always changes active line to this line, thus also changing edit box value
   * depending on modifier keys (ctrl&shift), selected lines change as well.
   * @param {MouseEvent} event
   */
  handleOnClick(event) {
    console.log("gridLine clicked");
    event.preventDefault();
    // event.stopPropagation();
    document.getElementById("edit-box-dom-elem-id").value = this.props.lineObj.Text;
    // TODO: stop propagation or do nothing here if context menu open? or use onclickCapture?
    const lineOrdering = store.getState().lineOrdering.present;
    const selfIndex = lineOrdering.indexOf(this.props.id);
    const activeLineIndex = lineOrdering.indexOf(this.props.activeLineID);

    // shift takes precedence over ctrl key over alt
    if (event.shiftKey) {
      const [start, end] = selfIndex > activeLineIndex ?
        [activeLineIndex, selfIndex] : [selfIndex, activeLineIndex];

      const selectionRange = lineOrdering.slice(start, end);
      let newSelectedLines;
      if (selectionRange.every(v => this.props.selectedLines.includes(v))) {
        newSelectedLines = this.props.selectedLines.slice();
        // if everything is selected, deselect but not including self
        if (selfIndex < activeLineIndex) {
          for (let i = activeLineIndex; i > selfIndex; i--) {
            const line = lineOrdering[i];
            newSelectedLines.splice(newSelectedLines.indexOf(line), 1);
          }
        }
        else {
          for (let i = activeLineIndex; i < selfIndex; i++) {
            const line = lineOrdering[i];
            newSelectedLines.splice(newSelectedLines.indexOf(line), 1);
          }
        }
      }
      else {  // select everything inclusive of start and end
        newSelectedLines = lineOrdering.slice(start, end + 1);
      }
      this.props.setSelectedLines(newSelectedLines);
    }
    // add/remove self to/from selectedLines, can't deselect the only selected line
    else if (event.ctrlKey) {
      const selfID = this.props.id;
      const selfIndex = this.props.selectedLines.indexOf(selfID);
      // already selected
      if (selfIndex !== -1) {
        // and not the only one, remove
        if (this.props.selectedLines.length > 1) {
          const newSelectedLines = this.props.selectedLines.slice().splice(selfIndex, 1);
          this.props.setSelectedLines(newSelectedLines);
        }
      }
      else {  // not selected, add self
        this.props.setSelectedLines(this.props.selectedLines.slice().push(selfID));
      }
    }
    // alt key only changes active line to self, doesn't modify selectedLines
    else if (event.altKey) {
      this.props.setActiveLine(this.props.id);
    }
    else {  // no modifier key, set active and selected to self
      this.props.setActiveLine(this.props.id);
      this.props.setSelectedLines([this.props.id]);
    }
  }

  render() {
    const lineObj = this.props.lineObj;
    let trClasses = '';
    trClasses += lineObj.isComment ? styles.comment : '';
    if (this.props.selectedLines.includes(this.props.id)) {
      trClasses += ' ' + styles.selected;
    }

    if (this.props.id === this.props.activeLineID) {  // is the active line
      trClasses += ' ' + styles.active;
    }
    else {  // not the active line, check for collision/overlap
      if (lineObj.Start < this.props.activeLineObj.End &&
        lineObj.End > this.props.activeLineObj.Start) {
        trClasses += ' ' + styles.collision;
      }
    }

    return (
      <tr className={trClasses} onClick={this.handleOnClick}>
        <td className={styles.lineNumberField}>{this.props.lineNumber}</td>
        <td className={styles.timestampField}>{lineObj.Start}</td>
        <td className={styles.timestampField}>{lineObj.End}</td>
        <td className={styles.styleField}>{lineObj.Style}</td>
        <td className={styles.nameEffectFields}>{lineObj.Name}</td>
        <td className={styles.nameEffectFields}>{lineObj.Effect}</td>
        <td className={styles.textField}>{lineObj.Text}</td>
      </tr>
    );
  }
}

GridLine.propTypes = {
  id: PropTypes.string,
  lineNumber: PropTypes.number,
  lineObj: PropTypes.instanceOf(SubtitleLine),
  activeLineID: PropTypes.string,
  activeLineObj: PropTypes.instanceOf(SubtitleLine),
  selectedLines: PropTypes.arrayOf(PropTypes.string),
};

// if a line is neither selected nor active both previously and currently,
// there's no way it can change or needs re-rendering, return false to skip it when store updates
export default connect(mapStateToProps, mapDispatchToProps, null)(GridLine);
// {
//   areStatesEqual: (nextState, prevState, nextOwnProps, prevOwnProps) => {
//     const id = nextOwnProps.id;
//     if (id !== prevOwnProps.id) {
//       console.log('areStatesEqual on GridLine found different id', id, prevOwnProps.id);
//       return true;
//     }
//     return (!(nextState.selectedLines.includes(id) && prevState.selectedLines.includes(id) &&
//       nextState.activeLine === id && prevState.activeLine === id));
//   }
// }
// export default GridLine;
