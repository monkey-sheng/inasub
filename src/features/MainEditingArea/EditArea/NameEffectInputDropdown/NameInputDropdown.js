import React, {Component} from 'react';
import {Dropdown} from "react-bootstrap";
import styles from './InputDropdown.module.css'
import {store} from "../../../../app/store";

class NameInputDropdown extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {allUniqueActorNames: []}
    this.selfToggleID = "nameInputDropdownToggle";
    this.getAllUniqueActorNames = this.getAllUniqueActorNames.bind(this);
  }

  getAllUniqueActorNames() {
    const allNames = [];
    for (const [id, line] of Object.entries(store.getState().assFile.present['Events'])) {
      allNames.push(line.Name)
    }
    const uniqueNames = [...new Set(allNames)];
    return uniqueNames.map((name) => <Dropdown.Item>{name}</Dropdown.Item>)
  }

  render() {
    return (
      <Dropdown className={"d-flex flex-row align-items-center " + styles.dropdownContainer}
                align="end"
                onToggle={(show) => {
                  if (show) {
                    this.setState({allUniqueActorNames: this.getAllUniqueActorNames()})
                  }
                }}
      >
        <input type="text" placeholder="Actor" className={"flex-grow-1 " + styles.dropdownInput}/>
        <Dropdown.Toggle variant="secondary" size="sm" className={styles.toggle}></Dropdown.Toggle>
        <Dropdown.Menu className={styles.menu}>
          {this.state.allUniqueActorNames}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NameInputDropdown.propTypes = {};

export default NameInputDropdown;
