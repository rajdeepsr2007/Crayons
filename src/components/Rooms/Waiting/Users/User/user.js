import React from 'react';
import Avatar from '../../../../Avatar/avatar';
import classes from './user.module.css';
import Button from '../../../../Inputs/Button/button';

const User = (props) => {
    const {user , admin  , iadmin  , onMakeHost , onRemoveUser } = props;
    let crown = null;

    let userOptions = null;
    if(iadmin && user._id != admin ){
        const buttonStyle={ 
            margin : '0.2rem 0 0 -1rem' ,  
            transform : 'scale(0.9)',
            width : '150%'
        }
        userOptions = (
            <div className={classes.options} >
                <Button 
                style={buttonStyle} 
                onClick={() => onMakeHost(user._id)}
                >
                    Make Host
                </Button>
                <Button 
                onClick={() => onRemoveUser(user._id)}
                style={buttonStyle}>
                    Remove
                </Button>
            </div>
        )
    }

    const userCard = (
        <div className={classes.user}>
            <Avatar user={user} admin={admin===user._id}/>
            <span className={[classes.label,classes.username].join(' ')}>
                { user.username }
            </span>
            {userOptions}
        </div>
    )
    return(
        userCard
    )
}

export default User;