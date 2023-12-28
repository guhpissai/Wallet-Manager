import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { actionFetchCoin } from '../redux/actions';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCoin());
  }

  render() {
    return (
      <div>
        <Header />
        <div className={ styles.walletForm }>
          <WalletForm />
          <Table />
        </div>
      </div>
    );
  }
}

export default connect()(Wallet);

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
