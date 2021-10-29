import React from 'react';
import { EyeIcon } from '../../assets/avatar/eyes';
import { MouthIcon } from '../../assets/avatar/mouth';
import crownIcon from '../../assets/crown.png';
import classes from './avatar.module.css';

const Avatar = (props) => {
    const {style , user , admin} = props;
    const background = user.avatar ? user.avatar[2] : 'green';
    const eyeIcon = user.avatar ? user.avatar[0] : JSON.stringify(Math.ceil(Math.random()*5));
    const mouthIcon = user.avatar ? user.avatar[0] : JSON.stringify(Math.ceil(Math.random()*5));

    let crown = null;
    if( admin ){
        crown = (
            <div className={classes.crown} >
                <img src={crownIcon}/>
            </div>
        )
    }

    const animationStyle = { animationDelay  : `${Math.floor(Math.random()*10)}s` , background };

    const avatar=(
        <div className={classes.avatar} style={style} >
            <div 
            className={classes.face} 
            style={ animationStyle }  >
                {crown}
                <img src={EyeIcon(eyeIcon)}  className={[classes.icons,classes.eyes].join(' ')} />
                <img src={MouthIcon(mouthIcon)} className={[classes.icons,classes.mouth].join(' ')} />
            </div>
            <div 
            className={classes.body} 
            style={ animationStyle }  >
            </div>
        </div>
    )

    return(
        avatar
    )
}

export default Avatar;