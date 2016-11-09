import React, { Component } from 'react'
import axios from 'axios'
import styles from './index.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {}
    this.updateUsername = this.updateUsername.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateUsername(e) {
    this.setState({ username: e.target.value })
  }

  updatePassword(e) {
    this.setState({ password: e.target.value })
  }

  submit() {
    axios.post('/api/login', {}, {
      auth: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(() => {
      window.location = '/'
    })
  }

  render() {
    return (
      <div className={styles.paper}>
        <input
          onChange={this.updateUsername}
        />
        <input
          type="password"
          onChange={this.updatePassword}
        />
        <button onClick={this.submit} />
      </div>
    )
  }
}

export default Login
