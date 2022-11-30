import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AudioArea from "./AudioArea/AudioArea";
import VideoArea from "./VideoArea/VideoArea";
import EditArea from "./EditArea/EditArea";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './MainEditingArea.module.css'

/**
 * Main area includes video, audio display, editing box etc.
 */
class MainEditingArea extends Component {
  // TODO: styles and layout
  // left column: video, right column: top row is audio, bottom row is edit area
  // video is resizable, thus left col should be auto (natural width) to accommodate,
  // and so will audio area, hence right col is also auto
  // TODO: audioArea and videoArea would then need their own media query to set child size accordingly
  // TODO: e.g. on xs screen both should be 100vw, or on md screen consider setting min/max width
  // edit area is 100% width regardless
  render() {
    // TODO: use flex instead of grid
    return (
      // <>
      //   <Col xs="auto">
      //     <VideoArea/>
      //   </Col>
      //   <Col xs="auto">
      //     <Row xs="12" className="no-gutters">
      //       <AudioArea/>
      //     </Row>
      //     <Row xs="12" className="no-gutters">
      //       <EditArea/>
      //     </Row>
      //   </Col>
      // </>
      <div className={"d-flex flex-row align-items-stretch " + styles.mainContainer}>
        <div className="align-self-center">
          <VideoArea/>
        </div>

        <div className={"flex-grow-1 d-flex flex-column align-items-stretch " +
          styles.audioAndEditingContainer}>

          <div className={"" + styles.audioArea}>
            <AudioArea/>
          </div>

          <div className="flex-grow-1">
            <EditArea/>
          </div>

        </div>

      </div>
    );
  }
}

MainEditingArea.propTypes = {};

export default MainEditingArea;
