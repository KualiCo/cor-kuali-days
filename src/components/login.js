import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.any
  }
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Paper className="paper">
        Login
      </Paper>
    )
  }
}

export default Login
