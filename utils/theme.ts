import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createMuiTheme } from "@material-ui/core/styles";
import { enUS } from "@material-ui/core/locale";

export const theme: Theme = createMuiTheme({}, enUS);

export const { palette } = theme;

export default theme;
