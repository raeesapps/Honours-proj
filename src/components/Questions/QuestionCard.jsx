import React from 'react';
import { NavLink } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function QuestionCard(props) {
  const {
    title,
    content,
    path,
    question,
    ...rest
  } = props;
  return (
    <Card {...rest}>
      <NavLink
        style={{ color: 'inherit', textDecoration: 'inherit' }}
        to={{
          pathname: path,
          question,
        }}
      >
        <CardActionArea>
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
      </NavLink>
    </Card>
  );
}

export default React.memo(QuestionCard);
