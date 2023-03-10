import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { actionFetchCoin } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCoin());
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default connect()(Wallet);

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
