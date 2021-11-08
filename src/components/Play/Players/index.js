import React from 'react';
import { Fragment } from 'react';
import Button from '../../Inputs/Button/button';
import Player from './Player';
import classes from './players.module.css';

const Players = (props) => {

    let {users , turn , scores , iadmin , onRemoveUser } = props;

    users = users.sort(( a , b ) => scores[a._id].overall >= scores[b._id].overall );

    const playerObjects = users.map((user , index) => {
        return (
            <Player
            key={user._id}
            user={user}
            turn={turn===user._id}
            score={scores[user._id].overall}
            qscore={scores[user._id].question}
            removeUser={onRemoveUser}
            iadmin={iadmin}
            index={index+1}
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