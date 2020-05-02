import { createMuiTheme } from "@material-ui/core/styles";
import { enUS, ruRU } from "@material-ui/core/locale";

import i18next from "i18next";

let lang;

switch (i18next.language) {
  case 'en':
    lang = enUS;
    break;
  case 'ru':
  default:
    lang = ruRU;
    break;
}

export const theme = createMuiTheme({}, lang);
