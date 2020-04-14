import enLang from "./entries/en-US";
import zhLang from "./entries/zh-Hans-CN";
import frLang from "./entries/fr_FR";
import viLang from "./entries/vn_VN";
import {addLocaleData} from "react-intl";

const AppLocale = {
  en: enLang,
  zh: zhLang,
  fr: frLang,
  vi: viLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.zh.data);
addLocaleData(AppLocale.fr.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;
