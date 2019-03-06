import React from "react"
import styled from "styled-components"
import moment from "moment"
import { Link as RouterLink } from "react-router-dom"

import * as theme from "../../theme"

const Wrapper = styled.div`
  position: relative;
  padding: 0 20px;
`
const Inner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid #ebebeb;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 1 20%;
  margin-right: 10px;
  font-weight: 600;
  user-selection: none;
`
const Link = styled(RouterLink)`
  color: rgba(0, 0, 0, 0.65);
  width: 100%;

  &:hover {
    border-bottom: 1px dotted ${props => theme["@primary-color"]};
    border-bottom: none;
  }
`
const Status = styled.div`
  background-color: ${props => theme["@primary-color"]};
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  min-width: 140px;
  max-width: 100px;
  font-weight: 500;
  flex: 0 0 18%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

class ApplicationListItem extends React.PureComponent {
  render() {
    const {
      record: { appId, stateName, appNum, appDate }
    } = this.props

    const content = (
      <Row>
        <Title>
          Заявление {appNum} от {moment(appDate).format("DD.MM.YYYY")}
        </Title>
        <Status>
          {stateName}
        </Status>
      </Row>
    )

    return (
      <Wrapper>
        <Inner>
          <Link to={`/lk/application/${appId}`}>{content}</Link>
        </Inner>
      </Wrapper>
    )
  }
}

export default ApplicationListItem
