import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

class Main extends Component {
  static contextTypes = {
    router: React.PropTypes.any
  }
  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <Paper className="paper">
        Hello
      </Paper>
    )
  }
}

export default Main
