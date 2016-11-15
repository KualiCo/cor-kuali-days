import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'

class GroupView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { group, category } = this.props
    console.log(group, category)
    if (!group) return null
    return (
      <Paper>
        <List>
          <ListItem
            primaryText={group.name}
          />
        </List>
      </Paper>
    )
  }
}

export default GroupView
