import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import defaultVideo from '../../../static/vid.mp4'
import VideoControls from "./VideoControls/VideoControls";

const videoDomID = "video-dom-elem-id";

/**
 * The video and some related display and controls etc.
 */
class VideoArea extends Component {
  // TODO: use object-fit: contain, and set width of video

  constructor(props, context) {
    super(props, context);
    this.videoRef = createRef();
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <video id={videoDomID} ref={this.videoRef}
               style={{objectFit: "contain", width: "40vw", height: "auto"}}
               autoPlay={false} controls={false} src={defaultVideo}></video>

        <VideoControls vidRef={this.videoRef}/>
      </div>
    );
  }
}

VideoArea.propTypes = {};

export default VideoArea;
export {videoDomID};
