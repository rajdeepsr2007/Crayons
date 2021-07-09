import React from 'react';
import classes from './user.module.css';
import { formatDate } from '../../util/util';
import Avatar from '../../Avatar/avatar';
import Button from '../../Inputs/Button/button';
import { Fragment } from 'react';

const User = (props) => {
    const {user} = props;
    const avatarStyle={
        padding : '0' ,
        margin : '0' ,
        transform : 'scale(0.6)',
        width : 'auto'
    }
    
    let lastSeen = null;
    if( user.lastSeen === 'online' ){
        lastSeen = <div><div className={classes.online}></div> online</div>
    }else{
        lastSeen = <span className={classes.last_seen} >{formatDate(user.lastSeen)}</span>

    }
    const userCard = (
        <div className={classes.user} >
            <Avatar style={avatarStyle}/>
            <span className={classes.username} >{user.username}</span>
            {lastSeen}
            <Button style={{ transform : 'scale(0.8)' , margin : '0 ' , width : '8rem'}} >
                Add Friend
            </Button>
        </div>
    )
    return(
       userCard
    )
}

export default User;