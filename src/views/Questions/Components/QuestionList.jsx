import React from 'react';
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from '../../../assets/views/jss/Questions/Components/question_list_styles';

function QuestionList(props) {
  const { questions, path, classes } = props;

  return (
    <List className={classes.root}>
      {
        questions.map((question) => (
          <NavLink to={{
            pathname: path,
            question,
          }}>
            <ListItem button>
              <ListItemText>
                {question.title}
              </ListItemText>
            </ListItem>
          </NavLink>
        ))
      }
    </List>
  )
}

export default withStyles(styles)(QuestionList);
