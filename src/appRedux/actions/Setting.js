import {SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "constants/ActionTypes";
import {LAYOUT_TYPE, NAV_STYLE, THEME_COLOR_SELECTION, THEME_TYPE} from "../../constants/ThemeSetting";
import {CLOSE_CUSTOMER, ON_CUSTOMIZER} from "../../constants/ActionTypes";


export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
}

export function updateWindowWidth(width) {
  return {type: WINDOW_WIDTH, width};
}

export function setThemeType(themeType) {
  return {type: THEME_TYPE, themeType};
}

export function setThemeColorSelection(colorSelection) {
  return {type: THEME_COLOR_SELECTION, colorSelection};
}

export function onNavStyleChange(navStyle) {
  return {type: NAV_STYLE, navStyle};
}

export function onLayoutTypeChange(layoutType) {
  return {type: LAYOUT_TYPE, layoutType};
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}

export const openCustomizer = () => {
  return {
    type: ON_CUSTOMIZER
  }
};

export const closeCustomizer = () => {
  return {
    type: CLOSE_CUSTOMER
  }
};
