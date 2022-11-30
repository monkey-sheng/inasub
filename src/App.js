import "./App.css"
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DropDownMenusBar from "./features/DropdownMenusBar/DropDownMenusBar";
import QuickActionsBar from "./features/QuickActionsBar/QuickActionsBar";
import MainEditingArea from "./features/MainEditingArea/MainEditingArea";
import SubtitleGrid from "./features/SubtitleGrid/SubtitleGrid";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css'
import {Modal} from "react-bootstrap";

class App extends Component {

  closeModal() {
    this.setState({modal_show: false});
  }

  constructor(props, context) {
    super(props, context);
    this.state = {modal_show: true};
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    return (
      <>
      <Modal centered size="lg" show={this.state.modal_show}
      onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome to Inasub, a Work In Progress!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>It is not yet functional, BUT...</h4>
          <p>
            Main heavy-lifting work behind it is largely finished.
            I'll need to make it work with the front end, way to go!
          </p>
          <p>
            It looks pretty ugly right now, I know. Styling and polishing will take time and come later.
            Design for front end is finalized, components large and small are under active development.
            Give it some time before everything is wired up as a whole!
          </p>
        </Modal.Body>
      </Modal>
      {/* TODO: flex layout*/}
      <div className="d-flex flex-column align-items-stretch"
           style={{width: '100vw', height: '100vh'}}>

        <div className={"d-flex flex-row align-items-stretch" + styles.dropdownMenusBar}>
          <DropDownMenusBar/>
        </div>

        <div className={"d-flex flex-row align-items-stretch" + styles.quickActionsBar}>
          <QuickActionsBar/>
        </div>

        <div className="" style={{height: "auto", width: "100%"}}>
          <MainEditingArea/>
        </div>

        <div className="flex-grow-1">
          <SubtitleGrid/>
        </div>
      </div>
        </>
    );
  }
}

App.propTypes = {};

export default App;
