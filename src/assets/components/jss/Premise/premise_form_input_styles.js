const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30%',
  },
  fab: {
    margin: theme.spacing(5),
    position: 'relative',
    top: theme.spacing(-8),
    right: theme.spacing(-10),
    width: '12%',
    height: '1%',
  },
  formControlParent: {
    position: 'absolute',
  },
});

export default styles;
