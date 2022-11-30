import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './VideoButtonsInfoBar.module.css';

class VideoButtonsInfoBar extends Component {
  render() {
    return (
      <div className="d-flex flex-row" style={{height: "3vw"}}>
        <div className={styles.controlButton}>
           {/*TODO: PLAY*/}
        </div>
        <div className={styles.controlButton}>
          {/* TODO: PLAY current line*/}
        </div>
        <div className={styles.controlButton}>
          {/*// TODO: pause*/}
        </div>
      </div>
    );
  }
}

VideoButtonsInfoBar.propTypes = {
  vidRef: PropTypes.any
};

export default VideoButtonsInfoBar;
