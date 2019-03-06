import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import ShadowScrollbars from "../common/ShadowScrollbars"
import { Tabs, Button } from "antd"

import OverlayLoader from "../common/OverlayLoader"
import history from "../../history"

import ApplicationInfoCard from "./ApplicationInfoCard"
import {
  loadingSelector,
  byApplicationIdSelector,
  fetchApplicationCard
} from "../../modules/application"
import {
  fetchApplicationFiles,
  byApplicationIdAndFolderSelector
} from "../../modules/files"

const CustomTabs = styled(Tabs)`
  height: 100%;

  & .ant-tabs-bar {
    margin: 0;
  }

  & .ant-tabs-tabpane,
  & .ant-tabs-content {
    height: calc(100% - 64px - 16px - 16px);
  }
`

const Title = styled.span`
  color: rgba(0, 0, 0, 0.85);
  margin: 0 0 10px 16px;
  font-size: 1.5em;
  font-weight: 500;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 26px;
  background-color: #fff;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  & .ReactVirtualized__Grid {
    outline: none;
  }
`

class ApplicationTabs extends React.Component {
  componentDidMount() {
    this.props.fetchApplicationCard(this.props.applicationId)
    this.props.fetchApplicationFiles(this.props.applicationId)
  }

  goBack = () => history.goBack()

  render() {
    const { application, loading, files } = this.props
    return (
      <Wrapper>
        {loading && <OverlayLoader backgroundOpacity={0.6} />}
        <div>
          <Button
            shape="circle"
            icon="arrow-left"
            style={{ marginBottom: "16px" }}
            onClick={this.goBack}
          />
          <Title>
            {"Информация о заявлении №"}
            {application ? application.appNum : null}
          </Title>
        </div>
        <CustomTabs type="card">
          <CustomTabs.TabPane
            tab="Основная информация"
            key="info"
            style={{ height: "100%" }}
          >
            <ShadowScrollbars
              autoHide
              style={{ height: "100%" }}
              onScroll={this.handleScroll}
            >
              <ApplicationInfoCard
                application={application}
                files={files}
              />
            </ShadowScrollbars>
          </CustomTabs.TabPane>
        </CustomTabs>
      </Wrapper>
    )
  }
}

export default connect(
  (state, props) => ({
    application: byApplicationIdSelector(state, props),
    files: byApplicationIdAndFolderSelector(state, props, "Application"),
    loading: loadingSelector(state)
  }),
  {
    fetchApplicationCard,
    fetchApplicationFiles
  }
)(ApplicationTabs)
