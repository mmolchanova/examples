import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Button } from "antd"

import { completeTask } from "../../modules/tasks"
import { pendingRequestChainSelector, getLoader, hideLoader } from "../../modules/ui"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 16px;
`
const Section = styled.section`
  margin: 24px 0;
`
const Title = styled.div`
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 10px;
  font-size: 1.5em;
  font-weight: 500;
`

class SendActInvoice extends React.Component {
  handleCompleteTask = e => {
    e.preventDefault()
    if (this.props.pendingRequestChain) return
    this.props.getLoader()
    this.props.completeTask(this.props.taskId, this.props.hideLoader)
  }

  render() {
    const { project } = this.props
    return (
      <Wrapper>
        <Title>
          {`Проект ${project
            ? project.projNumber
            : null} выполнен. Вам требуется направить заявителю акт выполненных работ и счет об оплате`}
        </Title>
        <Section>
          <Button
            type="primary"
            onClick={this.handleCompleteTask}
            disabled={this.props.pendingRequestChain}
          >
            Акт и счет направлены
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
  {
    getLoader,
    hideLoader,
    completeTask
  }
)(SendActInvoice)
