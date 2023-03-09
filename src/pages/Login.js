import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { inputEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  isValidEmail = () => {
    const { email } = this.state;
    const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return !!email.match(mailformat);
  };

  render() {
    const { password, email } = this.state;
    const { dispatch, history } = this.props;
    const lengthNumber = 6;
    return (
      <div>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            dispatch(inputEmail(email));
            history.push('/carteira');
          } }
        >
          <label id="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ !(this.isValidEmail() && password.length >= lengthNumber) }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
