import React, {Component} from 'react';
import {Dropdown} from "react-bootstrap";
import styles from './InputDropdown.module.css'
import {store} from "../../../../app/store";
import PropTypes from 'prop-types';

class EffectInputDropdown extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {allUniqueEffects: []}
    this.getAllUniqueEffectNames = this.getAllUniqueEffectNames.bind(this);
  }

  getAllUniqueEffectNames() {
    const allEffects = [];
    for (const [id, line] of Object.entries(store.getState().assFile.present['Events'])) {
      allEffects.push(line.Effect)
    }
    const uniqueEffects = [...new Set(allEffects)];
    return uniqueEffects.map((effect) => <Dropdown.Item>{effect}</Dropdown.Item>)
  }
  render() {
    return (
      <Dropdown className={"d-flex flex-row align-items-center " + styles.dropdownContainer}
                align="end"
                onToggle={(show) => {
                  if (show) {
                    this.setState({allUniqueEffects: this.getAllUniqueEffectNames()})
                  }
                }}
      >
        <input type="text" placeholder="Effect" className={"flex-grow-1 " + styles.dropdownInput}/>
        <Dropdown.Toggle variant="secondary" size="sm" className={styles.toggle}></Dropdown.Toggle>
        <Dropdown.Menu className={styles.menu}>
          {this.state.allUniqueEffects}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

EffectInputDropdown.propTypes = {};

export default EffectInputDropdown;
