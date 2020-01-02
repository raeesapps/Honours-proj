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
      textAlign: 'right',
      marginRight: theme.spacing.unit * 8,
    },
    bottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      textAlign: 'right',
    },
    bottomLeft: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      textAlign: 'left',
    },
  };
}

export default styles;
