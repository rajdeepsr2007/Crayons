import React from 'react';
import { EyeIcon } from '../../assets/avatar/eyes';
import { MouthIcon } from '../../assets/avatar/mouth';
import classes from './avatar.module.css';

const Avatar = (props) => {
    const {style , user} = props;
    const background = user.avatar ? user.avatar[2] : null;
    const avatar=(
        <div className={classes.avatar} style={style} >
            <div 
            className={classes.face} 
            style={{ background }}  >
            </div>
            <div 
            className={classes.body} 
            style={{ background }}  >
            </div>
            <img src={EyeIcon(user.avatar[0])}  className={classes.icons} />
            <img src={MouthIcon(user.avatar[1])} className={classes.icons} />
        </div>
    )

    return(
        avatar
    )
}

export default Avatar;