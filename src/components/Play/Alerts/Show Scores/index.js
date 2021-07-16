import React from 'react';
import { Fragment } from 'react';
import Avatar from '../../../Avatar/avatar';
import Card from '../../../UI/Card/card';
import Alert from '../Alert';
import classes from './show-scores.module.css';

const ShowScores = (props) => {

    const {scores , users , word} = props;
    const userObjects = {};
    for( const user of users ){
        userObjects[user._id] = user;
    }

    const scoreObjects = [];
    for( const userId in scores ){
        const user = userObjects[userId];
        const username = user.username;
        let scoreClass = [classes.score];
        let score = scores[userId].question;
        if( score > 0 ){
            score = '+' + score;
            scoreClass.push(classes.green);
        }
        const scoreObject = (
            <Fragment>
                <h2 className={scoreClass.join(' ')} >
                    <Avatar user={user} style={{ width : 'auto' , transform : 'scale(0.9)' }}  />
                    <span>{username}</span>
                    <span>{score}</span>
                </h2>
            </Fragment>
            
        )
        scoreObjects.push(scoreObject);
    }

    const scoreCard = (
        <Card style={{ justifyContent : 'flex-start' }} >
            <h1 className={classes.word} >{word}</h1>
            {scoreObjects}
        </Card>
    )

    return(
        <Alert>
            {scoreCard}
        </Alert>
    )
}

export default ShowScores;