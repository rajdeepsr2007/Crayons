import React from 'react';
import Avatar from '../../../../Avatar/avatar';
import crownIcon from '../../../../../assets/crown.png';
import classes from './user.module.css';

const User = (props) => {
    const {user , admin} = props;
    let crown = null;
    if( admin ){
        crown = (
            <div className={classes.crown} >
                <img src={crownIcon}/>
            </div>
        )
    }
    const userCard = (
        <div className={classes.user}>
            <Avatar />
            <span className={classes.label}>
                { user.username }
            </span>
            {crown}
        </div>
    )
    return(
        userCard
    )
}

export default User;