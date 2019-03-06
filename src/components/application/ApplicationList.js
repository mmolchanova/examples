import React from "react"
import { connect } from "react-redux"
import { Pagination, Button } from "antd"
import styled from "styled-components"


import history from "../../history"
import List from "../common/List"

import simpleSearchFilter from "./simpleSearchFilter"
import ApplicationListItem from "./ApplicationListItem"

import { userDataSelector } from "../../modules/lkAuth"
import {
  //selectors
  dataSelector,
  loadingSelector,

  //AC
  fetchApplicationsByUserId
} from "../../modules/application"
import { filterValueSelector } from "../../modules/filters"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 1px;
  background-color: #fff;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const TitleRow = styled.div`
  width: 100%;
  display: flex;
`

class ApplicationList extends React.PureComponent {
  state = {
    current: 1
  }
  componentDidMount() {
    const { uId } = this.props
    this.props.fetchApplicationsByUserId(uId)
  }

  createNewApplication = () => {
    history.push("/lk/create_new_application")
  }

  getTitle = () => {
    return (
      <TitleRow>
        <span>{`Мои заявления (${this.props.data.length})`}</span>
        <Button
          icon="plus"
          style={{ marginLeft: "32px" }}
          type="primary"
          onClick={this.createNewApplication}
        >
          Подать заявление
        </Button>
      </TitleRow>
    )
  }

  onChange = page => {
    this.setState({
      current: page
    })
  }

  rowRenderer = props => {
    return <ApplicationListItem {...props} />
  }

  render() {
    const { loading, data, filterValue } = this.props
    const { current } = this.state

    return (
      <Wrapper>
        <List
          height={"calc(100% - 32px)"}
          title={this.getTitle()}
          loading={loading}
          data={simpleSearchFilter(data, filterValue)}
          rowRenderer={this.rowRenderer}
        />
        <Pagination
          style={{ margin: "0 8px 8px 0" }}
          onChange={this.onChange}
          current={current}
          total={data.length}
        />
      </Wrapper>
    )
  }
}

export default connect(
  (state, props) => ({
    filterValue: filterValueSelector(state),
    data: dataSelector(state, props),
    uId: userDataSelector(state).userID,
    loading: loadingSelector(state)
  }),
  {
    fetchApplicationsByUserId
  }
)(ApplicationList)
