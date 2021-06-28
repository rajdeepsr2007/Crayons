import React from 'react';
import classes from './avatar.module.css';

const Avatar = (props) => {
    const avatar=(
        <div className={classes.avatar} >
            <div className={classes.face} >
            </div>
            <div className={classes.body} >
            </div>
        </div>
    )

    return(
        avatar
    )
}

export default Avatar;