import React from 'react';
import axios from 'axios';
import View from './View.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claim: [],
      username: null,
      password: null,
      errors: {
        username: '',
        password: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'username':
        errors.username =
          value.length < 5
            ? 'User Name must be at least 5 characters long!'
            : '';
        break;
      case 'password':
        errors.password =
          value.length < 5
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.claim.map(claim => {
        if ((this.state.username == claim.username) && ((this.state.password == claim.password))) {
            this.props.history.push('/view');
        }
    })
    console.log(this.state.username);
    console.log(this.state.password);
  }
  componentDidMount() {
    axios.get(`http://localhost:7005/users`)
        .then(res => {
            this.setState({
                claim: res.data,
            });
        })
}

  render() {
    const { errors } = this.state;
    return (
      <div>
        <header>
          <h1>Claim Management System</h1>
        </header>
        <div className='wrapper'>
          <div className='form-wrapper'>
            <h2>Log in</h2>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className='password'>
                <label htmlFor="password">User Name</label>
                <input type='text' name='username' defaultValue={this.state.username} onChange={this.handleUsername} onChange={this.handleChange} noValidate />
                {errors.username.length > 0 &&
                  <span className='error'>{errors.username}</span>}
              </div>
              <div className='password'>
                <label htmlFor="password">Password</label>
                <input type='password' name='password' defaultValue={this.state.password} onChange={this.handlePassword} onChange={this.handleChange} noValidate />
                {errors.password.length > 0 &&
                  <span className='error'>{errors.password}</span>}
              </div>
              <div className='submit'>
                <button>Log in</button>
              </div>
            </form>
          </div>
        </div>
        <footer>
          <p></p>
        </footer>
      </div>
    );
  }
}

export default Login;

