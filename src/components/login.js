import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.any
  }
  constructor() {
    super()
    this.state = {}
    this.updateUsername = this.updateUsername.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateUsername(e) {
    this.setState({ username: e.target.value, error: undefined })
  }

  updatePassword(e) {
    this.setState({ password: e.target.value, error: undefined })
  }

  submit() {
  }

  render() {
    return (
      <Paper className="paper">
        <TextField
          floatingLabelText="Username"
          hintText="Username"
          onChange={this.updateUsername}
          errorText={this.state.error}
        /><br/>
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          onChange={this.updatePassword}
          errorText={this.state.error}
        /><br/>
        <RaisedButton label="Log in" primary={true}  onClick={this.submit} />
      </Paper>
    )
  }
}

export default Login
