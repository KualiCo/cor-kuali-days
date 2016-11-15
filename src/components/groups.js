import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'
import SimpleTree from '@kuali/simple-tree'
import axios from 'axios'
import GroupView from './group-view'
import Menu from './menu'

class Groups extends Component {
  static contextTypes = {
    router: PropTypes.any
  }

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
    axios.get('/api/current-user')
      .catch(() => {
        this.context.router.push('/login')
      })
  }

  getData() {

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
      <div>
        <Paper className="paper">
          <Menu />
        </Paper>
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
      </div>
    )
  }
}

export default Groups
