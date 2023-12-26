import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { onChange, value, name, type, dataTestId, label } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {label}
          <input
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
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
