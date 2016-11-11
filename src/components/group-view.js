import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'

class GroupView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { group, category } = this.props
    if (!group) return null
    return (
      <Paper>
        <List>
          <ListItem
            primaryText="Name"
            secondaryText={group.name}
          />
          {group.categoryId && <ListItem
            primaryText="Category"
            secondaryText={category.name}
          />}
          {group.fields && group.fields.map((field) => {
            return (
              <ListItem
                key={field.id}
                primaryText={category.fieldSchemas.find((schema) => {
                  return field.id === schema.id
                }).name}
                secondaryText={field.value}
              />
            )
          })}
        </List>
      </Paper>
    )
  }
}

export default GroupView
