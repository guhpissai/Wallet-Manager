import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsPrice, editExpense, editClick } from '../redux/actions';
import styles from './WalletForm.module.css';
import Input from './Input';

class WalletForm extends Component {
  state = {
    id: 0,
    moeda: 'USD',
    valor: '',
    despesa: 'Alimentação',
    descricao: '',
    metodo: 'Dinheiro',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  render() {
    const { coins, dispatch, edit, idToEdit } = this.props;
    const { id, moeda, valor, despesa, descricao, metodo } = this.state;
    return (
      <div className={ styles.walletForm }>
        <form
          className={ `${styles.formContainer}` }
          onSubmit={ (e) => {
            e.preventDefault();
            if (!edit) {
              dispatch(
                fetchCoinsPrice({
                  id,
                  value: valor,
                  description: descricao,
                  currency: moeda,
                  method: metodo,
                  tag: despesa,
                }),
              );
              this.setState((prevState) => ({
                id: prevState.id + 1,
                valor: '',
                descricao: '',
              }));
            } else {
              dispatch(
                editExpense({
                  id: Number(idToEdit),
                  value: valor,
                  description: descricao,
                  currency: moeda,
                  method: metodo,
                  tag: despesa,
                }),
              );
              dispatch(editClick(edit && !edit));
            }
          } }
        >
          <Input
            type="text"
            dataTestId="description-input"
            onChange={ this.handleChange }
            value={ descricao }
            label="Descrição da despesa"
            name="descricao"
          />
          <label className=".select-container">
            Categoria da despesa
            <select
              data-testid="tag-input"
              name="despesa"
              value={ despesa }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label>
            Método de pagamento
            <select
              data-testid="method-input"
              name="metodo"
              value={ metodo }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <Input
            label="Valor"
            dataTestId="value-input"
            type="number"
            name="valor"
            onChange={ this.handleChange }
            value={ valor }
          />
          <label>
            Moeda
            <select
              data-testid="currency-input"
              name="moeda"
              value={ moeda }
              onChange={ this.handleChange }
            >
              {coins.map((coin) => (
                <option key={ coin }>{coin}</option>
              ))}
            </select>
          </label>
          <button type="submit" className={ styles.buttonWallet }>
            {!edit ? 'Adicionar despesa' : 'Editar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  exchange: state.wallet.exchange,
  isLoadingThunk: state.wallet.isLoading,
  edit: state.wallet.edit,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
  edit: PropTypes.bool.isRequired,
};
