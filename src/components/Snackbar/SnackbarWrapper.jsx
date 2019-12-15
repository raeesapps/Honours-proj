import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import styles from '../../assets/components/jss/Snackbar/snackbar_wrapper_styles';

const variantIcon = Object.freeze({
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
});

//rewrite this!
function SnackbarWrapper(props) {
  const classes = styles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

SnackbarWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};

export default SnackbarWrapper;
