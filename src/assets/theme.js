import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: grey,
  },
});

export default theme;
