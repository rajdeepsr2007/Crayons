import React from 'react';
import Avatar from '../../../Avatar/avatar';
import PencilIcon from '../../../../assets/pencil.png';
import RemoveIcon from '../../../../assets/remove.png';
import classes from './player.module.css';

const Player = (props) => {
    const {user , turn , score , qscore , iadmin , removeUser , index} = props;
    const playerClass = [classes.player];
    if( qscore  > 0 ){
        playerClass.push(classes.guessed);
    }
    let removeUserButton = null;
    if( iadmin)
    removeUserButton = (
           <img 
           src={RemoveIcon} 
           className={classes.remove}
           onClick={() => removeUser(user._id)}
           />
    )
    const playerCard = (
        <div className={playerClass.join(' ')} >
            <strong>#{index}</strong>
            <Avatar 
            style={{ 
                transform : 'scale(0.6)' , 
                width : 'auto',
                margin : '0 1rem 0 0'
            }}
            user={user}
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
            {removeUserButton}
        </div>
    )
    return(
        playerCard
    )
}

export default Player;