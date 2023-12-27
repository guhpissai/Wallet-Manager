import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { inputEmail } from '../redux/actions';
import styles from './Login.module.css';
import Input from '../components/Input';

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
      <section className={ styles.login }>
        <div className={ `${styles.forms} animateLeft` }>
          <h1 className="title">Fique sob o controle das suas despesas</h1>
          <form
            onSubmit={ (e) => {
              e.preventDefault();
              dispatch(inputEmail(email));
              history.push('/carteira');
            } }
          >
            <Input
              type="email"
              name="email"
              label="Email"
              dataTestId="email-input"
              onChange={ this.handleChange }
            />
            <Input
              type="password"
              name="password"
              label="Senha"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <button
              className={ styles.buttonLogin }
              disabled={
                !(this.isValidEmail() && password.length >= lengthNumber)
              }
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
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
