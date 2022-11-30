import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import GridLine from "./GridLine/GridLine";
import {showSubtitleGridContextMenu} from '../../app/UIStatesSlice'
import styles from "./SubtitleGrid.module.css";
import {connect} from "react-redux";
import ContextMenu from "./ContextMenu/ContextMenu";

function mapStateToProps(state) {
  return {
    lineOrdering: state.lineOrdering.present,  // lineOrdering is undoable
    showContextMenu: state.uiStates.subtitleGridContextMenu,
  }
}

const mapDispatchToProps = {
  showSubtitleGridContextMenu,
}

/**
 * the grid of all subtitle lines. Actually it's a table
 */
class SubtitleGrid extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleOnContextMenu = this.handleOnContextMenu.bind(this);
    this.contextRef = createRef();
  }

  /**
   * display the context menu when right-clicking grid
   * @param {MouseEvent} event
   */
  handleOnContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    let x = event.clientX, y = event.clientY;
    if (x + this.contextRef.current.offsetWidth > window.innerWidth) {
      x = x - this.contextRef.current.offsetWidth;
    }
    if (y + this.contextRef.current.offsetHeight > window.innerHeight) {
      y = y - this.contextRef.current.offsetHeight;
    }
    this.props.showSubtitleGridContextMenu(x, y);
  }

  render() {
    const lineOrdering = this.props.lineOrdering;
    const gridLines = [];
    lineOrdering.forEach((lineID, i) => {
      gridLines.push(
        <GridLine key={lineID} id={lineID} lineNumber={i+1}/>
      );
    })
    // TODO: style the <th>
    return (
      <>
        <table className={styles.gridContainer} onContextMenu={this.handleOnContextMenu}>
          <thead>
          <tr>
            <th> #</th>
            <th> Start</th>
            <th> End</th>
            <th> Style</th>
            <th> Actor</th>
            <th> Effect</th>
            <th style={{width: '60%'}}> Text</th>
          </tr>
          </thead>

          <tbody>
            {gridLines}
          </tbody>
        </table>

        <ContextMenu fwdRef={this.contextRef}/>
      </>
    );
  }
}

SubtitleGrid.propTypes = {
  lineOrdering: PropTypes.arrayOf(PropTypes.string),
  showContextMenu: PropTypes.object,
};

// export default SubtitleGrid;
export default connect(mapStateToProps, mapDispatchToProps)(SubtitleGrid);
