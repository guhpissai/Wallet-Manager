import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { coins } = this.props;
    return (
      <div className="form">
        <form className="form-container">
          <label>
            Valor
            <input data-testid="value-input" type="text" />
          </label>
          <label>
            Descrição da despesa
            <input data-testid="description-input" type="text" />
          </label>
          <label>
            Moeda
            <select data-testid="currency-input">
              {coins.map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>
          <label>
            Método de pagamento
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria da despesa
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
