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

  applyShading = (premiseCollection, mappings) => {
    const [a] = premiseCollection.terms;

    if (mappings) {
      this.setState({ a: mappings[a] });
    } else {
      this.setState({ a });
    }
    applyShadings(this.div, premiseCollection);
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
          {a}
        </Typography>
        <div id={id} />
      </div>
    );
  }
}

export default withStyles(styles)(OneSetUninteractiveVennDiagram);
