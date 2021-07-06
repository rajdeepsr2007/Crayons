import React from 'react';
import Avatar from '../../../../Avatar/avatar';
import crownIcon from '../../../../../assets/crown.png';
import classes from './user.module.css';
import Button from '../../../../Inputs/Button/button';

const User = (props) => {
    const {user , admin  , iadmin  , onMakeHost} = props;
    let crown = null;

    if( admin === user._id ){
        crown = (
            <div className={classes.crown} >
                <img src={crownIcon}/>
            </div>
        )
    }

    console.log(onMakeHost);

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
                <Button style={buttonStyle}>
                    Remove
                </Button>
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
            {userOptions}
        </div>
    )
    return(
        userCard
    )
}

export default User;