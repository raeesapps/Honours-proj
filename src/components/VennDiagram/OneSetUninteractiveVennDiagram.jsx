import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { createOneSetCircularVennDiagram, applyShadings } from './venn_utils';

import styles from '../../assets/components/jss/VennDiagram/one_set_uninteractive_venn_diagram_styles';

class OneSetUninteractiveVennDiagram extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      a: null,
    };
  }

  componentDidMount() {
    const { title } = this.props;
    const id = title.split(' ').join('');
    this.div = createOneSetCircularVennDiagram(id);
  }

  applyShading = (premiseCollection) => {
    applyShadings(this.div, premiseCollection);
    this.setState({ a: premiseCollection.terms[0] });
  }

  render() {
    const {
      classes,
      title,
      ...rest
    } = this.props;
    const { a } = this.state;
    const id = title.split(' ').join('');
    return (
      <div className={classes.content} {...rest}>
        <Typography variant="body1" className={classes.topLeft}>
          {a && a.length === 1 ? a : 'A'}
        </Typography>
        <div id={id} />
        {
          (a && a.length > 1)
          && (
            <div>
              <Typography variant="h5">
                where A = {a}
              </Typography>
            </div>
          )
        }
      </div>
    );
  }
}

export default withStyles(styles)(OneSetUninteractiveVennDiagram);
