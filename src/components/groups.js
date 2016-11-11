import React, { Component } from 'react'
import SimpleTree from '@kuali/simple-tree'
import axios from 'axios'
import GroupView from './group-view'

class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      categories: [],
      selectedGroup: null,
      selectedCategory: null
    }
    this.selectNode = this.selectNode.bind(this)
    this.deselectNode = this.deselectNode.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    Promise
      .all([
        axios.get('/api/groups').then((res) => res.data),
        axios.get('/api/categories').then((res) => res.data)
      ])
      .then(([ groups, categories ]) => {
        this.setState({ groups, categories })
      })
  }

  selectNode(group) {
    this.setState({
      selectedGroup: group.data,
      selectedCategory: this.state.categories.find((category) => {
        return group.data.categoryId === category.id
      })
    })
  }

  deselectNode() {
    this.setState({
      selectedGroup: null,
      selectedCategory: null
    })
  }

  render() {
    const { selectedGroup, selectedCategory } = this.state
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ top: 10, left: 10, position: 'absolute' }}>
          <GroupView group={selectedGroup} category={selectedCategory} />
        </div>
        <SimpleTree
          name="Groups"
          data={this.state.groups}
          width={1200}
          height={1000}
          padding={[ 20, 250, 20, 120 ]}
          onNodeClick={this.selectNode}
          onOffClick={this.deselectNode}
          selected={selectedGroup && selectedGroup.id}
        />
      </div>
    )
  }
}

export default Groups
