import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import axios from 'axios'

class Main extends Component {
  static contextTypes = {
    router: React.PropTypes.any
  }
  constructor() {
    super()
    this.state = {
      userList: [],
      selectedUsers: {}
    }
    this.rowSelection = this.rowSelection.bind(this)
    this.setUserList = this.setUserList.bind(this)
    this.approve = this.approve.bind(this)
  }

  componentWillMount() {
    axios.get('/api/current-user').then(res => {
      this.setState({
        user: res.data
      })
    })
    .then(this.setUserList)
    .catch(() => {
      this.context.router.push('/login')
    })
  }

  setUserList() {
    return axios.get('/api/unapproved-users')
    .then(res => {
      this.setState({
        userList: res.data
      })
    })
  }

  rowSelection(row) {
    let selectedUsers
    if (row === 'all') {
      selectedUsers = this.state.userList.reduce((list, u) => {
        return {
          ...list,
          [u.id]: true
        }
      }, {})
    } else if (row === 'none') {
      selectedUsers = {}
    } else if (row instanceof Array) {
      selectedUsers = row.reduce((list, i) => {
        return {
          ...list,
          [this.state.userList[i].id]: true
        }
      }, {})
    }
    this.setState({
      selectedUsers
    })
  }

  approve() {
    const selectedUsers = this.state.userList.reduce((list, u) => {
      if (this.state.selectedUsers[u.id]){
        list.push(u)
      }
      return list
    }, [])
    axios.post('/api/approve-users',
      selectedUsers
    ).then(this.setUserList)
  }

  render() {
    return (
      <Paper className="paper">
        {(this.state.user &&
          <div>
            <div className="header">
              <span className="current-user">Logged in as: {this.state.user.displayName}</span>
              <h3>Unapproved Users</h3>
            </div>
            <Table multiSelectable={true}
              onRowSelection={this.rowSelection}
            >
              <TableHeader enableSelectAll={true}>
                <TableRow>
                  <TableHeaderColumn>Username</TableHeaderColumn>
                  <TableHeaderColumn>Email</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Created At</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {this.state.userList.map(user => (
                  <TableRow key={user.id} selected={this.state.selectedUsers[user.id]}>
                    <TableRowColumn>{user.username}</TableRowColumn>
                    <TableRowColumn>{user.email}</TableRowColumn>
                    <TableRowColumn>{user.displayName}</TableRowColumn>
                    <TableRowColumn>{new Date(user.createdAt).toString()}</TableRowColumn>
                  </TableRow>))
                }
              </TableBody>
            </Table>
            <RaisedButton
              className="approve"
              label="Approve"
              primary={true}
              onClick={this.approve}
            />
          </div>
        )}
      </Paper>
    )
  }
}

export default Main
