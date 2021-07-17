import React from 'react';
import { Fragment } from 'react';
import Button from '../../Inputs/Button/button';
import Player from './Player';
import classes from './players.module.css';

const Players = (props) => {

    const {users , turn , scores , iadmin , onRemoveUser } = props;

    const playerObjects = users.map(user => {
        return (
            <Player
            user={user}
            turn={turn===user._id}
            score={scores[user._id].overall}
            qscore={scores[user._id].question}
            removeUser={onRemoveUser}
            iadmin={iadmin}
            />
        )
    })

    

    const playersCard = (
        <Fragment>
            <div className={classes.players} >
                {playerObjects}
            </div>
        </Fragment> 
    )

    return(
        playersCard
    )
}

export default Players;