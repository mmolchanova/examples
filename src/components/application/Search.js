import React from "react"
import { connect } from "react-redux"
import { Input } from "antd"

import { filterValueSelector, filterItems } from "../../modules/filters"

class Search extends React.PureComponent {
  componentDidMount() {
    this.props.filterItems("")
  }

  componentWillUnmount() {
    this.props.filterItems("")
  }

  handleChange = e => {
    const { value } = e.target
    this.props.filterItems(value)
  }
  
  handleSearch = value => {
    this.props.filterItems(value)
  }

  render() {
    const { filterValue } = this.props
    return (
      <Input.Search
        value={filterValue}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        placeholder="Поиск"
      />
    )
  }
}

export default connect(
  state => ({
    filterValue: filterValueSelector(state)
  }),
  {
    filterItems
  }
)(Search)
