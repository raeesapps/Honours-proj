import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function QuestionCard(props) {
  const {
    title,
    content,
    component,
    question,
    onClick,
    ...rest
  } = props;
  return (
    <Card {...rest}>
      <CardActionArea
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
        <CardContent>
          <center>
            <Typography gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              {content}
            </Typography>
          </center>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default React.memo(QuestionCard);
