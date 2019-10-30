import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blue,
  },
  status: {
    danger: 'orange',
  },
});

export default theme;
