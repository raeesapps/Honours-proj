import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import DIFFICULTY from './question_difficulty';

import styles from '../../assets/components/jss/Questions/question_list_styles';

function QuestionList(props) {
  const {
    questions,
    title,
    component,
    classes,
    onClick,
    ...rest
  } = props;

  function renderChip(question) {
    const { EASY, MEDIUM, HARD } = DIFFICULTY;

    let text;
    let color;

    switch (question.difficulty) {
      case EASY:
        text = 'Easy';
        color = 'green';
        break;
      case MEDIUM:
        text = 'Medium';
        color = 'yellow';
        break;
      case HARD:
        text = 'Hard';
        color = 'red';
        break;
      default:
        break;
    }

    return <Chip style={{ backgroundColor: `${color}`, marginLeft: '25%' }} label={text} />;
  }

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
              questions.map((question, idx) => (
                <div style={{ display: 'flex' }}>
                  <Button
                    key={question.id}
                    button
                    onClick={
                      () => (
                        onClick(
                          component,
                          question.content,
                          question.difficulty,
                          question.id,
                        )
                      )
                    }
                  >
                    <Typography variant="body1">
                      {`#${idx + 1}`}
                    </Typography>
                    {
                      renderChip(question)
                    }
                  </Button>
                </div>
              ))
            }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default withStyles(styles)(React.memo(QuestionList));
