import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

export default class Input extends Component {
  render() {
    const { onChange, value, name, type, dataTestId, label } = this.props;
    return (
      <div className={ styles.wrapper }>
        <label htmlFor={ name } className={ styles.label }>
          {label}
          <input
            className={ styles.input }
            data-testid={ dataTestId }
            type={ type }
            name={ name }
            onChange={ onChange }
            value={ value }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
