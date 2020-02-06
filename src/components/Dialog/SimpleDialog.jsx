import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function SimpleDialog(props) {
  const {
    open,
    onClose,
    title,
    content,
    actions,
    ...rest
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...rest}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
}

export default SimpleDialog;
