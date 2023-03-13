import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsPrice } from '../redux/actions';

class WalletForm extends Component {

  state = {
    id: 0,
    moeda: 'USD',
    valor: '',
    despesa: 'Alimentação',
    descricao: '',
    metodo: 'Dinheiro',
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    })
  }

  render() {
    const { coins, dispatch } = this.props;
    const { id, moeda, valor, despesa, descricao, metodo } = this.state;
    return (
      <div className="form">
        <form 
        className="form-container"
        onSubmit={ (e) => {
          e.preventDefault()
          dispatch( fetchCoinsPrice({
            id: id,
            value: valor,
            description: descricao,
            currency: moeda,
            method: metodo,
            tag: despesa,
          }));
          this.setState({
            id: id + 1,
            valor: '',
            descricao: '',
          })
        } }>
          <label>
            Valor
            <input 
            data-testid="value-input" 
            type="text"
            name='valor'
            onChange={this.handleChange}
            value={valor} />
          </label>
          <label>
            Descrição da despesa
            <input 
            data-testid="description-input" 
            type="text"
            name='descricao'
            onChange={this.handleChange}
            value={descricao} />
          </label>
          <label>
            Moeda
            <select 
            data-testid="currency-input" 
            name='moeda'
            value={moeda}
            onChange={this.handleChange}>
              {coins.map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>
          <label>
            Método de pagamento
            <select 
            data-testid="method-input" 
            name='metodo'
            value={metodo}
            onChange={this.handleChange}>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label>
            Categoria da despesa
            <select 
            data-testid="tag-input"
            name='despesa'
            value={despesa}
            onChange={this.handleChange}>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type='submit'>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  exchange: state.wallet.exchange,
  isLoadingThunk: state.wallet.isLoading,
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
