import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
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
      <Paper className={styles.paper}>
        <TextField
          floatingLabelText="Username"
          hintText="Username"
          onChange={this.updateUsername}
        />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          onChange={this.updatePassword}
        />
        <RaisedButton label="Primary" primary={true} onClick={this.submit} />
      </Paper>
    )
  }
}

export default Login