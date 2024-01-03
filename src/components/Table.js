import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editClick } from '../redux/actions';
import { ReactComponent as Delete } from '../images/delete-icon.svg';
import { ReactComponent as Edit } from '../images/edit-icon.svg';

class Table extends Component {
  render() {
    const { despesas, dispatch, edit } = this.props;
    return (
      <div className="table-container">
        <tbody className="table">
          <thead className="tr-header">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          {despesas.length > 0
            && despesas.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>
                  {Number(element.exchangeRates[element.currency].ask).toFixed(
                    2,
                  )}
                </td>
                <td>
                  {(
                    Number(element.exchangeRates[element.currency].ask)
                    * Number(element.value)
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    id={ element.id }
                    onClick={ ({ target }) => dispatch(editClick(!edit, target.id)) }
                  >
                    <Edit />
                  </button>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => dispatch(
                      deleteExpense(
                        element.id,
                        Number(element.exchangeRates[element.currency].ask)
                            * Number(element.value),
                      ),
                    ) }
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
  edit: state.wallet.edit,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  despesas: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};
