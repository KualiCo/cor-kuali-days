import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Login from './components/login'
import Main from './components/main'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path='/' component={Main} />
          <Route path='/login' component={Login} />
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
