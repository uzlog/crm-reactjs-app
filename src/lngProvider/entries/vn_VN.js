import antdSA from "antd/lib/locale-provider/vi_VN";
import appLocaleData from "react-intl/locale-data/vi";
import saMessages from "../locales/vi_VN.json";

const viLang = {
  messages: {
    ...saMessages
  },
  antd: antdSA,
  locale: 'vi-VN',
  data: appLocaleData
};
export default viLang;
