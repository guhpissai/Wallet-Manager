import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header className={ `${styles.header}` }>
        <div className={ `${styles.nav} container` }>
          <div className={ styles.coin }>
            <p data-testid="header-currency-field">BRL</p>
            <p data-testid="total-field">
              {total
                .reduce(
                  (acc, c) => acc
                    + Number(c.exchangeRates[c.currency].ask) * Number(c.value),
                  0,
                )
                .toFixed(2)}
            </p>
          </div>
          <p data-testid="email-field">{email}</p>
        </div>
      </header>
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
  total: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
