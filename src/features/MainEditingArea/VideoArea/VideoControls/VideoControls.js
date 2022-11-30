import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VideoSeekBar from "./VideoSeekBar";
import VideoButtonsInfoBar from "./VideoButtonsInfoBar";

/**
 * Controls and some info displays, such as the seek bar, play/pause, zoom level; current time etc.
 */
class VideoControls extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <VideoSeekBar vidRef={this.props.vidRef}/>
        <VideoButtonsInfoBar vidRef={this.props.vidRef}/>
      </div>
    );
  }
}

VideoControls.propTypes = {
  vidRef: PropTypes.any
};

export default VideoControls;
