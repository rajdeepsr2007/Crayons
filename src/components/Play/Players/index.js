import React from 'react';
import Player from './Player';
import classes from './players.module.css';

const Players = (props) => {

    const {users , turn} = props;

    const playerObjects = users.map(user => {
        return (
            <Player
            user={user}
            turn={turn===user._id}
            />
        )
    })

    const playersCard = (
        <div className={classes.players} >
            {playerObjects}
        </div>
    )

    return(
        playersCard
    )
}

export default Players;