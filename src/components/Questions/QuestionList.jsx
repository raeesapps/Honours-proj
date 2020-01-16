import React from 'react';
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import styles from '../../assets/components/jss/Questions/question_list_styles';

function QuestionList(props) {
  const {
    questions,
    title,
    path,
    classes,
    ...rest
  } = props;

  return (
    <div className={classes.root} {...rest}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${title}AriaControls`}
          id={`${title}ExpasionPanel`}
        >
          <Typography>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            {
              questions.map((question) => (
                <NavLink
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  key={question.title}
                  to={{
                    pathname: path,
                    question,
                  }}
                >
                  <ListItem button>
                    <ListItemText>
                      {question.title}
                    </ListItemText>
                  </ListItem>
                </NavLink>
              ))
            }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default withStyles(styles)(React.memo(QuestionList));
