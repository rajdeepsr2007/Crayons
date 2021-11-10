import React from 'react';
import { Fragment } from 'react';
import Button from '../../Inputs/Button/button';
import Player from './Player';
import classes from './players.module.css';

const Players = (props) => {

    let {users , turn , scores , iadmin , onRemoveUser } = props;

    users = users.sort(( a , b ) => {
        let scoreA = a._id ? scores[a._id].overall : scores[a].overall;
        let scoreB = b._id ? scores[b._id].overall : scores[b].overall;
        return scoreB - scoreA; 
    });

    const playerObjects = users.map((user , index) => {
        return (
            <Player
            key={user._id ? user._id : user }
            user={user}
            turn={turn===(user._id || user)}
            score={user._id ? scores[user._id].overall : scores[user].overall}
            qscore={user._id ? scores[user._id].question : scores[user].question}
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