import React from 'react';
import { Fragment } from 'react';
import Card from '../../../UI/Card/card';
import Alert from '../Alert';
import classes from './show-scores.module.css';

const ShowScores = (props) => {

    const {scores , users , word} = props;
    const usernames = {};
    for( const user of users ){
        usernames[user._id] = user.username;
    }

    const scoreObjects = [];
    for( const userId in scores ){
        let scoreClass = [classes.score];
        let username = usernames[userId];
        let score = scores[userId].question;
        if( score > 0 ){
            score = '+' + score;
            scoreClass.push(classes.green);
        }
        const scoreObject = (
            <Fragment>
                <h2 className={scoreClass.join(' ')} >
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