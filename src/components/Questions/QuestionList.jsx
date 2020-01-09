import React from 'react';
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from '../../assets/components/jss/Questions/question_list_styles';

function QuestionList(props) {
  const { questions, title, path, classes } = props;

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h6">
          {title}
        </Typography>
        <List>
          {
            questions.map((question) => (
              <NavLink
                key={question.title}
                to={{
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
      </Paper>
    </div>
  );
}

export default withStyles(styles)(QuestionList);
