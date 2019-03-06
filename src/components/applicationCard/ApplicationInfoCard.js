import React from "react"
import styled from "styled-components"
import { Row } from "antd"

import { formatDate } from "../../utils"

import FileView from "./FileView"

const BorderedSection = styled.section`
  border-bottom: 1px dotted rgba(0, 0, 0, 0.65);
  padding: 8px;
`
const Section = styled.section`
  padding: 8px;
`
const WideRow = styled(Row)`
  line-height: 2.78;
`
const Card = styled.div`
  height: 100%;
  width: 720px;
  padding: 16px;
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);

  & .ReactVirtualized__Grid {
    outline: none;
  }
`

class ApplicationInfoCard extends React.Component {
  renderObject = object => {
    const { id, entityRF, city, address, applicationText } = object

    return (
      <BorderedSection key={id}>
        <h4>Адрес объекта</h4>
        <WideRow>
          {"Субъект: "}
          {entityRF}
        </WideRow>
        <WideRow>
          {"Город: "}
          {city}
        </WideRow>
        <WideRow>
          {"Адрес: "}
          {address}
        </WideRow>
        <WideRow>
          {"Содержание заявления: "}
          {applicationText
            ? applicationText.split("\\n").map((str, index) => (
                <span key={index}>
                  {str}
                  <br />
                </span>
              ))
            : null}
        </WideRow>
      </BorderedSection>
    )
  }

  render() {
    const {
      application: { objects, appDate, statusName },
      files
    } = this.props

    return (
      <Wrapper>
        <Card>
          <BorderedSection>
            <WideRow>
              {"Дата создания заявления: "}
              {appDate ? formatDate(appDate) : null}
            </WideRow>
            <WideRow>
              {"Статус заявления: "}
              {statusName ? statusName : null}
            </WideRow>
          </BorderedSection>
          {objects && objects.map(object => this.renderObject(object))}
          <Section>
            <WideRow>
              {"Файлы: "}
              {files && files.length
                ? files.map(file => <FileView key={file.id} file={file} />)
                : "Нет файлов по заявлению"}
            </WideRow>
          </Section>
        </Card>
      </Wrapper>
    )
  }
}

export default ApplicationInfoCard
