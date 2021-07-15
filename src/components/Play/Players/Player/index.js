import React from 'react';
import Avatar from '../../../Avatar/avatar';
import PencilIcon from '../../../../assets/pencil.png';
import classes from './player.module.css';

const Player = (props) => {
    const {user , turn , score , qscore} = props;
    const playerClass = [classes.player];
    if( qscore  > 0 ){
        playerClass.push(classes.guessed);
    }
    const playerCard = (
        <div className={playerClass.join(' ')} >
            <Avatar 
            style={{ 
                transform : 'scale(0.6)' , 
                width : 'auto',
                margin : '0 1rem 0 0'
            }}
            />
            <span className={classes.username} >{user.username}</span>
            <span className={classes.score} >{score}</span>
            {
                turn ?
                <img 
                src={PencilIcon} 
                className={classes.pencil}
                />
                : null
            }
        </div>
    )
    return(
        playerCard
    )
}

export default Player;