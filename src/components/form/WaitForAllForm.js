import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Button } from "antd"

import { saveInTask, completeTask } from "../../modules/tasks"
import { pendingRequestChainSelector, getLoader, hideLoader } from "../../modules/ui"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 16px;
`
const Section = styled.section`
  margin: 24px 0;
`

class WaitForAllForm extends React.Component {
  state = {
    hasID: true
  }
  handleCompleteTask = e => {
    e.preventDefault()
    if (this.props.pendingRequestChain) return
    this.props.getLoader()
    this.props.saveInTask(this.props.taskId, "hasID", true, () => {
      this.props.completeTask(this.props.taskId, this.props.hideLoader)
    })
  }
  handleCompleteProcess = e => {
    e.preventDefault()
    if (this.props.pendingRequestChain) return
    this.props.getLoader()
    this.props.saveInTask(this.props.taskId, "hasID", false, () => {
      this.props.completeTask(this.props.taskId, this.props.hideLoader)
    })
  }

  render() {
    return (
      <Wrapper>
        <Section>
          <Button
            type="primary"
            onClick={this.handleCompleteTask}
            style={{ minWidth: "350px" }}
            disabled={this.props.pendingRequestChain}
          >
            Загрузить полученную исходную документацию
          </Button>
        </Section>
        <Section>
          <Button
            type="primary"
            onClick={this.handleCompleteProcess}
            style={{ minWidth: "350px" }}
            disabled={this.props.pendingRequestChain}
          >
            Исходная документация не предоставлена
          </Button>
        </Section>
      </Wrapper>
    )
  }
}

export default connect(
  state => ({
    pendingRequestChain: pendingRequestChainSelector(state)
  }),
  { getLoader, hideLoader, saveInTask, completeTask }
)(WaitForAllForm)
