import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import axios from 'axios'
import styles from './index.css'

class Main extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    axios.get('/api/current-user').then(res => {
      this.setState({
        user: res.data
      })
    })
  }

  render() {
    return (
      <div className={styles.paper}>
        {(this.state.user &&
        <span>Hey, {this.state.user.displayName}</span>
        )}
      </div>
    )
  }
}

export default Main
