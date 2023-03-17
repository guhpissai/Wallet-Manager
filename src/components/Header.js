import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div className="header-background">
        <div className="header">
          <p data-testid="header-currency-field">BRL</p>
          <p data-testid="total-field">
            {
              total.reduce((acc, c) => acc + (Number(c.exchangeRates[c.currency].ask)
               * Number(c.value)), 0).toFixed(2)
            }
          </p>
          <p data-testid="email-field">{email}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
