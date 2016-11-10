import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import axios from 'axios'

class Main extends Component {
  static contextTypes = {
    router: React.PropTypes.any
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    axios.get('/api/current-user').then(res => {
      this.setState({
        user: res.data
      })
    })
    .catch(() => {
      this.context.router.push('/login')
    })
  }

  render() {
    return (
      <Paper className="paper">
        {(this.state.user &&
          <div>
            <div className="header">
              <span className="current-user">Logged in as: {this.state.user.displayName}</span>
            </div>
          </div>
        )}
      </Paper>
    )
  }
}

export default Main
