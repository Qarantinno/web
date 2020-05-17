import { createMuiTheme } from "@material-ui/core/styles";
import { enUS, ruRU } from "@material-ui/core/locale";

import i18next from "i18next";

const lang = i18next.language === 'en' ? enUS : ruRU;

const isDark = false; // window.matchMedia('(prefers-color-scheme: dark)').matches;

export const theme = createMuiTheme({
  palette: {
    type: isDark ? 'dark' : 'light'
  }
}, lang);
