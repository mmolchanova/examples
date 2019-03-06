import React from "react"
import Main, { Header, Sidebar, Layout, Content } from "../common/Layout"
import Menu from "../common/Menu"
import HeaderContent from "../HeaderContent"
import Logo from "../common/Logo"
import lkMenuItems from "../lkMenuItems"
import ApplicationInfoForm from "./ApplicationInfoForm"

class CreateApplicationPage extends React.PureComponent {
  render() {
    const { uId } = this.props
    return (
      <Main>
        <Sidebar id="leftSidebar" collapsible={true} width={280}>
          <Logo additionalInfo="ЛИЧНЫЙ КАБИНЕТ ЗАЯВИТЕЛЯ" />
          <Menu
            sidebarId="leftSidebar"
            items={lkMenuItems}
            location={this.props.location}
          />
        </Sidebar>
        <Layout>
          <Header>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <HeaderContent />
            </div>
          </Header>
          <Content>
            <ApplicationInfoForm uId={uId} />
          </Content>
        </Layout>
      </Main>
    )
  }
}

export default CreateApplicationPage
