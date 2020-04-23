import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HorizontalNav extends Component {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    }
  };

  render() {
    const {pathname, navStyle} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (

      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">

        <SubMenu className={this.getNavStyleSubMenuClass(navStyle)} key="main"
                 title={<IntlMessages id="sidebar.main"/>}>

          <SubMenu className="gx-menu-horizontal" key="dashboard"
                   title={<span> <i className="icon icon-dasbhoard"/>
                         <IntlMessages id="sidebar.dashboard"/></span>}>
            <Menu.Item key="main/dashboard/crm">
              <Link to="/main/dashboard/crm">
                <i className="icon icon-crm"/>
                <IntlMessages id="sidebar.dashboard.crm"/>
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="main/customers">
            <Link to="/main/customers">
              <i className="icon icon-contacts -flex-column-reverse"/>
              <IntlMessages id="sidebar.customers"/>
            </Link>
          </Menu.Item>

          <Menu.Item key="main/tasks">
            <Link to="/main/tasks"><i
              className="icon icon-check-square-o"/><IntlMessages
              id="sidebar.tasks"/></Link>
          </Menu.Item>

        </SubMenu>

        <SubMenu className={this.getNavStyleSubMenuClass(navStyle)} key="extensions"
                 title={<IntlMessages id="sidebar.extensions"/>}>

          <Menu.Item key="extensions/mail">
            <Link to="/extensions/mail"><i className="icon icon-email"/><IntlMessages
              id="sidebar.extensions.mail"/></Link>
          </Menu.Item>
        </SubMenu>

      </Menu>

    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {themeType, navStyle, pathname, locale} = settings;
  return {themeType, navStyle, pathname, locale}
};
export default connect(mapStateToProps)(HorizontalNav);

