import React from "react"
import Main, { Header, Sidebar, Layout, Content } from "../common/Layout"
import Menu from "../common/Menu"
import HeaderContent from "../HeaderContent"
import Logo from "../common/Logo"
import Search from "./Search"
import lkMenuItems from "../lkMenuItems"
import ApplicationList from "./ApplicationList"

class ApplicationPage extends React.PureComponent {
  render() {
    return (
      <Main>
        <Sidebar id="leftSidebar" collapsible={true} width={280}>
          <Logo href="/lk/" additionalInfo="ЛИЧНЫЙ КАБИНЕТ ЗАЯВИТЕЛЯ" />
          <Menu
            sidebarId="leftSidebar"
            items={lkMenuItems}
            location={this.props.location}
          />
        </Sidebar>
        <Layout>
          <Header>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Search />
              <HeaderContent />
            </div>
          </Header>
          <Content>
            <ApplicationList />
          </Content>
        </Layout>
      </Main>
    )
  }
}

export default ApplicationPage
