import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {connect} from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
                <SubMenu key="dashboard" className={this.getNavStyleSubMenuClass(navStyle)}
                         title={<span> <i className="icon icon-dasbhoard"/>
                         <IntlMessages id="sidebar.dashboard"/></span>}>
                  <Menu.Item key="main/dashboard/crm">
                    <Link to="/main/dashboard/crm">
                      <i className="icon icon-crm"/>
                      <IntlMessages id="sidebar.dashboard.crm"/>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="main/dashboard/crypto">
                    <Link to="/main/dashboard/crypto">
                      <i className="icon icon-crypto"/>
                      <IntlMessages id="sidebar.dashboard.crypto"/>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="main/dashboard/listing">
                    <Link to="/main/dashboard/listing">
                      <i className="icon icon-listing-dbrd"/>
                      <IntlMessages id="sidebar.dashboard.listing"/>
                    </Link>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="social-apps/wall">
                  <Link to="/in-built-apps/firebase-crud">
                    <i className="icon icon-contacts -flex-column-reverse"/>
                    <IntlMessages id="sidebar.customers"/>
                  </Link>
                </Menu.Item>

                <Menu.Item key="main/tasks">
                  <Link to="/main/tasks"><i
                    className="icon icon-check-square-o"/><IntlMessages
                    id="sidebar.tasks"/></Link>
                </Menu.Item>
              </MenuItemGroup>

              <MenuItemGroup key="extensions" className="gx-menu-group"
                             title={<IntlMessages id="sidebar.extensions"/>}>
                <Menu.Item key="extensions/mail">
                  <Link to="/extensions/mail"><i className="icon icon-email"/><IntlMessages
                    id="sidebar.extensions.mail"/></Link>
                </Menu.Item>

              </MenuItemGroup>

              <MenuItemGroup key="components" className="gx-menu-group" title={<IntlMessages id="sidebar.components"/>}>

                <SubMenu key="general" className={this.getNavStyleSubMenuClass(navStyle)} title={
                  <span>
                  <i className="icon icon-all-contacts"/>
                   <IntlMessages id="sidebar.components.general"/>
              </span>}>
                  <Menu.Item key="components/general/button">
                    <Link to="/components/general/button">
                      <IntlMessages id="sidebar.general.button"/>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="components/general/icon">
                    <Link to="/components/general/icon">
                      <IntlMessages id="sidebar.general.icon"/></Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="navigation" className={this.getNavStyleSubMenuClass(navStyle)} title={
                  <span>
                  <i className="icon icon-navigation"/>
                  <IntlMessages id="sidebar.components.navigation"/>
              </span>}>
                  <Menu.Item key="components/navigation/affix">
                    <Link to="/components/navigation/affix">
                      <IntlMessages
                        id="sidebar.navigation.affix"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/navigation/breadcrumb">
                    <Link to="/components/navigation/breadcrumb">
                      <IntlMessages
                        id="sidebar.navigation.breadcrumb"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/navigation/dropdown">
                    <Link to="/components/navigation/dropdown">
                      <IntlMessages
                        id="sidebar.navigation.dropdown"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/navigation/menu">
                    <Link to="/components/navigation/menu">
                      <IntlMessages
                        id="sidebar.navigation.menu"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/navigation/pagination">
                    <Link to="/components/navigation/pagination">
                      <IntlMessages
                        id="sidebar.navigation.pagination"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/navigation/steps">
                    <Link to="/components/navigation/steps">
                      <IntlMessages
                        id="sidebar.navigation.steps"/></Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="dataEntry" className={this.getNavStyleSubMenuClass(navStyle)} title={
                  <span>
                  <i className="icon icon-data-entry"/>
                  <IntlMessages id="sidebar.components.dataEntry"/>
              </span>}>
                  <Menu.Item key="components/dataEntry/autoComplete">
                    <Link to="/components/dataEntry/autoComplete">
                      <IntlMessages
                        id="sidebar.dataEntry.autoComplete"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/checkbox">
                    <Link to="/components/dataEntry/checkbox">
                      <IntlMessages
                        id="sidebar.dataEntry.checkbox"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/cascader">
                    <Link to="/components/dataEntry/cascader">
                      <IntlMessages
                        id="sidebar.dataEntry.cascader"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/datePicker">
                    <Link to="/components/dataEntry/datePicker">
                      <IntlMessages
                        id="sidebar.dataEntry.datePicker"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/form">
                    <Link to="/components/dataEntry/form">
                      <IntlMessages
                        id="sidebar.dataEntry.form"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/inputNumber">
                    <Link to="/components/dataEntry/inputNumber">
                      <IntlMessages
                        id="sidebar.dataEntry.inputNumber"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/input">
                    <Link to="/components/dataEntry/input">
                      <IntlMessages
                        id="sidebar.dataEntry.input"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/mention">
                    <Link to="/components/dataEntry/mention">
                      <IntlMessages
                        id="sidebar.dataEntry.mention"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/rate">
                    <Link to="/components/dataEntry/rate">
                      <IntlMessages
                        id="sidebar.dataEntry.rate"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/radio">
                    <Link to="/components/dataEntry/radio">
                      <IntlMessages
                        id="sidebar.dataEntry.radio"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/switch">
                    <Link to="/components/dataEntry/switch">
                      <IntlMessages
                        id="sidebar.dataEntry.switch"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/slider">
                    <Link to="/components/dataEntry/slider">
                      <IntlMessages
                        id="sidebar.dataEntry.slider"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/select">
                    <Link to="/components/dataEntry/select">
                      <IntlMessages
                        id="sidebar.dataEntry.select"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/treeSelect">
                    <Link to="/components/dataEntry/treeSelect">
                      <IntlMessages
                        id="sidebar.dataEntry.treeSelect"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/transfer">
                    <Link to="/components/dataEntry/transfer">
                      <IntlMessages
                        id="sidebar.dataEntry.transfer"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/timePicker">
                    <Link to="/components/dataEntry/timePicker">
                      <IntlMessages
                        id="sidebar.dataEntry.timePicker"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataEntry/upload">
                    <Link to="/components/dataEntry/upload">
                      <IntlMessages
                        id="sidebar.dataEntry.upload"/></Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="dataDisplay" className={this.getNavStyleSubMenuClass(navStyle)} title={
                  <span>
                  <i className="icon icon-data-display"/>

                    <IntlMessages id="sidebar.components.dataDisplay"/>

              </span>}>
                  <Menu.Item key="components/dataDisplay/avatar">
                    <Link to="/components/dataDisplay/avatar">
                      <IntlMessages
                        id="sidebar.dataDisplay.avatar"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/badge">
                    <Link to="/components/dataDisplay/badge">
                      <IntlMessages
                        id="sidebar.dataDisplay.badge"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/collapse">
                    <Link to="/components/dataDisplay/collapse">
                      <IntlMessages
                        id="sidebar.dataDisplay.collapse"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/carousel">
                    <Link to="/components/dataDisplay/carousel">
                      <IntlMessages
                        id="sidebar.dataDisplay.carousel"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/card">
                    <Link to="/components/dataDisplay/card">
                      <IntlMessages
                        id="sidebar.dataDisplay.card"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/calendar">
                    <Link to="/components/dataDisplay/calendar">
                      <IntlMessages
                        id="sidebar.dataDisplay.calender"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/list">
                    <Link to="/components/dataDisplay/list">
                      <IntlMessages
                        id="sidebar.dataDisplay.list"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/popover">
                    <Link to="/components/dataDisplay/popover">
                      <IntlMessages
                        id="sidebar.dataDisplay.popover"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/tree">
                    <Link to="/components/dataDisplay/tree">
                      <IntlMessages
                        id="sidebar.dataDisplay.tree"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/tooltip">
                    <Link to="/components/dataDisplay/tooltip">
                      <IntlMessages
                        id="sidebar.dataDisplay.toolTips"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/timeline">
                    <Link to="/components/dataDisplay/timeline">
                      <IntlMessages
                        id="sidebar.dataDisplay.timeLine"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/tag">
                    <Link to="/components/dataDisplay/tag">
                      <IntlMessages
                        id="sidebar.dataDisplay.tag"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/dataDisplay/tabs">
                    <Link to="/components/dataDisplay/tabs">
                      <IntlMessages
                        id="sidebar.dataDisplay.tabs"/></Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="feedBack" className={this.getNavStyleSubMenuClass(navStyle)} title={
                  <span>
                  <i className="icon icon-feedback"/>
                    <IntlMessages id="sidebar.components.feedBack"/>

              </span>}>
                  <Menu.Item key="components/feedBack/alert">
                    <Link to="/components/feedBack/alert">
                      <IntlMessages
                        id="sidebar.feedBack.alert"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/feedBack/modal">
                    <Link to="/components/feedBack/modal">
                      <IntlMessages
                        id="sidebar.feedBack.modal"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/feedBack/message">
                    <Link to="/components/feedBack/message">
                      <IntlMessages
                        id="sidebar.feedBack.message"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/feedBack/notification">
                    <Link to="/components/feedBack/notification">
                      <IntlMessages
                        id="sidebar.feedBack.notification"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/feedBack/progress">
                    <Link to="/components/feedBack/progress">
                      <IntlMessages
                        id="sidebar.feedBack.progress"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/feedBack/popconfirm">
                    <Link to="/components/feedBack/popconfirm">
                      <IntlMessages id="sidebar.feedBack.popConfirm"/>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="components/feedBack/spin">
                    <Link to="/components/feedBack/spin">
                      <IntlMessages
                        id="sidebar.feedBack.spin"/></Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="others" className={this.getNavStyleSubMenuClass(navStyle)} title={
                  <span>
                  <i className="icon icon-inbox"/>
                    <IntlMessages id="sidebar.components.other"/>

              </span>}>
                  <Menu.Item key="components/others/anchor">
                    <Link to="/components/others/anchor">
                      <IntlMessages
                        id="sidebar.other.anchor"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/others/backtop">
                    <Link to="/components/others/backtop">
                      <IntlMessages
                        id="sidebar.other.backTop"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/others/divider">
                    <Link to="/components/others/divider">
                      <IntlMessages
                        id="sidebar.other.divider"/></Link>
                  </Menu.Item>
                </SubMenu>

                <SubMenu key="table" className={this.getNavStyleSubMenuClass(navStyle)}
                         title={
                           <span>
                           <i className="icon icon-table"/>

                             <IntlMessages id="sidebar.dataDisplay.table"/>

                         </span>}>
                  <Menu.Item key="components/table/basic">
                    <Link to="/components/table/basic">
                      <IntlMessages
                        id="sidebar.view.basicTable"/></Link>
                  </Menu.Item>
                  <Menu.Item key="components/table/data">
                    <Link to="/components/table/data">
                      <IntlMessages
                        id="sidebar.view.dataTable"/></Link>
                  </Menu.Item>
                </SubMenu>

              </MenuItemGroup>

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

