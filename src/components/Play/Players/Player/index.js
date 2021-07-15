import React from 'react';
import Avatar from '../../../Avatar/avatar';
import PencilIcon from '../../../../assets/pencil.png';
import classes from './player.module.css';

const Player = (props) => {
    const {user , turn} = props;
    const playerCard = (
        <div className={classes.player} >
            <Avatar 
            style={{ 
                transform : 'scale(0.8)' , 
                width : 'auto',
                margin : '0 2rem 0 1rem'
            }}
            />
            <span className={classes.username} >{user.username}</span>
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