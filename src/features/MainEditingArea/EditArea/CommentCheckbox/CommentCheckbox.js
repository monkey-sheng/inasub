import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {store} from "../../../../app/store";
import {assFileActions} from "../../../../app/AssFileSlice";
import {connect} from "react-redux";

function mapStateToProps(state) {
  const activeLineIsComment = state.assFile.present['Events'][state.activeLine].isComment;
  console.log("mapStateToProps isComment", activeLineIsComment);
  return {activeLineIsComment}
}

const mapDispatchToProps = {
  setIsComment: assFileActions.setIsComment
}

class CommentCheckbox extends Component {

  constructor(props, context) {
    super(props, context);
    this.checkboxRef = createRef();
    this.handleCommentCheckbox = this.handleCommentCheckbox.bind(this);
  }

  handleCommentCheckbox(event) {
    // const isChecked = !this.checkboxRef.current.checked;
    console.log("event", event.target.checked)
    const isChecked = event.target.checked;
    const selectedLines = store.getState().selectedLines;
    console.log("dispatch setIsComment", isChecked);
    this.props.setIsComment(selectedLines, isChecked);
    console.log("is comment:",store.getState().assFile.present.Events[selectedLines[0]].isComment)
    // this.checkboxRef.current.checked = isChecked;
    console.log("ref checked:",isChecked);
    // event.preventDefault();
  }

  // TODO: style
  // TODO: NOTE: needs key= otherwise it never updates checkbox dom
  render() {
    const isChecked = this.props.activeLineIsComment ? true : false;
    let checkbox_elem;
    if (isChecked) {
      checkbox_elem = <input id="isCommentCheckbox" type="checkbox"
                             key={"isCommentCheckbox"}
                             ref={this.checkboxRef}
                             checked={true}
                             onChange={this.handleCommentCheckbox}/>;
    }
    else {
      checkbox_elem = <input id="isCommentCheckbox" type="checkbox"
                             key={"isCommentCheckbox-false"}
                             ref={this.checkboxRef}
                             checked={false}
                             onChange={this.handleCommentCheckbox}/>;
    }
    console.log("render isChecked", isChecked)
    return (
      <div className="d-flex flex-row align-items-center">
        {checkbox_elem}
        <label htmlFor="isCommentCheckbox">Comment</label>
      </div>
    );
  }
}

CommentCheckbox.propTypes = {
  setIsComment: PropTypes.func,
  activeLineIsComment: PropTypes.bool
};

// export default CommentCheckbox;
export default connect(mapStateToProps, mapDispatchToProps)(CommentCheckbox);
