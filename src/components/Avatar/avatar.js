import React from 'react';
import { EyeIcon } from '../../assets/avatar/eyes';
import { MouthIcon } from '../../assets/avatar/mouth';
import classes from './avatar.module.css';

const Avatar = (props) => {
    const {style , user} = props;
    const background = user.avatar ? user.avatar[2] : 'green';
    const eyeIcon = user.avatar ? user.avatar[0] : JSON.stringify(Math.ceil(Math.random()*5));
    const mouthIcon = user.avatar ? user.avatar[0] : JSON.stringify(Math.ceil(Math.random()*5));
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
            <img src={EyeIcon(eyeIcon)}  className={classes.icons} />
            <img src={MouthIcon(mouthIcon)} className={classes.icons} />
        </div>
    )

    return(
        avatar
    )
}

export default Avatar;