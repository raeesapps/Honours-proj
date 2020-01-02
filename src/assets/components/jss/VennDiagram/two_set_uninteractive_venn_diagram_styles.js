function styles(theme) {
  return {
    content: {
      position: 'relative',
      width: '300px',
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
    topLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
      textAlign: 'left',
      marginLeft: theme.spacing.unit,
    },
  };
}

export default styles;
