function styles(theme) {
  return {
    content: {
      position: 'relative',
      width: '600px',
      marginTop: theme.spacing.unit * 2,
    },
    topRight: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100px',
      textAlign: 'right',
      marginLeft: theme.spacing.unit,
    },
    bottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '100px',
      textAlign: 'right',
      marginLeft: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 8,
    },
    topLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100px',
      textAlign: 'left',
      marginLeft: theme.spacing.unit * 5,
    },
    bottomLeft: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100px',
      textAlign: 'left',
      marginLeft: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 8,
    },
  };
}

export default styles;
