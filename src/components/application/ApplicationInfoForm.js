import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Row, Form, Col, Input, Button } from "antd"

import history from "../../history"
import SimpleFileUploader from "../files/SimpleFileUploader"
import { validateEmptyFileSelect } from "../../utils"
import OverlayLoader from "../common/OverlayLoader"
import ShadowScrollbars from "../common/ShadowScrollbars"

import {
  pendingRequestChainSelector,
  getLoader,
  hideLoader
} from "../../modules/ui"
import { createApplication } from "../../modules/application"
import { uploadFile } from "../../modules/files"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 26px;
  background-color: #fff;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  min-width: 650px;

  & .ReactVirtualized__Grid {
    outline: none;
  }
`
const Title = styled.div`
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 10px;
  font-size: 1.5em;
  font-weight: 500;
`
const BorderedSection = styled.section`
  border-bottom: 1px dotted rgba(0, 0, 0, 0.65);
  padding: 8px;
`
const Section = styled.section`
  padding: 8px;
`
const formStyle = {
  maxWidth: "850px",
  minWidth: "650px",
  padding: "16px"
}
const buttonSectionStyle = {
  maxWidth: "850px",
  minWidth: "650px",
  padding: "16px",
  display: "flex",
  justifyContent: "flex-end"
}

const formItemLayout = {
  style: { width: "100%" },
  labelCol: { xs: 8, xl: 12 },
  wrapperCol: { xs: 16, xl: 12 }
}
const formLongItemLayout = {
  style: { width: "100%" },
  labelCol: { xs: 8, xl: 6 },
  wrapperCol: { xs: 16, xl: 18 }
}

class ApplicationInfoForm extends React.Component {
  state = {
    arr: [1],
    count: 1
  }

  renderForm = item => {
    const { getFieldDecorator } = this.props.form
    return (
      <React.Fragment key={item}>
        <BorderedSection>
          <h3>Адрес объекта</h3>
          <Row>
            <Col xs={24} xl={12}>
              <Form.Item label="Субъект" {...formItemLayout}>
                {getFieldDecorator(`entityRF${item}`, {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} xl={12}>
              <Form.Item label="Город" {...formItemLayout}>
                {getFieldDecorator(`city${item}`, {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Адрес" {...formLongItemLayout}>
                {getFieldDecorator(`address${item}`, {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </BorderedSection>

        <Section>
          <Row>
            <Col span={24}>
              <Form.Item label="Содержание заявления" {...formLongItemLayout}>
                {getFieldDecorator(`applicationText${item}`, {})(
                  <Input.TextArea
                    autosize={{ minRows: 3, maxRows: 3 }}
                    disabled={this.props.pendingRequestChain}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </React.Fragment>
    )
  }

  handleAddObject = () => {
    const { arr, count } = this.state

    this.setState({
      arr: [...arr, count + 1],
      count: count + 1
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.props.pendingRequestChain) return
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getLoader()
        const { arr } = this.state
        const { files } = values

        const arrValues = arr.map(item => {
          const address = values[`address${item}`]
          const applicationText = values[`applicationText${item}`]
          const city = values[`city${item}`]
          const entityRF = values[`entityRF${item}`]

          const data = {
            applicationText,
            address,
            city,
            entityRF
          }

          return data
        })

        this.props.createApplication(arrValues, id => {
          this.props.uploadFile(
            files,
            {
              applicationId: id,
              folderName: "Application",
              description: "Исходные файлы от заявителя"
            },
            () => {
              this.props.hideLoader()
            }
          )
        })
      }
    })
  }

  handleCancel = () => {
    history.push("/lk/application")
  }

  render() {
    const { arr } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Wrapper>
        {this.props.loading && <OverlayLoader backgroundOpacity={0.6} />}
        <ShadowScrollbars
          autoHide
          style={{ height: "100%" }}
          onScroll={this.handleScroll}
        >
          <Form style={formStyle} layout="inline" onSubmit={this.handleSubmit}>
            <Title>Карточка создания нового заявления</Title>
            {arr.map(item => this.renderForm(item))}
            <Section style={buttonSectionStyle}>
              <Button
                style={{ minWidth: "180px", margin: "0 10px" }}
                type="primary"
                disabled={this.props.pendingRequestChain}
                onClick={this.handleAddObject}
              >
                Добавить объект
              </Button>
            </Section>
            <Section>
              <Row style={{ marginTop: "24px" }}>
                <Col span={24}>
                  <Form.Item label="Документация" {...formLongItemLayout}>
                    {getFieldDecorator("files", {
                      rules: [{ validator: validateEmptyFileSelect }]
                    })(
                      <SimpleFileUploader
                        multiple
                        children="Прикрепить файлы"
                      />
                      )}
                  </Form.Item>
                </Col>
              </Row>
            </Section>
            <Section>
              <Button
                style={{ minWidth: "130px", margin: "0 10px" }}
                type="primary"
                htmlType="submit"
                disabled={this.props.pendingRequestChain}
              >
                Сохранить
              </Button>

              <Button
                style={{ minWidth: "130px", margin: "0 10px" }}
                onClick={this.handleCancel}
                disabled={this.props.pendingRequestChain}
              >
                Отмена
              </Button>
            </Section>
          </Form>
        </ShadowScrollbars>
      </Wrapper>
    )
  }
}

export default connect(
  state => ({
    loading: pendingRequestChainSelector(state)
  }),
  { getLoader, hideLoader, createApplication, uploadFile }
)(Form.create()(ApplicationInfoForm))
